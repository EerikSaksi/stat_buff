const express = require('express');
const cors = require('cors')
const path = require('path')
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
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
(async () => {
  app.use(postgraphile(process.env.DATABASE_USER_URL, postgraphileOptions));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,  'public', 'index.html'));
  });
})();
app.listen(process.env.PORT || 4000);
