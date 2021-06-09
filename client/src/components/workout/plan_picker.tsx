import React, { useState, useEffect } from "react";
import { useWorkoutQuery, useUpdateUserCurrentWorkoutPlanMutation } from "../../generated/graphql";
import { ActivityIndicator, Button, Menu, Divider, TouchableRipple, Surface } from "react-native-paper";
import { List } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../workout";
import NewWorkoutPlanDialog from "./new_workout_plan_dialog";
import {View} from "react-native";

type NavigationProp = StackNavigationProp<RootStackParamList, "Select Workout">;
type Props = {
  navigation: NavigationProp;
};

const WorkoutPlanPicker: React.FC<Props> = ({ navigation }) => {
  const { data } = useWorkoutQuery({
    onCompleted: () => {
      const currentId = data?.activeUser?.currentWorkoutPlanId;
      if (currentId) {
        navigation.navigate("Select Workout Day", { workoutPlanId: currentId });
      }
    },
  });
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setVisible(true);
  }, []);
  const [updateUserCurrentWorkoutPlan] = useUpdateUserCurrentWorkoutPlanMutation();
  if (!data?.activeUser) {
    return <ActivityIndicator />;
  }
  return (
    <List.Section>
      {data.activeUser.workoutPlans.nodes.map((plan) => (
        <List.Item
          style={{ marginBottom: 1, backgroundColor: "lightblue" }}
          title={plan.name}
          left={() => <List.Icon icon="clipboard-list" />}
          right={() => (
            <View style = {{ justifyContent: 'center', alignItems: 'center' }}>
              <Button icon="dots-vertical">{""}</Button>
            </View>
          )}
        >
          {""}
        </List.Item>
      ))}
      <NewWorkoutPlanDialog
        userId={data.activeUser.id}
        workoutPlanNames={data.activeUser.workoutPlans.nodes.map((workoutPlan) => workoutPlan.name)}
      />
    </List.Section>
  );
};
export default WorkoutPlanPicker;
