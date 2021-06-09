import React, { useState } from "react";
import {
  useWorkoutQuery,
  useUpdateUserCurrentWorkoutPlanMutation,
  useCreateWorkoutPlanMutation,
  WorkoutPlanFragmentDoc,
} from "../../generated/graphql";
import { ActivityIndicator, Checkbox, Button, TextInput, Portal, Dialog } from "react-native-paper";
import { List } from "react-native-paper";
import { View, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../workout";

type NavigationProp = StackNavigationProp<RootStackParamList, "Select Workout">;
type Props = {
  navigation: NavigationProp;
};

const WorkoutPlanPicker: React.FC<Props> = ({ navigation }) => {
  const { data } = useWorkoutQuery();
  const [updateUserCurrentWorkoutPlan] = useUpdateUserCurrentWorkoutPlanMutation();
  const [newWorkoutPlanName, setNewWorkoutPlanName] = useState<undefined | string>();
  const closeDialog = () => setNewWorkoutPlanName(undefined);
  const [createWorkoutPlan] = useCreateWorkoutPlanMutation({
    update(cache, { data: createWorkoutPlanData }) {
      cache.modify({
        id: cache.identify(data!.activeUser!),
        fields: {
          workoutPlans(existingWorkoutPlans = { nodes: [] }) {
            const newWorkoutPlan = createWorkoutPlanData?.createWorkoutPlan?.workoutPlan;
            if (newWorkoutPlan) {
              const newWorkoutPlanExercise = cache.writeFragment({
                data: newWorkoutPlan,
                fragment: WorkoutPlanFragmentDoc,
              });
              return { nodes: [...existingWorkoutPlans.nodes, newWorkoutPlanExercise] };
            }
          },
        },
      });
    },
    onCompleted: closeDialog,
  });
  console.log(newWorkoutPlanName);
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
                      const currentWorkoutPlanId = plan.id === data.activeUser?.currentWorkoutPlanId ? null : plan.id;
                      const userId = data.activeUser.id;
                      updateUserCurrentWorkoutPlan({
                        variables: { userId: data.activeUser.id, currentWorkoutPlanId },
                        optimisticResponse: {
                          updateUser: {
                            __typename: "UpdateUserPayload",
                            user: {
                              __typename: "User",
                              id: userId,
                              currentWorkoutPlanId,
                            },
                          },
                        },
                      });
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
        <Button icon="table-row-plus-after" onPress={() => setNewWorkoutPlanName("")}>
          Create new plan
        </Button>
        <Portal>
          <Dialog visible={newWorkoutPlanName !== undefined} onDismiss={closeDialog}>
            <Dialog.Title>Enter name for new plan</Dialog.Title>
            <Dialog.Content>
              <TextInput autoFocus dense mode="outlined" value={newWorkoutPlanName} onChangeText={(t) => setNewWorkoutPlanName(t)} />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={closeDialog}>Cancel</Button>
              <Button
                disabled={newWorkoutPlanName === undefined || !newWorkoutPlanName.length || !data.activeUser.id}
                mode="contained"
                onPress={() =>
                  createWorkoutPlan({
                    variables: {
                      name: newWorkoutPlanName!,
                      userId: data!.activeUser!.id,
                    },
                  })
                }
              >
                Submit
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </List.Section>
    </>
  );
};
export default WorkoutPlanPicker;
