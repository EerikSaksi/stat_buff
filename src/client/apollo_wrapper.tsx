import registerRootComponent from 'expo/build/launch/registerRootComponent';
import App from './authenticator';
import React from 'react';
import {setContext} from '@apollo/client/link/context';

import {ApolloProvider, ApolloClient, ApolloClientOptions, InMemoryCache} from '@apollo/client'

const authLink = setContext((_, {headers}) => {
  // return the headers to the context so httpLink can read them
  const token = "uh oh stinky"
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const options: ApolloClientOptions<unknown> = {uri: 'http://localhost:4000/graphql', cache: new InMemoryCache(), link: authLink}
const client = new ApolloClient(options);
const index: React.FC = () => <ApolloProvider client={client}><App /></ApolloProvider>
registerRootComponent(index);
