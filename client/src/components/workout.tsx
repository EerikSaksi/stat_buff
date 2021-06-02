import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WorkoutPlanPicker from "./workout/plan_picker";
import WorkoutDayPicker from "./workout/plan_picker/day_picker";
import WorkoutDay from "./workout/plan_picker/day_picker/day";
import ExerciseSearch from "./workout/plan_picker/day_picker/exercise_search";
import { WorkoutPlanDayFragment } from "generated/graphql";

export type RootStackParamList = {
  "Select Workout": undefined;
  "Select Workout Day": { workoutPlanId: number};
  Workout: { workoutPlanDay: WorkoutPlanDayFragment};
  "Select Exercise": { planId: number };
};
const Stack = createStackNavigator<RootStackParamList>();

const Workout: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Select Workout">
      <Stack.Screen name="Select Workout" component={WorkoutPlanPicker} />
      <Stack.Screen name="Select Workout Day" component={WorkoutDayPicker} />
      <Stack.Screen name="Workout" component={WorkoutDay} options={({ route }) => ({ title: route.params.workoutPlanDay.name })} />
      <Stack.Screen name="Select Exercise" component={ExerciseSearch} />
    </Stack.Navigator>
  );
};
export default Workout;
