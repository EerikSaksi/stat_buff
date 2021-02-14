import registerRootComponent from "expo/build/launch/registerRootComponent";
import React from "react";
import { setContext } from "@apollo/client/link/context";
import { ApolloProvider, ApolloClient, ApolloClientOptions, createHttpLink} from "@apollo/client";
import Authenticator from "../authenticator";
import { split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { cache } from "./cache";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

var token;
const authLink = setContext(async (_, { headers }) => {
  if (!token) {
    try {
      const value = await AsyncStorage.getItem("jwt_token");
      if (value !== '') {
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
  uri: `ws://stat-buff.herokuapp.com/graphql`,
  options: {
    reconnect: true,
  },
});

const httpLink = createHttpLink({
  uri: "https://stat-buff.herokuapp.com/graphql",
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
const client = new ApolloClient(options);
const index: React.FC = () => (
  <ApolloProvider client={client}>
    <SafeAreaProvider>
      <Authenticator />
    </SafeAreaProvider>
  </ApolloProvider>
);
registerRootComponent(index);
