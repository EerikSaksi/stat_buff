const express = require('express');
const {postgraphile} = require('postgraphile');
const MyPlugins = require('./postgraphile_plugins')
const PostGraphileConnectionFilterPlugin = require('postgraphile-plugin-connection-filter');
const PostGraphileFulltextFilterPlugin = require('postgraphile-plugin-fulltext-filter');
const run_all_sql_scripts = require('./sql_scripts/call_sql_scripts')
require('dotenv').config();

const postgraphileOptions = {
  subscriptions: true,
  watchPg: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  ignoreIndexes: false,
  appendPlugins: [require("@graphile-contrib/pg-simplify-inflector"), MyPlugins, PostGraphileConnectionFilterPlugin, PostGraphileFulltextFilterPlugin],
  exportGqlSchemaPath: "schema.graphql",
  handleErrors: (error) => console.log(error),
  graphiql: true,
  enhanceGraphiql: true,
  enableQueryBatching: true,
  legacyRelations: "omit",
  disableDefaultMutations: false,
  pgSettings: async req => {
    //if (req && req && req.headers && req.headers.authorization) {
    //const googleID = await tokenToGoogleID(req.headers.authorization)
    return {
      'user.googleID': 'uh oh'
    };
    //}
  },
  ownerConnectionString: "postgres://eerik:Postgrizzly@localhost:5432/rpgym"
}
const app = express();
(async () => {
  await run_all_sql_scripts()
  app.use(postgraphile("postgres://query_sender:restrictedPermissions@localhost:5432/rpgym", postgraphileOptions));
})();
app.listen(process.env.PORT || 4000);
