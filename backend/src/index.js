const express = require('express');
const cors = require('cors')
const path = require('path')
const {postgraphile, makePluginHook} = require('postgraphile');
const MyPlugins = require('./postgraphile_plugins')
const PostGraphileConnectionFilterPlugin = require('postgraphile-plugin-connection-filter');
const run_all_sql_scripts = require('./sql_scripts/call_sql_scripts')
const { default: PgPubsub } = require("@graphile/pg-pubsub"); 
require('dotenv').config({path: '../.env'})
const pluginHook = makePluginHook([PgPubsub]);
const postgraphileOptions = {
  pluginHook,
  subscriptions: true,
  simpleSubscriptions: true,
  watchPg: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  ignoreIndexes: false,
  appendPlugins: [require("@graphile-contrib/pg-simplify-inflector"), MyPlugins, PostGraphileConnectionFilterPlugin],
  exportGqlSchemaPath: "schema.graphql",
  handleErrors: (error) => console.log(error),
  graphiql: true,
  enhanceGraphiql: true,
  enableQueryBatching: true,
  legacyRelations: "omit",
  disableDefaultMutations: false,
  allowExplain: () => true,
  jwtPgTypeIdentifier: 'public.jwt_token',
  jwtSecret: process.env.JWT_SECRET,
  ownerConnectionString: "postgres://eerik:Postgrizzly@localhost:5432/rpgym",
}
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
(async () => {
  await run_all_sql_scripts()
  app.use(postgraphile("postgres://query_sender:restrictedPermissions@localhost:5432/rpgym", postgraphileOptions))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,  'public', 'index.html'));
  });
})();
app.listen(process.env.PORT || 4000);
