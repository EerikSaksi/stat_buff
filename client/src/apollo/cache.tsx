import { InMemoryCache } from "@apollo/client/cache";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistCache, AsyncStorageWrapper } from "apollo3-cache-persist";
import { makeVar } from "@apollo/client";
const visibleSection = makeVar("UserTab");
var cache;

(async () => {
  cache = new InMemoryCache();
  // await before instantiating ApolloClient, else queries might run before the cache is persisted
  await persistCache({
    cache,
    storage: new AsyncStorageWrapper(AsyncStorage),
  });
  //await cache.reset()
})();
export { cache, visibleSection };
