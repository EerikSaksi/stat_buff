import { InMemoryCache, ApolloClient, ApolloClientOptions, createHttpLink, split} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {getMainDefinition} from "@apollo/client/utilities";
import fetch from 'cross-fetch';

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  fetch
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


const options: ApolloClientOptions<unknown> = {
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
    query: {
      fetchPolicy: "cache-first",
    },
  },
};
export const client = new ApolloClient(options);
