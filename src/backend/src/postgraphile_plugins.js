const {makeExtendSchemaPlugin, gql} = require("graphile-utils");
const tokenToGoogleID = require("./google_auth");
require('dotenv').config();

const MyPlugins = makeExtendSchemaPlugin(build => {
  // Get any helpers we need from `build`
  const {pgSql: sql} = build;
  return {
    typeDefs: gql`
      extend type Mutation{
        createUser(username: String!): Boolean
      }
    `,
    resolvers:
    {
      Mutation:
      {
        //this is necessary because the "user" query data requires a username by default. The user needs to know their own username for them to know their own username (it's a bit silly, but that's how postgraphile interprets it)
        createUser: async (parent, args, context, resolveInfo) => {
          const {username} = args
          console.log({googleID: context.googleID})
          //contains disallowed characters, too long or too short
          if (!username.match(/^[a-zA-Z0-9._]+$/) == null || username.length >= 20 || username.length === 0) {
            return null
          }

          ////no need to ensure if already exists because of unique clause for googleID
          const {rows} = await context.pgClient.query(
            `insert into "user" (username, googleid)
             values ('${username}', '${context.googleID}')`,
          );
          return true
        }
      },
    },
  };
})

module.exports = MyPlugins;
