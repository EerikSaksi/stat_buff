const {makeExtendSchemaPlugin, gql} = require("graphile-utils");
require('dotenv').config();
const {OAuth2Client} = require('google-auth-library');

const MyPlugin = makeExtendSchemaPlugin(build => {
  // Get any helpers we need from `build`
  const {pgSql: sql} = build;
  return {
    typeDefs: gql`
      extend type Query{
        userByTokenID(tokenId: String!): User 
        }
    `,
    resolvers:
    {
      Query:
      {
        appPublicUserByTokenID: async (parent, args, context, resolveInfo) => {
          //
          ////validate the token that we are given and 
          //const client = new OAuth2Client(process.env.GOOGLE_AUTH_CLIENT);
          //const ticket = await client.verifyIdToken({
          //  idToken: args.tokenId,
          //});
          //const payload = ticket.getPayload();
          //const userID = payload['sub'];
          console.log(args)
          const {rows} = await context.pgClient.query(`select userName from "userID" where googleID = '${args.tokenId}'`);
          if (rows.length == 0){
            return null
          }
          return rows[0];
        },
      }
    }
  };
})

module.exports = MyPlugin;
