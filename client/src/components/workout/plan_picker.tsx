import React, { useEffect } from "react";
import WorkoutDayPicker from "./day_picker";
import { useWorkoutQuery, useUpsertCurrentWorkoutPlanMutation } from "../../generated/graphql";
import { ActivityIndicator, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import {List} from 'react-native-paper'

const WorkoutPlanPicker: React.FC = () => {
  const navigation = useNavigation();
  const { data } = useWorkoutQuery({
    onCompleted: () => {
      if (data?.activeUser?.userCurrentWorkoutPlan?.workoutPlan) {
        //navigation.navigate("Select Workout Day", { days: data.activeUser.userCurrentWorkoutPlan.workoutPlan.workoutPlanDays.nodes });
      }
    },
  });
  const [upsertCurrentWorkoutPlan] = useUpsertCurrentWorkoutPlanMutation({
  })

  if (!data){
    return <ActivityIndicator/>
  }
  console.log(data.activeUser?.workoutPlans.nodes)
  return (
    <List.Section>
      {data.activeUser?.workoutPlans.nodes.map(plan => (
        <List.Item key = {plan.nodeId} title = {plan.name} right = {() => <Button icon = "arrow-right" onPress = {() => upsertCurrentWorkoutPlan()}>Make active</Button>} />
      ))}
    </List.Section>
  )
};
export default WorkoutPlanPicker;
