import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WorkoutPlanPicker from "./workout/plan_picker";
import WorkoutDayPicker from "./workout/day_picker";
import WorkoutDay from "./workout/day";
const Stack = createStackNavigator();
const Workout: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName = "WorkoutPlanPicker">
      <Stack.Screen name="Select Workout" component={WorkoutPlanPicker} />
      <Stack.Screen name="Select Workout Day" component={WorkoutDayPicker} />
      <Stack.Screen name="Workout" component={WorkoutDay} />
    </Stack.Navigator>
  );
};
export default Workout;
