const {makeExtendSchemaPlugin, gql, } = require("graphile-utils");
const {google} = require('googleapis');
require('dotenv').config();
const {OAuth2Client} = require('google-auth-library');


const MyPlugin = makeExtendSchemaPlugin(build => {
  // Get any helpers we need from `build`
  const {pgSql: sql} = build;
  return {
    typeDefs: gql`
      extend type Query {
        userByTokenID(tokenId: String!): user
      }
    `,
    resolvers: {
      userByTokenID: async (parent, args, context, resolveInfo) => {

        //validate the token that we are given and 
        const client = new OAuth2Client(process.env.GOOGLE_AUTH_CLIENT);
        const ticket = await client.verifyIdToken({
          idToken: args.tokenId,
        });
        const payload = ticket.getPayload();
        const userID = payload['sub'];

        const [row] = await resolveInfo.graphile.selectGraphQLResultFromTable(
          sql.fragment`(select * from "app_private.userID"  where googleID = ${userID} )`,
          () => {} // no-op
        );

        //no user found
        if (row.length == 0) {
          return null
        }
        return row;
      },
    };
  })

module.exports = MyPlugin;
