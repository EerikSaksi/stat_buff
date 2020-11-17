import registerRootComponent from 'expo/build/launch/registerRootComponent';
import App from './authenticator';
import React from 'react';
import {setContext} from '@apollo/client/link/context';
import {getCurrentUserAsync} from 'expo-google-sign-in'

import {ApolloProvider, ApolloClient, ApolloClientOptions, InMemoryCache, createHttpLink} from '@apollo/client'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});


const authLink = setContext(async (_, {headers}) => {
  const user = await getCurrentUserAsync()  
  const token = user?.auth?.idToken
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});
const options: ApolloClientOptions<unknown> = {
  link: authLink.concat(httpLink),  
  cache: new InMemoryCache(),
  //uri: 'http://localhost:4000/graphql'
}
const client = new ApolloClient(options);
const index: React.FC = () => <ApolloProvider client={client}><App /></ApolloProvider>
registerRootComponent(index);
