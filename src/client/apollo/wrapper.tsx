import registerRootComponent from 'expo/build/launch/registerRootComponent';
import React from 'react';
import {setContext} from '@apollo/client/link/context';
import {getCurrentUserAsync, isSignedInAsync, signInSilentlyAsync} from 'expo-google-sign-in'
import {ApolloProvider, ApolloClient, ApolloClientOptions, createHttpLink} from '@apollo/client'
import Authenticator from '../authenticator';
import { split } from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import {cache} from './cache';

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
  },
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext(async (_, {headers}) => {
  //get last user and token
  var user = await getCurrentUserAsync()  

  //if expired sign in again
  if (!await isSignedInAsync()){
    user = await signInSilentlyAsync()
  }

  //if sign in failed no auth
  if (!user){
    return {headers}
  }
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${user!.auth?.idToken}` 
    }
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);

const options: ApolloClientOptions<unknown> = {
  link: splitLink,
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
    query: {
      fetchPolicy: "cache-first",
    },
  },
};
export const client = new ApolloClient(options);
const index: React.FC = () => (
  <ApolloProvider client={client}>
    <Authenticator />
  </ApolloProvider>
);
registerRootComponent(index);
