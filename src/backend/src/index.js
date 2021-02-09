const express = require('express');
const {postgraphile, makePluginHook} = require('postgraphile');
const MyPlugins = require('./postgraphile_plugins')
const PostGraphileConnectionFilterPlugin = require('postgraphile-plugin-connection-filter');
const run_all_sql_scripts = require('./sql_scripts/call_sql_scripts')
const { default: PgPubsub } = require("@graphile/pg-pubsub"); 
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
  handleErrors: (error) => console.log(error),
  enableQueryBatching: true,
  graphiql: true,
  disableQueryLog: false,
  legacyRelations: "omit",
  disableDefaultMutations: false,
  allowExplain: () => true,
  jwtPgTypeIdentifier: 'public.jwt_token',
  jwtSecret: process.env.JWT_SECRET,
}
const app = express();
(async () => {
  await run_all_sql_scripts()
  app.use(postgraphile(process.env.DATABASE_USER_URL, postgraphileOptions));
})();
app.listen(process.env.PORT || 4000);
