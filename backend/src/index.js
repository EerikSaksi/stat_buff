const express = require('express');
const cors = require('cors')
const path = require('path')
const {postgraphile, makePluginHook} = require('postgraphile');
const MyPlugins = require('./postgraphile_plugins')
const PostGraphileConnectionFilterPlugin = require('postgraphile-plugin-connection-filter');
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
(async () => {
  app.use(postgraphile("postgres://query_sender:restrictedPermissions@localhost:5432/rpgym", postgraphileOptions))
})();
console.log('app running')
app.listen(process.env.PORT || 4000);
