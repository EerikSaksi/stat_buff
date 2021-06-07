import React, { useState, useCallback, useEffect } from "react";
import { WorkoutPlanDayByIdQuery } from "../../../../generated/graphql";
export type ConditionalVolume = {
  weight: number | undefined | null;
  reps: number | undefined | null;
};
export type ExerciseSetVolumes = {
  [workoutPlanExerciseId: number]: {
    exerciseId: number;
    volumes: ConditionalVolume[];
  };
};
const useLocalVolumes = (workoutPlanDayData: WorkoutPlanDayByIdQuery | undefined) => {
  //volumes stores the sets and reps for various exercises. For instance
  const [exerciseSetVolumes, setExerciseSetVolumes] = useState<ExerciseSetVolumes | undefined>();

  const updateVolumes = useCallback((workoutPlanExerciseId: number, setIndex: number, volume: ConditionalVolume) => {
    setExerciseSetVolumes((old) => {
      if (old) {
        const copy = { ...old };
        copy[workoutPlanExerciseId][setIndex] = volume;
        return copy;
      }
    });
  }, []);

  useEffect(() => {
    if (workoutPlanDayData?.workoutPlanDay) {
      //either copy or initialize
      const newExerciseSetVolumes: ExerciseSetVolumes = exerciseSetVolumes ? { ...exerciseSetVolumes } : {};
      workoutPlanDayData?.workoutPlanDay.workoutPlanExercises.nodes.forEach((workoutPlanExercise) => {
        if (!newExerciseSetVolumes[workoutPlanExercise.id]) {
          //initialize with empty sets and reps
          newExerciseSetVolumes[workoutPlanExercise.id] = {
            exerciseId: workoutPlanExercise.exercise!.id,
            volumes: new Array(workoutPlanExercise.sets).fill({ weight: undefined, reps: undefined }),
          };
        }
        //rendering fewer sets than the server has
        else if (newExerciseSetVolumes[workoutPlanExercise.id].volumes.length < workoutPlanExercise.sets) {
          do {
            newExerciseSetVolumes[workoutPlanExercise.id].volumes.push({ weight: undefined, reps: undefined });
          } while (newExerciseSetVolumes[workoutPlanExercise.id].volumes.length < workoutPlanExercise.sets);
        }
        //rendering more sets than the server has
        else if (newExerciseSetVolumes[workoutPlanExercise.id].volumes.length > workoutPlanExercise.sets) {
          newExerciseSetVolumes[workoutPlanExercise.id].volumes.splice(workoutPlanExercise.sets);
        }
      });
      setExerciseSetVolumes(newExerciseSetVolumes);
    }
  }, [workoutPlanDayData]);
  return { exerciseSetVolumes, updateVolumes };
};
export default useLocalVolumes;
