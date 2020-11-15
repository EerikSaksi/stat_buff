import registerRootComponent from 'expo/build/launch/registerRootComponent';
import App from './authenticator';
import React from 'react';

import {ApolloProvider, ApolloClient, ApolloClientOptions, InMemoryCache} from '@apollo/client'

const authLink = 
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer uh_oh_stinky` : "",
    }
  }
});
const options: ApolloClientOptions<unknown> = {uri: 'http://localhost:4000/graphql', cache: new InMemoryCache(), link: authLink}
const client = new ApolloClient(options);
const index: React.FC = () => <ApolloProvider client={client}><App /></ApolloProvider>
registerRootComponent(index);
