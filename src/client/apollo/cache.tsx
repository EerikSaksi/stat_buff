import { InMemoryCache, makeVar } from "@apollo/client/cache";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistCache, AsyncStorageWrapper } from "apollo3-cache-persist";
export const usernameVar = makeVar("");
var cache;
(async () => {
  cache = new InMemoryCache({
    dataIdFromObject: (object) => object.nodeId,
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
  // await before instantiating ApolloClient, else queries might run before the cache is persisted
  await persistCache({
    cache,
    storage: new AsyncStorageWrapper(AsyncStorage),
  });
})();
export { cache };
