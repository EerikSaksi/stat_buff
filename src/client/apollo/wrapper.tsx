import registerRootComponent from "expo/build/launch/registerRootComponent";
import React from "react";
import { setContext } from "@apollo/client/link/context";
import { getCurrentUserAsync } from "expo-google-sign-in";
import { ApolloProvider, ApolloClient, ApolloClientOptions, createHttpLink} from "@apollo/client";
import Authenticator from "../authenticator";
import { split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { cache } from "./cache";
import 'react-native-gesture-handler'

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
    }
  },
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  //const user = await getCurrentUserAsync()
  //const token = user?.auth?.idToken
  const token = "Stinky";
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
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
    <Authenticator />
  </ApolloProvider>
);
registerRootComponent(index);
