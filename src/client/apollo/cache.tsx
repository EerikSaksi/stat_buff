import {InMemoryCache, makeVar} from "@apollo/client/cache";
export const usernameVar = makeVar('');
export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        usernameVar: {
          read() {
            return usernameVar();
          }
        }
      }
    }
  }
})
