import React, { useRef, useEffect, useState } from "react";
import {
  Volume,
  useSaveWorkoutMutation,
  CompletedWorkoutExerciseInput,
  useCreateCompletedWorkoutMutation,
} from "../../../../generated/graphql";
import { Button } from "react-native-paper";
import { View } from "react-native";
import { ExerciseSetVolumes } from "./use_local_volumes";

const transformVolumeToPayload = (exerciseSetVolumes: ExerciseSetVolumes, completedWorkoutId: number): CompletedWorkoutExerciseInput[] => {
  const toReturn: CompletedWorkoutExerciseInput[] = [];
  for (const [_, { exerciseId, volumes }] of Object.entries(exerciseSetVolumes)) {
    //filter sets that were not completed, and cast to Volume (where reps and sets must be defined)
    const filteredVolumes = volumes.filter((volume) => volume.weight !== undefined && volume.reps).map((volume) => volume as Volume);
    toReturn.push({ completedWorkoutId, volumes: filteredVolumes, exerciseId });
  }
  return toReturn;
};
const WorkoutTimer: React.FC<{ exerciseSetVolumes: ExerciseSetVolumes }> = ({ exerciseSetVolumes }) => {
  const startTime = useRef<Date | undefined>();
  const [minutes, setMinutes] = useState<undefined | number>();

  //first we create a workout (parent of all exercises)
  //on complete hook then saves each exercise
  const [createWorkout] = useCreateCompletedWorkoutMutation({
    onCompleted: ({ createCompletedWorkout }) => {
      if (createCompletedWorkout?.completedWorkout?.id) {
        saveWorkout({
          variables: { completedExercises: transformVolumeToPayload(exerciseSetVolumes, createCompletedWorkout.completedWorkout.id) },
        });
      }
    },
  });
  const [saveWorkout] = useSaveWorkoutMutation();

  useEffect(() => {
    if (!startTime.current) {
      //user has tracked a lift, then start the timer
      for (const [_, { volumes }] of Object.entries(exerciseSetVolumes)) {
        if (volumes.some((volume) => volume.weight || volume.reps)) {
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
  }, [startTime, exerciseSetVolumes]);

  if (minutes === undefined) {
    return null;
  }
  return (
    <View>
      <Button mode="contained" compact icon="stop-circle" labelStyle={{ fontSize: 14 }} onPress={() => createWorkout()}>
        {minutes} min
      </Button>
    </View>
  );
};
export default WorkoutTimer;
