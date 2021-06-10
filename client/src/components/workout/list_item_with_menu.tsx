import React, { useState } from "react";
import { Button, Menu, List, TouchableRipple, DefaultTheme, TextInput } from "react-native-paper";
import { View } from "react-native";
import { WorkoutPlanFragment, useUpdateUserCurrentWorkoutPlanMutation, useRenameWorkoutPlanMutation } from "../../generated/graphql";

const ListItemWithMenu: React.FC<{
  workoutPlan: WorkoutPlanFragment;
  onPress: (WorkoutPlanFragment: any) => void;
  userId: number;
  isDefault: boolean;
}> = ({ workoutPlan, onPress, userId, isDefault }) => {
  const [visible, setVisible] = useState(false);
  const [newPlanName, setNewPlanName] = useState<undefined | string>();
  const [updateUserCurrentWorkout] = useUpdateUserCurrentWorkoutPlanMutation();
  const [renameWorkoutPlan] = useRenameWorkoutPlanMutation({
    variables: {
      name: newPlanName!,
      workoutPlanId: workoutPlan.id,
    },
    onCompleted: () => setNewPlanName(undefined),
  });
  return (
    <TouchableRipple onPress={() => onPress(workoutPlan)}>
      <List.Item
        title={newPlanName === undefined ? workoutPlan.name : ""}
        titleStyle = {{padding: 4}}
        left={() => (
          <>
            <List.Icon
              icon={isDefault ? "clipboard-check" : "clipboard-list"}
              color={isDefault ? DefaultTheme.colors.primary : undefined}
            />
            {newPlanName === undefined ? null : (
              <>
                <TextInput value={newPlanName}  onChangeText={(t) => setNewPlanName(t)} autoFocus dense style = {{ height: 55}}></TextInput>
                <View style={{ justifyContent: "center" }}>
                  <Button icon="check" labelStyle={{ fontSize: 24 }} onPress={() => renameWorkoutPlan()}>
                    {""}
                  </Button>
                </View>
              </>
            )}
          </>
        )}
        right={() => (
          <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            style={{ alignItems: "center", justifyContent: "center" }}
            anchor={
              <View style={{ justifyContent: "center", flex: 1 }}>
                <Button
                  icon="dots-vertical"
                  onPress={() => {
                    console.log("pressed");
                    setVisible(true);
                  }}
                >
                  {""}
                </Button>
              </View>
            }
          >
            <Menu.Item
              onPress={() => {
                updateUserCurrentWorkout({
                  variables: { currentWorkoutPlanId: workoutPlan.id, userId },
                  optimisticResponse: {
                    updateUser: {
                      __typename: "UpdateUserPayload",
                      user: {
                        __typename: "User",
                        id: userId,
                        currentWorkoutPlanId: workoutPlan.id,
                      },
                    },
                  },
                });

                setVisible(false);
              }}
              title="Set as default"
            />
            <Menu.Item
              onPress={() => {
                setNewPlanName(workoutPlan.name);
                setVisible(false);
              }}
              title="Rename"
            />
          </Menu>
        )}
      >
        {""}
      </List.Item>
    </TouchableRipple>
  );
};
export default ListItemWithMenu;
