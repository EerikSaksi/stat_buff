import registerRootComponent from "expo/build/launch/registerRootComponent";
import React from "react";
import { setContext } from "@apollo/client/link/context";
import { getCurrentUserAsync, signInSilentlyAsync } from "expo-google-sign-in";
import { ApolloProvider, ApolloClient, ApolloClientOptions, createHttpLink } from "@apollo/client";
import Authenticator from "../authenticator";
import { split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { cache } from "./cache";
import "react-native-gesture-handler";
import { SafeAreaProvider } from 'react-native-safe-area-context';

const wsLink = new WebSocketLink({
  uri: `ws://stat-buff.herokuapp.com/graphql`,
  options: {
    reconnect: true,
  },
});

const httpLink = createHttpLink({
  uri: "https://stat-buff.herokuapp.com/graphql",
});

var lastSignIn = new Date("1970-01-01");
const authLink = setContext(async (_, { headers }) => {

  //get cached user
  var userPromise = getCurrentUserAsync();

  //check if about 50 minutes since last token request
  if (Date.now() - lastSignIn.getTime() < 3000000) {
    userPromise = signInSilentlyAsync();
    lastSignIn = new Date()
  }
  
  //wait for cached user or sign in
  const user = await userPromise;
  if (user && user.auth && user.auth.idToken) {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${user!.auth.idToken}`,
      },
    };
  }
  return {
    headers,
  };
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
