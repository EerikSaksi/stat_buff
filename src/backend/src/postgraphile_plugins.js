const { makeExtendSchemaPlugin, gql } = require("graphile-utils");
const tokenToGoogleID = require("./google_auth");
const statsToPercentageVal = require("./strength_level/strength_level");
require("dotenv").config();

const MyPlugins = makeExtendSchemaPlugin((build) => {
  // Get any helpers we need from `build`
  const { pgSql: sql } = build;
  return {
    typeDefs: gql`
      type StrengthStats {
        averageStrength: Int!
        numExercises: Int!
        DPH: Float!
      }
      extend type Query {
        calculateStrength(exercise: String!, liftmass: Float!, repetitions: Int!): Int
      }
    `,
    resolvers: {
      Query: {
        calculateStrength: async (parent, args, context, resolveInfo) => {
          const { exercise, liftmass, repetitions } = args;

          //validate input
          if (repetitions <= 0) {
            return null;
          }

          //get if its a bodyweight exercise
          const { rows } = await context.pgClient.query('select bodyweight from "exercise" where slug_name = $1', [exercise]);
          console.log({rows})
          //also validate exercise exists
          if (!rows.length) {
            return null;
          }
          //get the users bodyStats
          const { rows: bodyStatRows } = await context.pgClient.query('select * from "bodystat" where username = (select username from active_user())');
          const { ismale, bodymass } = bodyStatRows[0];
          const gender = ismale ? "male" : "female";
          const val = await statsToPercentageVal(gender, bodymass, exercise, liftmass, repetitions, rows[0].bodyweight);
          return val;
        },
      },
    },
  };
});

module.exports = MyPlugins;
