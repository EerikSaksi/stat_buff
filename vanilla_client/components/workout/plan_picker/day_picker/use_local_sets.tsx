import React, { useState, useCallback, useEffect } from "react";
import { WorkoutPlanDayByIdQuery } from "../../../../generated/graphql";
export type ConditionalSet = {
  weight: number | undefined | null;
  reps: number | undefined | null;
};
export type LocalExerciseSets = {
  [workoutPlanExerciseId: number]: {
    exerciseId: number;
    conditionalSets: ConditionalSet[];
  };
};
const useLocalSets = (workoutPlanDayData: WorkoutPlanDayByIdQuery | undefined) => {
  //local sets stores the sets and reps for various exercises
  const [localSets, setLocalSets] = useState<LocalExerciseSets | undefined>();

  const updateLocalSet = useCallback((workoutPlanExerciseId: number, setIndex: number, conditionalSets: ConditionalSet) => {
    setLocalSets((old) => {
      if (old) {
        const copy = { ...old };
        copy[workoutPlanExerciseId].conditionalSets[setIndex] = conditionalSets;
        return copy;
      }
    });
  }, []);

  useEffect(() => {
    if (workoutPlanDayData?.workoutPlanDay) {
      //either copy or initialize
      const newLocalSets: LocalExerciseSets = localSets ? { ...localSets } : {};
      workoutPlanDayData?.workoutPlanDay.workoutPlanExercises.forEach((workoutPlanExercise) => {
        //not even rendering the exercise
        if (!newLocalSets[workoutPlanExercise.id]) {
          //initialize with empty sets and reps
          newLocalSets[workoutPlanExercise.id] = {
            exerciseId: workoutPlanExercise.exercise!.id,
            conditionalSets: new Array(workoutPlanExercise.sets).fill({ weight: undefined, reps: undefined }),
          };
        }
        //rendering fewer sets than the server has
        else if (newLocalSets[workoutPlanExercise.id].conditionalSets.length < workoutPlanExercise.sets) {
          do {
            newLocalSets[workoutPlanExercise.id].conditionalSets.push({ weight: undefined, reps: undefined });
          } while (newLocalSets[workoutPlanExercise.id].conditionalSets.length < workoutPlanExercise.sets);
        }
        //rendering more sets than the server has
        else if (newLocalSets[workoutPlanExercise.id].conditionalSets.length > workoutPlanExercise.sets) {
          newLocalSets[workoutPlanExercise.id].conditionalSets.splice(workoutPlanExercise.sets);
        }
      });
      setLocalSets(newLocalSets);
    }
  }, [workoutPlanDayData]);
  return { localSets, updateLocalSet };
};
export default useLocalSets;
