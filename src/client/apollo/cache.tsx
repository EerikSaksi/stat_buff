import { InMemoryCache, makeVar, } from "@apollo/client/cache";
export const usernameVar = makeVar("");
export const cache = new InMemoryCache({
  dataIdFromObject: (object) => object.nodeId ,
  typePolicies: {
    Query: {
      fields: {
        usernameVar: {
          read() {
            return usernameVar();
          },
        },
      },
    },
  },
});
