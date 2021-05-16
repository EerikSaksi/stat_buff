import React, { useRef } from "react";
import { useWorkoutQuery, useUpsertCurrentWorkoutPlanMutation, useDeleteCurrentWorkoutPlanMutation } from "../../generated/graphql";
import { ActivityIndicator, Checkbox, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { List } from "react-native-paper";
import { View, Text } from "react-native";


const WorkoutPlanPicker: React.FC = () => {
  const alreadyTriedNavigating = useRef(false);
  const navigation = useNavigation();
  const { data } = useWorkoutQuery({
    onCompleted: (data) => {
      if (!alreadyTriedNavigating.current && data?.activeUser?.userCurrentWorkoutPlan?.workoutPlan) {
        navigation.navigate("Select Workout Day", { days: data.activeUser.userCurrentWorkoutPlan.workoutPlan.workoutPlanDays.nodes });
        alreadyTriedNavigating.current = true;
      }
    },
  });
  const [upsertCurrentWorkoutPlan] = useUpsertCurrentWorkoutPlanMutation();
  const [deleteCurrentWorkoutPlanMutation] = useDeleteCurrentWorkoutPlanMutation();

  if (!data?.activeUser) {
    return <ActivityIndicator />;
  }
  return (
    <>
      <List.Section>
        {data.activeUser.workoutPlans.nodes.map((plan) => (
          <List.Item
            key={plan.id}
            title={plan.name}
            right={() => (
              <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                <Text>Default</Text>
                <Checkbox
                  status={plan.id === data.activeUser?.userCurrentWorkoutPlan?.workoutPlan?.id ? "checked" : "unchecked"}
                  onPress={() => {
                    if (data.activeUser) {
                      if (plan.id === data.activeUser?.userCurrentWorkoutPlan?.workoutPlan?.id) {
                        deleteCurrentWorkoutPlanMutation({ variables: { userId: data.activeUser.id } });
                      } else {
                        upsertCurrentWorkoutPlan({ variables: { userId: data.activeUser.id, workoutPlanId: plan.id } });
                      }
                    }
                  }}
                />
                <Button icon="arrow-right" onPress={() => navigation.navigate("Select Workout Day", { days: plan.workoutPlanDays.nodes })}>
                  View
                </Button>
              </View>
            )}
          />
        ))}
      </List.Section>
    </>
  );
};
export default WorkoutPlanPicker;
