import React from "react";
import { List, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { gql } from "@apollo/client";
const FETCH_WORKOUT_PLAN = gql`
  query {
    user() {
      workoutPlans {
        nodes {
          workoutExercises {
            sets
            reps
            exercise {
              name
            }
          }
        }
      }
    }
  }
`;
const Workout: React.FC = () => (
  <SafeAreaView>
    <List.Section>
      <List.Item title="Squat" right={() => <TextInput />} />
    </List.Section>
  </SafeAreaView>
);
export default Workout;
