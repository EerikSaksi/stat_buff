import registerRootComponent from "expo/build/launch/registerRootComponent";
import React from "react";
import { Platform } from "react-native";
import { setContext } from "@apollo/client/link/context";
import { ApolloProvider, ApolloClient, ApolloClientOptions, createHttpLink, gql } from "@apollo/client";
import Authenticator from "../authenticator";
import { split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { cache } from "./cache";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";


//init a client with just a cache so that the function doesnt freak out
var token; 
var client = new ApolloClient({cache})
const authLink = setContext(async (_, { headers }) => {
  if (!token) {
    //fetch query into memory (if not loaded)
    const result = client.readQuery({query: gql`query{token}`});
    if (result){
      token = result.token
    }
  }
  if (!token){
    return {headers}
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
client = new ApolloClient(options);
const index: React.FC = () => (
  <ApolloProvider client={client}>
    <SafeAreaProvider>
      <Authenticator />
    </SafeAreaProvider>
  </ApolloProvider>
);
registerRootComponent(index);
