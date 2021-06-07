import React, { useRef, useEffect, useState } from "react";
import {
  Volume,
  useSaveWorkoutMutation,
  CompletedWorkoutExerciseInput,
  useCreateCompletedWorkoutMutation,
} from "../../../../generated/graphql";
import { Button } from "react-native-paper";
import { View } from "react-native";
import { ExerciseSetVolume } from "./day";

const transformVolumeToPayload = (volumes: ExerciseSetVolume[], completedWorkoutId: number): CompletedWorkoutExerciseInput[] => {
  return volumes
    .map((exerciseSetVolume) => {
      return {
        volumes: exerciseSetVolume.volumes.filter(({ reps, weight }) => reps && weight).map((conditional) => conditional as Volume),
        completedWorkoutId,
        exerciseId: exerciseSetVolume.exerciseId
      }
    })
    .filter(({ volumes }) => volumes.length);
};
const WorkoutTimer: React.FC<{ exerciseSetVolumes: ExerciseSetVolume[]; }> = ({ exerciseSetVolumes }) => {
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
      if (exerciseSetVolumes.some((exerciseSetVolume) => exerciseSetVolume.volumes.some((val) => val.weight || val.reps))) {
        startTime.current = new Date();
        setMinutes(0);
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
    <View style={{ position: "absolute", bottom: 0, flex: 1, justifyContent: "center", alignItems: "flex-end", width: "100%", padding: 8 }}>
      <Button mode="contained" compact icon="stop-circle" labelStyle={{ fontSize: 14 }} onPress={() => createWorkout()}>
        {minutes} min
      </Button>
    </View>
  );
};
export default WorkoutTimer;
