import React from "react";
import { useWorkoutQuery, useUpdateUserCurrentWorkoutPlanMutation } from "../../generated/graphql";
import { ActivityIndicator, Checkbox, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { List } from "react-native-paper";
import { View, Text } from "react-native";

const WorkoutPlanPicker: React.FC = () => {
  const navigation = useNavigation();
  const { data } = useWorkoutQuery();

  const [updateUserCurrentWorkoutPlan] = useUpdateUserCurrentWorkoutPlanMutation();
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
                  status={plan.id === data.activeUser?.currentWorkoutPlanId ? "checked" : "unchecked"}
                  onPress={() => {
                    if (data.activeUser?.id) {
                      const currentWorkoutPlanId = plan.id === data.activeUser?.currentWorkoutPlanId ? null : plan.id
                      const userId = data.activeUser.id
                      updateUserCurrentWorkoutPlan({ variables: { userId: data.activeUser.id, currentWorkoutPlanId }, optimisticResponse: {
                        updateUser: {
                          __typename: "UpdateUserPayload",
                          user: {
                            __typename: "User",
                            id: userId,
                            currentWorkoutPlanId
                          }
                        }
                      }});
                    }
                  }}
                />
                <Button icon="arrow-right" onPress={() => navigation.navigate("Select Workout Day", { workoutPlanId: plan.id })}>
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
