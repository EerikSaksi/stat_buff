import React from "react";
import { List, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { gql, useQuery } from "@apollo/client";
import { View } from "react-native";
const FETCH_WORKOUT_PLAN = gql`
  query{
    activeUser{
      workoutPlans{
        nodes{
          workoutExercises{
            sets
            reps
            exercise{
              name
            }
          }
        }
      }
    }
  }
    `;
const Workout: React.FC = () => {
  const { data } = useQuery(FETCH_WORKOUT_PLAN);
  console.log(data);
  return (
    <SafeAreaView>
      <List.Section>
        <List.Item
          title="Squat"
          left={() => (
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", height: "70%", alignItems: "center" }}>
              <TextInput style={{ marginRight: "5%" }} />
              <TextInput />
            </View>
          )}
        />
      </List.Section>
    </SafeAreaView>
  );
};
export default Workout;
