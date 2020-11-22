const {makeExtendSchemaPlugin, gql} = require("graphile-utils");
require('dotenv').config();
const tokenToUsername = require('./pg_auth')
const MyPlugins = makeExtendSchemaPlugin(build => {
  // Get any helpers we need from `build`
  const {pgSql: sql} = build;
  return {
    typeDefs: gql`
      extend type Query{
        username: String
      }
    `,
    resolvers:
    {
      Query:
      {
        //this is necessary because the "user" query data requires a username by default. The user needs to know their own username for them to know their own username (it's a bit silly, but that's how postgraphile interprets it)
        username: async (parent, args, {req}, resolveInfo) => {
          return "new user"
          if (req.headers && req.headers.authorization) {
            return await tokenToUsername(req.headers.authorization)
          }
        }
      },
    },
  };
})

module.exports = MyPlugins;
