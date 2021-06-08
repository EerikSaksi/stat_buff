import React from "react";
import {
  useInsertExerciseInPlanMutation,
  WorkoutPlanExerciseFragmentDoc,
  InsertExerciseInPlanMutationOptions,
} from "../../../../../generated/graphql";
const useInsertExerciseInPlanMutationCached = (options: InsertExerciseInPlanMutationOptions, dayId: number) => {
  const [insertLastDeletedExerciseInPlan] = useInsertExerciseInPlanMutation({
    update(cache, { data }) {
      const newExercise = data?.createWorkoutPlanExercise?.workoutPlanExercise;
      if (newExercise) {
        cache.modify({
          //modify the workout plan from which this was opened
          id: `WorkoutPlanDay:${dayId}`,
          fields: {
            workoutPlanExercises(existingWorkoutPlanExercises = { nodes: [] }) {
              //if succesfully created
              const newExerciseFragment = cache.writeFragment({
                data: newExercise,
                fragment: WorkoutPlanExerciseFragmentDoc,
              });
              return { nodes: [...existingWorkoutPlanExercises.nodes, newExerciseFragment]};
            },
          },
        });
      }
    },
    ...options,
  });
  return [insertLastDeletedExerciseInPlan];
};
export default useInsertExerciseInPlanMutationCached;
