import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WorkoutPlanPicker from "./workout/plan_picker";
import WorkoutDayPicker from "./workout/plan_picker/day_picker";
import WorkoutDay from "./workout/plan_picker/day_picker/day";
import ExerciseSearch from "./workout/plan_picker/day_picker/edit_day/add_exercise";
import { WorkoutPlanDayByIdQuery } from "../generated/graphql";

export type RootStackParamList = {
  "Select Workout": undefined;
  "Select Workout Day": { workoutPlanId: number};
  Workout: { dayId: number, name: string};
  "Select Exercise": { workoutPlanDayData: WorkoutPlanDayByIdQuery};
};
const Stack = createStackNavigator<RootStackParamList>();

const Workout: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Select Workout">
      <Stack.Screen name="Select Workout" component={WorkoutPlanPicker} />
      <Stack.Screen name="Select Workout Day" component={WorkoutDayPicker} />
      <Stack.Screen name="Workout" component={WorkoutDay}/>
      <Stack.Screen name="Select Exercise" component={ExerciseSearch} />
    </Stack.Navigator>
  );
};
export default Workout;
