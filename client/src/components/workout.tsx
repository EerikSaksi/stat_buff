import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WorkoutPlanPicker from "./workout/plan_picker";
import WorkoutDayPicker from "./workout/day_picker";
const Stack = createStackNavigator();
const Workout: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName = "WorkoutPlanPicker">
      <Stack.Screen name="Select Workout" component={WorkoutPlanPicker} />
      <Stack.Screen name="WorkoutDayPicker" component={WorkoutDayPicker} />
    </Stack.Navigator>
  );
};
export default Workout;
