import React, {useState} from 'react';
import {
  List,
  Portal,
  Dialog,
  Button,
  Text,
  TextInput,
} from 'react-native-paper';
import {
  useUpdateWorkoutPlanExerciseSetsMutation,
  WorkoutPlanExerciseFragment,
} from '../../../../../generated/graphql';

const EditExerciseButtons: React.FC<{
  workoutPlanExercise: WorkoutPlanExerciseFragment;
  setLastDeletedWorkoutExerciseId: (arg: number) => void;
}> = ({workoutPlanExercise, setLastDeletedWorkoutExerciseId}) => {
  const [updateUserCurrentWorkoutPlanSets] =
    useUpdateWorkoutPlanExerciseSetsMutation();
  const [dialogVisible, setDialogVisible] = useState(false);
  const closeDialog = () => setDialogVisible(false);
  const [newSets, setNewSets] = useState<number | undefined>(
    workoutPlanExercise.sets,
  );
  const [newReps, setNewReps] = useState<number | undefined>(
    workoutPlanExercise.reps,
  );

  return (
    <List.Item
      title=""
      left={() => (
        <Portal>
          <Dialog visible={dialogVisible} onDismiss={closeDialog}>
            <Dialog.Title>
              Edit {workoutPlanExercise.exercise.name} (
              {workoutPlanExercise.sets}x{workoutPlanExercise.reps})
            </Dialog.Title>
            <Dialog.Content
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                value={newSets ? newSets.toString() : ''}
                onChangeText={t => {
                  const newVal = parseInt(t);
                  setNewSets(isNaN(newVal) ? undefined : newVal);
                }}
                dense
                mode="outlined"
                keyboardType="numeric"
              />
              <Text style={{fontSize: 16, margin: '2%'}}>sets of</Text>
              <TextInput
                value={newReps ? newReps.toString() : ''}
                onChangeText={t => {
                  const newVal = parseInt(t);
                  setNewReps(isNaN(newVal) ? undefined : newVal);
                }}
                dense
                mode="outlined"
                keyboardType="numeric"
              />
              <Text style={{fontSize: 16, margin: '2%'}}>reps</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={closeDialog}>Cancel</Button>
              <Button
                disabled={!newSets || !newReps}
                onPress={() => {
                  //only save if the values changed to save server request
                  if (
                    newSets !== workoutPlanExercise.sets ||
                    newReps !== workoutPlanExercise.reps
                  ) {
                    updateUserCurrentWorkoutPlanSets({
                      variables: {
                        sets: newSets!,
                        reps: newReps!,
                        id: workoutPlanExercise.id,
                      },
                      optimisticResponse: {
                        updateWorkoutPlanExercise: {
                          __typename: 'UpdateWorkoutPlanExercisePayload',
                          workoutPlanExercise: {
                            __typename: 'WorkoutPlanExercise',
                            ...workoutPlanExercise,
                            sets: newSets!,
                            reps: newReps!,
                          },
                        },
                      },
                    });
                  }
                  closeDialog();
                }}>
                Save
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}
      right={() => (
        <>
          <Button
            contentStyle={{scaleX: 1.2, scaleY: 1.2}}
            icon="pencil"
            onPress={() => setDialogVisible(true)}>
            {''}
          </Button>
          <Button
            icon="delete-circle"
            onPress={() =>
              setLastDeletedWorkoutExerciseId(workoutPlanExercise.id)
            }
            contentStyle={{scaleX: 1.2, scaleY: 1.2}}>
            {''}
          </Button>
        </>
      )}
    />
  );
};
export default EditExerciseButtons;
