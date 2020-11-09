const express = require('express');
const {postgraphile} = require('postgraphile');
const MyPlugins = require('./postgraphile_plugins')

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
      appendPlugins: [require("@graphile-contrib/pg-simplify-inflector"), MyPlugins],
      exportGqlSchemaPath: "schema.graphql",
      graphiql: true,
      enhanceGraphiql: true,
      enableQueryBatching: true,
      legacyRelations: "omit",
      disableDefaultMutations: true,
    }
    : {
      subscriptions: true,
      retryOnInitFail: true,
      dynamicJson: true,
      setofFunctionsContainNulls: false,
      ignoreRBAC: false,
      ignoreIndexes: false,
      extendedErrors: ['errcode'],
      appendPlugins: [require('@graphile-contrib/pg-simplify-inflector'), MyPlugins],
      graphiql: false,
      enableQueryBatching: true,
      disableQueryLog: true, // our default logging has performance issues, but do make sure you have a logging system in place!
      legacyRelations: 'omit',
      disableDefaultMutations: true,
    };

const app = express();
(async () => {
  app.use(postgraphile(process.env.DATABASE_URL, postgraphileOptions, 'public'));
})();
app.listen(process.env.PORT || 4000);
