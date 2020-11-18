const {makeExtendSchemaPlugin, gql} = require("graphile-utils");
require('dotenv').config();
const tokenToUsername= require('./pg_auth')
const MyPlugins = makeExtendSchemaPlugin(build => {
  // Get any helpers we need from `build`
  const {pgSql: sql} = build;
  return {
    typeDefs: gql`
      extend type Query{
        usernameByTokenID(tokenID: String!): String
      }
    `,
    resolvers:
    {
      Query:
      {
        //this is necessary because the "user" query data requires a username by default. The user needs to know their own username for them to know their own username (it's a bit silly, but that's how postgraphile interprets it)
        usernameByTokenID: async (parent, args, context, resolveInfo) => {
          return await tokenToUsername(args.tokenID)
        }
      }
    },
  };
})

module.exports = MyPlugins;
