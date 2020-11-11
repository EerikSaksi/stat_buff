const {makeExtendSchemaPlugin, gql} = require("graphile-utils");
require('dotenv').config();
const tokenToGoogleId = require('./google_auth')

const MyPlugins = makeExtendSchemaPlugin(build => {
  // Get any helpers we need from `build`
  const {pgSql: sql} = build;
  return {
    typeDefs: gql`
      extend type Query{
        userByTokenID(tokenID: String!): User 
      }
      extend type Mutation{
        createUserByTokenID(tokenID: String!, username: String!): Boolean
      }
    `,
    resolvers:
    {
      Query:
      {
        userByTokenID: async (parent, args, context, resolveInfo) => {
          const googleID = await tokenToGoogleId(args.tokenID)
          console.log(`tokenID ${args.tokenID.slice(0,100)}`)
          console.log(googleID)
          const {rows} = await context.pgClient.query(
            `select username from "userID" where googleID = $1`,
            [googleID]
          );
          if (rows.length == 0) {
            throw "No users";
          }
          return rows[0];
        },
      }
    },
    Mutation: {
      createUserByTokenID: async (parent, args, context, resolveInfo) => {
        //invalid username
        if (username.length >= 20 || !username.match(/^[a-zA-Z0-9._]+$/) == null && username.length !== 0) {
          return false
        }
        const googleID = await tokenToGoogleID(args.tokenID)
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

module.exports = MyPlugins;
