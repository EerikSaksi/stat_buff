import React, { useRef, useEffect, useState } from "react";
import {
  Volume,
  useCreateCompletedWorkoutMutation,
  CompletedWorkoutExerciseInput,
  useCreateCompletedWorkoutExercisesMutation,
} from "../../../../generated/graphql";
import { Button } from "react-native-paper";
import { View, Text } from "react-native";
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
  const [createCompletedWorkout] = useCreateCompletedWorkoutMutation({
    onCompleted: ({ createCompletedWorkout }) => {
      if (createCompletedWorkout?.completedWorkout?.id) {
        createCompletedWorkoutExercises({
          variables: { completedExercises: transformVolumeToPayload(exerciseSetVolumes, createCompletedWorkout.completedWorkout.id) },
        });
      }
    },
  });
  const [createCompletedWorkoutExercises] = useCreateCompletedWorkoutExercisesMutation();

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
    <View style={{ position: "absolute", bottom: 0, flex: 1, justifyContent: "center", padding: 8 }}>
      <Button mode="contained" labelStyle={{ fontSize: 18 }} icon="stop-circle" onPress={() => createCompletedWorkout()}>
        <Text style={{ fontSize: 14 }}>{minutes} min</Text>
      </Button>
    </View>
  );
};
export default WorkoutTimer;
