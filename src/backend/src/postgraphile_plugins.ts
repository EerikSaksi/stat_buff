const {makeExtendSchemaPlugin, gql} = require("graphile-utils");
require('dotenv').config();
const tokenToGoogleId = require('./google_auth.ts')

const MyPlugin = makeExtendSchemaPlugin(build => {
  // Get any helpers we need from `build`
  const {pgSql: sql} = build;
  return {
    typeDefs: gql`
      extend type Query{
        userByTokenId(tokenId: String!): User 
      }
      extend type Mutation{
        createUserByTokenId(tokenId: String!, username: String!): Boolean
      }
    `,
    resolvers:
    {
      Query:
      {
        userByTokenId: async (parent, args, context, resolveInfo) => {
          const googleID = await tokenToGoogleId(args.tokenId)
          console.log(`tokenId ${args.tokenId.slice(0,100)}`)
          console.log(googleID)
          const {rows} = await context.pgClient.query(
            `select username from "userID" where googleID = $1`,
            [googleID]
          );
          if (rows.length == 0) {
            console.log('There are in fact no rows')
            return null
          }
          return rows[0];
        },
      }
    },
    Mutation: {
      createUserByTokenId: async (parent, args, context, resolveInfo) => {
        const googleID = await tokenToGoogleId(args.tokenId)
        const {rows} = await context.pgClient.query(
          `select username from "userID" where googleID = '$1'`,
          [googleID]
        );

        //if user already exists return
        if (rows.length !== 0) {
          return false
        }
        
        //else create user
        await context.pgClient.query(
          `
            INSERT INTO "userID" (googleID, username)
            VALUES ($1, $2);
          `,
          [googleID, args.username]
        );
        return true
      }
    }

  };
})

module.exports = MyPlugin;
