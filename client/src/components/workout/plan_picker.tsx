import React from "react";
import { ActivityIndicator } from "react-native";
import WorkoutDayPicker from "./day_picker";
import { useNavigation } from "@react-navigation/native";
import { useWorkoutQuery } from "../../generated/graphql";

const WorkoutPlanPicker: React.FC = () => {
  const navigation = useNavigation();
  const { data } = useWorkoutQuery({
  });
  console.log(data)
  return <ActivityIndicator />;
};
export default WorkoutPlanPicker;
