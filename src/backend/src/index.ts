const express = require('express');
const {postgraphile} = require('postgraphile');
//const MyPlugin = require('./src/postgraphile_plugins.ts')

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
      showErrorStack: 'json',
      extendedErrors: ['hint', 'detail', 'errcode'],
      appendPlugins: [require('@graphile-contrib/pg-simplify-inflector')],
      exportGqlSchemaPath: 'schema.graphql',
      graphiql: true,
      enhanceGraphiql: true,
      enableQueryBatching: true,
      legacyRelations: 'omit',
    }
    : {
      subscriptions: true,
      retryOnInitFail: true,
      dynamicJson: true,
      setofFunctionsContainNulls: false,
      ignoreRBAC: false,
      ignoreIndexes: false,
      extendedErrors: ['errcode'],
      appendPlugins: [require('@graphile-contrib/pg-simplify-inflector')],
      graphiql: false,
      enableQueryBatching: true,
      disableQueryLog: true, // our default logging has performance issues, but do make sure you have a logging system in place!
      legacyRelations: 'omit',
    };

const app = express();
(async () => {
  console.log('Running')
  app.use(postgraphile(process.env.DATABASE_URL, postgraphileOptions, 'public'));
})();

app.listen(process.env.PORT || 4000);
module.exports = {}
