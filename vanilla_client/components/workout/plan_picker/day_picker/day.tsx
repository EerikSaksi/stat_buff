import React, {useState, useLayoutEffect, useRef} from 'react';
import {List, Button, Snackbar} from 'react-native-paper';
import {
  useWorkoutPlanDayByIdQuery,
  useDeleteExerciseInPlanMutation,
} from '../../../../generated/graphql';
import WorkoutExerciseSet from './exercise_set';
import WorkoutTimer from './workout_timer';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../workout';
import {ActivityIndicator} from 'react-native-paper';
import useLocalVolumes from './use_local_sets';
import EditExerciseButtons from './edit_day/edit_exercise_buttons';
import {ScrollView} from 'react-native';

export type Bodystat = {isMale: boolean; bodymass: number};
type WorkoutDayRouteProp = RouteProp<RootStackParamList, 'Workout'>;

export type WorkoutDayNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Workout'
>;
type Props = {
  route: WorkoutDayRouteProp;
  navigation: WorkoutDayNavigationProp;
};

const Day: React.FC<Props> = ({route, navigation}) => {
  const [expandedId, setExpandedId] = useState(-1);

  const [lastDeletedWorkoutExerciseId, setLastDeletedWorkoutExerciseId] =
    useState<number>(-1);
  const undoPressed = useRef(false);

  const [deleteExerciseInPlan] = useDeleteExerciseInPlanMutation();
  const {data} = useWorkoutPlanDayByIdQuery({
    variables: {id: route.params.dayId},
    onCompleted: () => {
      if (expandedId === -1) {
        const firstExercise = data?.workoutPlanDay?.workoutPlanExercises[0];
        if (firstExercise) {
          setExpandedId(firstExercise.id);
        }
      }
    },
  });
  const {localSets, updateLocalSet} = useLocalVolumes(data);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        localSets && data?.activeUser ? (
          <WorkoutTimer localExerciseSets={localSets} navigation = {navigation}/>
        ) : undefined,
      title: route.params.name,
    });
  }, [localSets, data]);

  if (!data?.workoutPlanDay || !localSets || !data.activeUser) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <ScrollView stickyHeaderIndices={[1]} invertStickyHeaders={true}>
        <List.AccordionGroup
          expandedId={expandedId}
          onAccordionPress={expandedId => {
            if (typeof expandedId === 'number') {
              setExpandedId(oldExpandedId =>
                oldExpandedId === expandedId ? 0 : expandedId,
              );
            }
          }}>
          {data.workoutPlanDay.workoutPlanExercises.map(workoutPlanExercise =>
            localSets[workoutPlanExercise.id] &&
            lastDeletedWorkoutExerciseId !== workoutPlanExercise.id ? (
              <List.Accordion
                key={workoutPlanExercise.id}
                id={workoutPlanExercise.id}
                title={`${workoutPlanExercise.exercise?.name}: ${workoutPlanExercise.sets} sets of ${workoutPlanExercise.reps} reps`}>
                {localSets[workoutPlanExercise.id].conditionalSets.map(
                  (conditionalSet, setIndex) => (
                    <WorkoutExerciseSet
                      key={`${workoutPlanExercise.id} ${setIndex}`}
                      updateLocalSet={updateLocalSet}
                      setIndex={setIndex}
                      workoutPlanExerciseId={workoutPlanExercise.id}
                      conditionalSet={conditionalSet}
                      exerciseId={workoutPlanExercise.exercise.id}
                      bodystat={data.activeUser!}
                    />
                  ),
                )}
                <EditExerciseButtons
                  workoutPlanExercise={workoutPlanExercise}
                  setLastDeletedWorkoutExerciseId={
                    setLastDeletedWorkoutExerciseId
                  }
                />
              </List.Accordion>
            ) : undefined,
          )}
        </List.AccordionGroup>
        <Button
          icon="table-row-plus-after"
          disabled={lastDeletedWorkoutExerciseId !== -1}
          onPress={() => {
            if (data) {
              navigation.navigate('Select Exercise', {
                workoutPlanDayData: data,
              });
            }
          }}>
          Add exercise
        </Button>
      </ScrollView>
      <Snackbar
        visible={lastDeletedWorkoutExerciseId !== -1}
        action={{
          label: 'Undo',
          onPress: () => (undoPressed.current = true),
        }}
        duration={5000}
        onDismiss={() => {
          if (!undoPressed.current) {
            deleteExerciseInPlan({
              variables: {id: lastDeletedWorkoutExerciseId},
              optimisticResponse: {
                deleteWorkoutPlanExercise: {
                  __typename: "DeleteWorkoutPlanExercisePayload",
                  workoutPlanExercise: {
                    __typename: "WorkoutPlanExercise",
                    id: lastDeletedWorkoutExerciseId,
                  },
                },
              },

              update(cache, {data}) {
                const deletedId = data?.deleteWorkoutPlanExercise?.workoutPlanExercise?.id
                if (deletedId) {
                  cache.evict({
                    id: `WorkoutPlanExercise:${deletedId}`,
                  });
                  undoPressed.current = false;
                  setLastDeletedWorkoutExerciseId(-1);
                }
              },
            });
          } else {
            undoPressed.current = false;
            setLastDeletedWorkoutExerciseId(-1);
          }
        }}>
        Exercise Deleted
      </Snackbar>
    </>
  );
};
export default Day;
