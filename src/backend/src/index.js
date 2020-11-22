const express = require('express');
const {postgraphile} = require('postgraphile');
const MyPlugins = require('./postgraphile_plugins')
const PostGraphileConnectionFilterPlugin = require('postgraphile-plugin-connection-filter');
const PostGraphileFulltextFilterPlugin = require('postgraphile-plugin-fulltext-filter');
const tokenToGoogleID = require('./google_auth');
console.log(`Owner: ${process.env.OWNER_URL}`)
console.log(`DATABASE_URL: ${process.env.DATABASE_URL}`)
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
    console.log(req.headers)
    if (req && req && req.headers && req.headers.authorization) {
      console.log('ran')
      const googleID = await tokenToGoogleID(req.headers.authorization)
      return {
        googleID
      };
    }
  },
  pgSettings: async req => {
    if (req.IncomingMessage) {
      const headerAuth = req.IncomingMessage.headers.auth
      //if passed token
      if (headerAuth.length) {
        const googleID = await tokenToGoogleID(headerAuth)
        //token has format Bearer [token] so get the second word and convert it to a username
        return ({
          'user.googleID': googleID,
        })
      }
    }
  },
}
const app = express();
(async () => {
  app.use(postgraphile(process.env.DATABASE_URL, postgraphileOptions));
})();
app.listen(process.env.PORT || 4000);
