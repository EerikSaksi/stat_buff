import React, {useRef, useEffect, useState} from 'react';
import {
  useSaveWorkoutMutation,
  SetsAndExerciseIdInput,
  CompletedSetInput,
} from '../../../../generated/graphql';
import {Button, Portal, Dialog} from 'react-native-paper';
import {View, Text} from 'react-native';
import {LocalExerciseSets} from './use_local_sets';

//given the sets that are stored locally, this function transforms this to the input format required.
const transformLocalSetsToInput = (
  localExerciseSets: LocalExerciseSets,
): SetsAndExerciseIdInput[] => {
  const toReturn: SetsAndExerciseIdInput[] = [];
  for (const [_, {exerciseId, conditionalSets}] of Object.entries(
    localExerciseSets,
  )) {
    //filter sets that were not completed, and cast to Volume (where reps and sets must be defined)
    const completedSets = conditionalSets
      .filter(({reps, weight}) => reps && weight)
      .map(
        ({reps, weight}) =>
          ({
            reps,
            weight,
          } as CompletedSetInput),
      );
    if (completedSets.length) {
      toReturn.push({completedSets, exerciseId});
    }
  }
  return toReturn;
};
const WorkoutTimer: React.FC<{
  localExerciseSets: LocalExerciseSets;
}> = ({localExerciseSets}) => {
  const startTime = useRef<Date | undefined>();
  const [minutes, setMinutes] = useState<undefined | number>();
  const [dialogVisible, setDialogVisible] = useState(false);
  const closeDialog = () => setDialogVisible(false);

  const [saveWorkout] = useSaveWorkoutMutation({
    variables: {
      exerciseIdsAndSets: transformLocalSetsToInput(localExerciseSets),
    },
  });

  useEffect(() => {
    if (!startTime.current) {
      //user has tracked a lift, then start the timer
      for (const [_, {conditionalSets}] of Object.entries(localExerciseSets)) {
        if (conditionalSets.some(({weight, reps}) => weight || reps)) {
          startTime.current = new Date();
          setMinutes(0);
          break;
        }
      }
    }
    const interval = setInterval(() => {
      if (startTime.current) {
        setMinutes(Math.floor((+new Date() - +startTime.current) / 60000));
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [startTime, localExerciseSets]);

  if (minutes === undefined) {
    return null;
  }
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        flex: 1,
        justifyContent: 'center',
        padding: 8,
      }}>
      <Button
        mode="contained"
        labelStyle={{fontSize: 18}}
        icon="stop-circle"
        onPress={() => setDialogVisible(true)}>
        <Text style={{fontSize: 14}}>{minutes} min</Text>
      </Button>
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={closeDialog}>
          <Dialog.Title>Do you want to end your workout?</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={closeDialog}>Cancel</Button>
            <Button
              mode="contained"
              onPress={() => {
                closeDialog();
                saveWorkout();
              }}>
              End
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
export default WorkoutTimer;
