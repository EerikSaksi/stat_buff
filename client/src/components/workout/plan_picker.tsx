import React from "react";
import WorkoutDayPicker from "./day_picker";
import { useWorkoutQuery } from "../../generated/graphql";
import { ActivityIndicator } from "react-native-paper";

const WorkoutPlanPicker: React.FC = () => {
  const { data } = useWorkoutQuery();
  if (!data?.activeUser?.userCurrentWorkoutPlan?.workoutPlan) {
    return <ActivityIndicator />;
  }
  return <WorkoutDayPicker days={data.activeUser.userCurrentWorkoutPlan.workoutPlan.workoutPlanDays.nodes} />;
};
export default WorkoutPlanPicker;
