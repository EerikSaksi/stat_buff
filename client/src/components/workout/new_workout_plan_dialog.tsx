import React, { useState} from "react";
import { TextInput, Portal, Dialog, Button } from "react-native-paper";
import { useCreateWorkoutPlanMutation, WorkoutPlanFragmentDoc } from "../../generated/graphql";
import useDuplicateValidation from "./use_duplicate_validation";

const NewWorkoutPlanDialog: React.FC<{ userId: number; workoutPlanNames: string[] }> = ({ userId, workoutPlanNames }) => {
  const [newWorkoutPlanName, setNewWorkoutPlanName] = useState<undefined | string>();
  const closeDialog = () => setNewWorkoutPlanName(undefined);
  const { duplicateError } = useDuplicateValidation(workoutPlanNames, newWorkoutPlanName, undefined);

  const [createWorkoutPlan] = useCreateWorkoutPlanMutation({
    update(cache, { data: createWorkoutPlanData }) {
      cache.modify({
        id: `User:${userId}`,
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
  });
  return (
    <>
      <Button icon="table-row-plus-after" onPress={() => setNewWorkoutPlanName("")}>
        Create new plan
      </Button>
      <Portal>
        <Dialog visible={newWorkoutPlanName !== undefined} onDismiss={closeDialog}>
          <Dialog.Title>Enter New Plan Name</Dialog.Title>
          <Dialog.Content>
            <TextInput
              autoFocus
              dense
              mode="outlined"
              error={duplicateError}
              label={duplicateError ? `${newWorkoutPlanName} already exists` : undefined}
              value={newWorkoutPlanName}
              onChangeText={(t) => setNewWorkoutPlanName(t)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeDialog}>Cancel</Button>
            <Button
              disabled={newWorkoutPlanName === undefined || !newWorkoutPlanName.length || duplicateError}
              mode="contained"
              onPress={() => {
                closeDialog()
                createWorkoutPlan({
                  variables: {
                    name: newWorkoutPlanName!,
                    userId,
                  },
                  optimisticResponse: {
                    createWorkoutPlan: {
                      __typename: "CreateWorkoutPlanPayload",
                      workoutPlan: { __typename: "WorkoutPlan", name: newWorkoutPlanName!, id: -1 },
                    },
                  },
                });
              }}
            >
              Submit
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};
export default NewWorkoutPlanDialog;
