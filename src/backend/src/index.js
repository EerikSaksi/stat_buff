const express = require('express');
const {postgraphile} = require('postgraphile');
const MyPlugins = require('./postgraphile_plugins')
const PostGraphileConnectionFilterPlugin = require('postgraphile-plugin-connection-filter');
const PostGraphileFulltextFilterPlugin = require('postgraphile-plugin-fulltext-filter');
const tokenToGoogleID = require('./google_auth');
require('dotenv').config();

const postgraphileOptions = {
  subscriptions: true,
  watchPg: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  ignoreIndexes: false,
  handleErrors: (error) => console.log(error),
  appendPlugins: [require("@graphile-contrib/pg-simplify-inflector"), MyPlugins, PostGraphileConnectionFilterPlugin, PostGraphileFulltextFilterPlugin],
  exportGqlSchemaPath: "schema.graphql",
  graphiql: true,
  enhanceGraphiql: true,
  enableQueryBatching: true,
  legacyRelations: "omit",
  disableDefaultMutations: false,
  async additionalGraphQLContextFromRequest(req, res) {
    if (req && req && req.headers && req.headers.authorization) {
      const googleID = await tokenToGoogleID(req.headers.authorization)
      return {
        googleID
      };
    }
  },
  pgSettings: async req => {
    //if (req && req && req.headers && req.headers.authorization) {
      //const googleID = await tokenToGoogleID(req.headers.authorization)
    
      return {
        'user.googleID': 'uh oh'
      };
    //}
  },
}
const app = express();
(async () => {
  app.use(postgraphile("postgres://query_sender:restrictedPermissions@localhost:5432/rpgym", postgraphileOptions));
})();
app.listen(process.env.PORT || 4000);
