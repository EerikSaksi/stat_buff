import registerRootComponent from "expo/build/launch/registerRootComponent";
import React from "react";
import { Platform } from "react-native";
import { setContext } from "@apollo/client/link/context";
import { getCurrentUserAsync, signInSilentlyAsync } from "expo-google-sign-in";
import { getCredentialStateAsync } from "expo-apple-authentication";
import { ApolloProvider, ApolloClient, ApolloClientOptions, createHttpLink } from "@apollo/client";
import Authenticator from "../authenticator";
import { split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { cache } from "./cache";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";


const ios_user = client.readQuery({
  //if messages have never been opened set really far back date so all have been opened
  query: gql`
    query {
      user{
        
      }
    }
  `,
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

var lastSignIn = new Date("1970-01-01");
const getToken =
  Platform.OS === "android"
    ? async () => {
        //get cached user
        var userPromise = getCurrentUserAsync();

        //check if about 50 minutes since last token request
        if (Date.now() - lastSignIn.getTime() < 3000000) {
          userPromise = signInSilentlyAsync();
          lastSignIn = new Date();
        }
        const user = await userPromise;
        return `Bearer ${user?.auth?.idToken}`;
      }
    : async () => {
        const user = 
      };

const authLink = setContext(async (_, { headers }) => {
  const authorization = await getToken();
  if (token) {
    return {
      headers: {
        ...headers,
        authorization
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
