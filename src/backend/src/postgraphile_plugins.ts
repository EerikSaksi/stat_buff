const {makeExtendSchemaPlugin, gql, } = require("graphile-utils");
require('dotenv').config();
const {OAuth2Client} = require('google-auth-library');
const MyPlugin = makeExtendSchemaPlugin(build => {
  // Get any helpers we need from `build`
  const {pgSql: sql} = build;
  return {
    typeDefs: gql`
      extend type Query{
        appPublicUserByTokenID(tokenId: String!): AppPublicUser
      }
    `,
    resolvers:
    {
      Query:
      {
        appPublicUserByTokenID: async (parent, args, context, resolveInfo) => {

          //validate the token that we are given and 
          const client = new OAuth2Client(process.env.GOOGLE_AUTH_CLIENT);
          const ticket = await client.verifyIdToken({
            idToken: args.tokenId,
          });
          const payload = ticket.getPayload();
          const userID = payload['sub'];
          const {rows} = await context.pgClient.query(`select userName from "app_private.userID" where googleID = '${userID}'`);
          return rows[0];
        },
      }
    }
  };
})

module.exports = MyPlugin;
