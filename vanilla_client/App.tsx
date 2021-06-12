import React from "react";
import { setContext } from "@apollo/client/link/context";
import { ApolloProvider, ApolloClient, ApolloClientOptions, createHttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import {InMemoryCache} from '@apollo/client/cache';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistCache, AsyncStorageWrapper} from 'apollo3-cache-persist';
import Authenticator from './components/authenticator'
var cache: InMemoryCache;

(async () => {
  cache = new InMemoryCache({
    possibleTypes: {},
  });
  // await before instantiating ApolloClient, else queries might run before the cache is persisted
  await persistCache({
    cache,
    storage: new AsyncStorageWrapper(AsyncStorage),
  });
  await cache.reset();
})();

var token: string | null;
const authLink = setContext(async (_, { headers }) => {
  if (!token) {
    try {
      const value = await AsyncStorage.getItem("jwt_token");
      if (value !== "") {
        token = value;
      }
    } catch (error) {}
  }
  if (!token) {
    return { headers };
  }
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
  },
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const errorLink = onError(({networkError}) => {
  if (networkError && 'statusCode' in networkError ){
    if (networkError.statusCode === 401){
      //invalidate token if its invalid
      AsyncStorage.setItem("jwt_token", '');
    }
  }
});


const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);

const options: ApolloClientOptions<unknown> = {
  link: from([errorLink, splitLink]),
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
const client = new ApolloClient(options);
const App: React.FC = () => (
  <ApolloProvider client={client}>
    <PaperProvider>
      <SafeAreaProvider>
        <Authenticator/>
      </SafeAreaProvider>
    </PaperProvider>
  </ApolloProvider>
);
export default App
