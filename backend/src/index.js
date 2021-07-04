const express = require("express");
const cors = require("cors");
const { postgraphile, makePluginHook } = require("postgraphile");
const MyPlugins = require("./postgraphile_plugins");
const PgNonNullRelationsPlugin = require("@graphile-contrib/pg-non-null/relations");
const { default: PgPubsub } = require("@graphile/pg-pubsub");
require("dotenv").config({ path: "../.env" });
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
  appendPlugins: [
    require("@graphile-contrib/pg-simplify-inflector"),
    require("postgraphile-plugin-connection-filter"),
    MyPlugins,
    PgNonNullRelationsPlugin,
  ],
  exportGqlSchemaPath: "schema.graphql",
  handleErrors: (error) => console.log(error),
  graphiql: true,
  enhanceGraphiql: true,
  enableQueryBatching: true,
  legacyRelations: "omit",
  disableDefaultMutations: false,
  allowExplain: () => true,
  ownerConnectionString: "postgres://eerik:Postgrizzly@localhost:5432/rpgym",
  simpleCollections: "only",
  graphileBuildOptions: { pgOmitListSuffix: true },
  skipPlugins: [require("graphile-build").NodePlugin],
  pgSettings: process.env.__DEV__ ? () => ({ 'jwt.claims.user_id': 4 }) : undefined,
  jwtSecret:  process.env.JWT_SECRET,
  jwtPgTypeIdentifier: "public.jwt_token",
};
const app = express();
app.use(cors());
(async () => {
  app.use(postgraphile("postgres://query_sender:restrictedPermissions@localhost:5432/rpgym", postgraphileOptions));
})();
console.log("app running");
module.exports = app.listen(process.env.PORT || 4000);
