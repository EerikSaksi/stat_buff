const express = require('express');
const {postgraphile} = require('postgraphile');
const MyPlugins = require('./postgraphile_plugins')
const PostGraphileConnectionFilterPlugin = require('postgraphile-plugin-connection-filter');
const PostGraphileFulltextFilterPlugin = require('postgraphile-plugin-fulltext-filter');
const googleIDToUsername = require('./pg_auth');
const tokenToGoogleID = require('./google_auth');
console.log(`Owner: ${process.env.OWNER_URL}`)
console.log(`DATABASE_URL: ${process.env.DATABASE_URL}`)
require('dotenv').config();


const postgraphileOptions =
  process.env.NODE_ENV === 'development'
    ? {
      subscriptions: true,
      watchPg: true,
      dynamicJson: true,
      setofFunctionsContainNulls: false,
      ignoreRBAC: false,
      ignoreIndexes: false,
      handleErrors: (error) => console.log(error),
      appendPlugins: [require("@graphile-contrib/pg-simplify-inflector"), MyPlugins, PostGraphileConnectionFilterPlugin,],
      exportGqlSchemaPath: "schema.graphql",
      graphiql: true,
      enhanceGraphiql: true,
      enableQueryBatching: true,
      legacyRelations: "omit",
      disableDefaultMutations: false,
      pgSettings: async req => {
        return ({
          'user.username': "orek",
          'user.googleID': "uh oh"
        })

        if (req.IncomingMessage) {
          const headerAuth = req.IncomingMessage.headers.auth
          //if passed token
          if (headerAuth.length) {
            const googleID = tokenToGoogleID(headerAuth)
            const username = googleIDToUsername(googleID)
            //token has format Bearer [token] so get the second word and convert it to a username
            return ({
              'user.username': username,
              'user.googleID': googleID
            })
          }
        }
      },
      ownerConnectionString: process.env.OWNER_URL
    }
    : {
      subscriptions: true,
      retryOnInitFail: true,
      dynamicJson: true,
      setofFunctionsContainNulls: false,
      ignoreRBAC: false,
      ignoreIndexes: false,
      extendedErrors: ['errcode'],
      appendPlugins: [require("@graphile-contrib/pg-simplify-inflector"), MyPlugins, PostGraphileConnectionFilterPlugin, PostGraphileFulltextFilterPlugin,],
      graphiql: false,
      enableQueryBatching: true,
      disableQueryLog: true, // our default logging has performance issues, but do make sure you have a logging system in place!
      legacyRelations: 'omit',
      disableDefaultMutations: false,
    };

const app = express();
(async () => {
  console.log('ran')
  app.use(postgraphile(process.env.DATABASE_URL, postgraphileOptions));
})();
app.listen(process.env.PORT || 4000);
