import registerRootComponent from "expo/build/launch/registerRootComponent";
import React from "react";
import { setContext } from "@apollo/client/link/context";
import { ApolloProvider, ApolloClient, ApolloClientOptions, createHttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import Authenticator from "../components/authenticator";
import { split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { cache } from "./cache";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider as PaperProvider } from "react-native-paper";

var token;
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
      fetchPolicy: "cache-first",
    },
    query: {
      fetchPolicy: "cache-first",
    },
  },
};
const client = new ApolloClient(options);
const index: React.FC = () => (
  <ApolloProvider client={client}>
    <PaperProvider>
      <SafeAreaProvider>
        <Authenticator />
      </SafeAreaProvider>
    </PaperProvider>
  </ApolloProvider>
);
registerRootComponent(index);
