const {makeExtendSchemaPlugin, gql} = require("graphile-utils");
const tokenToGoogleID = require("./google_auth");
const statsToPercentageVal = require("./strength_level/strength_level");
require('dotenv').config();

const MyPlugins = makeExtendSchemaPlugin(build => {
  // Get any helpers we need from `build`
  const {pgSql: sql} = build;
  return {
    typeDefs: gql`
      extend type Mutation{
        createUser(username: String!): Boolean
      }
      extend type Query{
        calculateStrength(exercise: String!, liftmass: Float!, repetitions: Int!): Int
        averageStrength: Float
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
             values ('${username}', current_setting('user.googleID'))`,
          );
          return true
        }
      },
      Query: {
        calculateStrength: async (parent, args, context, resolveInfo) => {
          const {exercise, liftmass, repetitions} = args

          //validate input
          if (repetitions <= 0 || liftmass <= 0 ){
            return null
          }

          //check the exercise exists
          const {rows} = await context.pgClient.query(
            'select count(*) from "exercise" where slug_name = $1',
            [exercise]
          );
          if (!rows.length){
            return null
          }

          //get the users bodyStats
          const {rows: bodyStatRows} = await context.pgClient.query(
            'select * from "bodystat" where username() = username'
          );
          const {ismale, bodymass} = bodyStatRows[0]
          const gender = ismale ? "male" : "female"
          const val = await statsToPercentageVal(gender, bodymass, exercise, liftmass, repetitions)
          return val
        },
        averageStrength: async (parent, args, context, resolveInfo) => {
          //check the exercise exists
          const {rows} = await context.pgClient.query(
            'select avg("user_exercise".strongerpercentage) from "user_exercise" where username = username()',
          );
          return rows[0].avg
        }
      }

    },
  };
})

module.exports = MyPlugins;
