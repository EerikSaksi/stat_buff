import React, { useState, useEffect } from "react";
import { useWorkoutQuery, useUpdateUserCurrentWorkoutPlanMutation } from "../../generated/graphql";
import { ActivityIndicator, Button, Menu, Divider, TouchableRipple, Surface, DefaultTheme } from "react-native-paper";
import { List } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../workout";
import NewWorkoutPlanDialog from "./new_workout_plan_dialog";
import { View, ScrollView } from "react-native";

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
    <ScrollView contentContainerStyle={{ flex: 1, alignItems: "center" }}>
      <List.Section style={{ width: "70%" }}>
        {data.activeUser.workoutPlans.nodes.map((plan) => (
          <TouchableRipple
            key={plan.id}
            style={{ marginBottom: "4%" }}
            onPress={() => navigation.navigate("Select Workout Day", { workoutPlanId: plan.id })}
          >
            <List.Item
              style={{ borderColor: DefaultTheme.colors.primary, borderWidth: 1, borderRadius: 10 }}
              title={plan.name}
              left={() => <List.Icon icon="clipboard-list" />}
              right={() => (
                <Menu
                  visible={false}
                  onDismiss={() => null}
                  style={{ alignItems: "center", justifyContent: "center" }}
                  anchor={
                    <View style={{ justifyContent: "center", flex: 1 }}>
                      <Button icon="dots-vertical">{""}</Button>
                    </View>
                  }
                >
                  <Menu.Item onPress={() => {}} title="Item 1" />
                  <Menu.Item onPress={() => {}} title="Item 2" />
                  <Divider />
                  <Menu.Item onPress={() => {}} title="Item 3" />
                </Menu>
              )}
            >
              {""}
            </List.Item>
          </TouchableRipple>
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
