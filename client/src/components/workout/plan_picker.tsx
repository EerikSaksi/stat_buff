import React, { useCallback } from "react";
import { useWorkoutQuery, WorkoutPlanFragment } from "../../generated/graphql";
import { ActivityIndicator } from "react-native-paper";
import { List } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../workout";
import NewWorkoutPlanDialog from "./new_workout_plan_dialog";
import { ScrollView } from "react-native";
import ListItemWithMenu from "./list_item_with_menu";

type NavigationProp = StackNavigationProp<RootStackParamList, "Select Workout">;
type Props = {
  navigation: NavigationProp;
};

const WorkoutPlanPicker: React.FC<Props> = ({ navigation }) => {
  const { data } = useWorkoutQuery({
    onCompleted: () => {
      const currentId = data?.activeUser?.currentWorkoutPlanId;
      if (currentId) {
        //navigation.navigate("Select Workout Day", { workoutPlanId: currentId });
      }
    },
  });

  const onListItemPress = useCallback((plan: WorkoutPlanFragment) => {
    navigation.navigate("Select Workout Day", { workoutPlanId: plan.id });
  }, []);

  if (!data?.activeUser?.id) {
    return <ActivityIndicator />;
  }
  return (
    <ScrollView contentContainerStyle={{ flex: 1, alignItems: "center" }}>
      <List.Section style={{ width: "80%" }}>
        {data.activeUser.workoutPlans.nodes.map((workoutPlan) => (
          <ListItemWithMenu key={workoutPlan.id} workoutPlan={workoutPlan} onPress={onListItemPress} userId = {data.activeUser!.id} isDefault = {workoutPlan.id === data.activeUser!.currentWorkoutPlanId} />
        ))}
        <NewWorkoutPlanDialog
          userId={data.activeUser.id}
          workoutPlanNames={data.activeUser.workoutPlans.nodes.map((workoutPlan) => workoutPlan.name)}
        />
      </List.Section>
    </ScrollView>
  );
};
export default WorkoutPlanPicker;
