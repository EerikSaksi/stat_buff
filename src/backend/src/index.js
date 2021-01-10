const express = require('express');
const {postgraphile, makePluginHook} = require('postgraphile');
const MyPlugins = require('./postgraphile_plugins')
const PostGraphileConnectionFilterPlugin = require('postgraphile-plugin-connection-filter');
const run_all_sql_scripts = require('./sql_scripts/call_sql_scripts')
const { default: PgPubsub } = require("@graphile/pg-pubsub"); 
require('dotenv').config();

const pluginHook = makePluginHook([PgPubsub]);
const postgraphileOptions = {
  pluginHook,
  subscriptions: true,
  retryOnInitFail: true,
  simpleSubscriptions: true,
  watchPg: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  ignoreIndexes: false,
  appendPlugins: [require("@graphile-contrib/pg-simplify-inflector"), MyPlugins, PostGraphileConnectionFilterPlugin],
  exportGqlSchemaPath: "schema.graphql",
  extendedErrors: ["errcode"],
  graphiql: true,
  enableQueryBatching: true,
  disableQueryLog: true, 
  legacyRelations: "omit",
  disableDefaultMutations: false,
  graphqlRoute: '/graphql',
  pgSettings: async req => {
    if (req && req && req.headers && req.headers.authorization) {
      const {id} = await tokenToID(req.headers.authorization)
      return {
        'user.googleID': id
      };
    }
  },
}
const app = express();
(async () => {
  await run_all_sql_scripts()
  app.use(postgraphile(process.env.DATABASE_URL, postgraphileOptions));
})();
app.listen(process.env.PORT || 4000);
