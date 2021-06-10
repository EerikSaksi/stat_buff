import React, { useState } from "react";
import { Button, Menu, List, TouchableRipple, DefaultTheme } from "react-native-paper";
import { View } from "react-native";
import { WorkoutPlanFragment, useUpdateUserCurrentWorkoutPlanMutation } from "../../generated/graphql";

const ListItemWithMenu: React.FC<{
  workoutPlan: WorkoutPlanFragment;
  onPress: (WorkoutPlanFragment: any) => void;
  userId: number;
  isDefault: boolean;
}> = ({ workoutPlan, onPress, userId, isDefault }) => {
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const [updateUserCurrentWorkout] = useUpdateUserCurrentWorkoutPlanMutation();

  return (
    <TouchableRipple onPress={() => onPress(workoutPlan)}>
      <List.Item
        title={editing workoutPlan.name}
        left={() => (
          <List.Icon icon={isDefault ? "clipboard-check" : "clipboard-list"} color={isDefault ? DefaultTheme.colors.primary : undefined} />
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
            <Menu.Item onPress={() => setEditing(true)} title="Rename" />
          </Menu>
        )}
      >
        {""}
      </List.Item>
    </TouchableRipple>
  );
};
export default ListItemWithMenu;
