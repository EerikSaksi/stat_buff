import { InMemoryCache } from "@apollo/client/cache";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistCache, AsyncStorageWrapper } from "apollo3-cache-persist";
import { makeVar } from "@apollo/client";
const visibleSection = makeVar("user");
var cache;

(async () => {
  cache = new InMemoryCache({
    dataIdFromObject: (object) => object.nodeId,
  });
  // await before instantiating ApolloClient, else queries might run before the cache is persisted
  await persistCache({
    cache,
    storage: new AsyncStorageWrapper(AsyncStorage),
  });
})();
export { cache, visibleSection };
