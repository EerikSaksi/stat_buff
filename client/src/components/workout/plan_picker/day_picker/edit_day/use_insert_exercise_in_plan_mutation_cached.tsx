import React from "react";
import {
  useInsertExerciseInPlanMutation,
  WorkoutPlanExerciseFragmentDoc,
  InsertExerciseInPlanMutationOptions,
} from "../../../../../generated/graphql";
const useInsertExerciseInPlanMutationCached = (options: InsertExerciseInPlanMutationOptions) => {
  const [insertLastDeletedExerciseInPlan] = useInsertExerciseInPlanMutation({
    update(cache, { data }) {
      const newExercise = data?.createWorkoutPlanExercise?.workoutPlanExercise;
      if (newExercise) {
        cache.modify({
          //modify the workout plan from which this was opened
          id: `WorkoutPlanDay:${newExercise.id}`,
          fields: {
            workoutPlanExercises(existingWorkoutPlanExercises = { nodes: [] }) {
              //if succesfully created
              if (data?.createWorkoutPlanExercise?.workoutPlanExercise) {
                const newWorkoutPlanExercise = cache.writeFragment({
                  data: data.createWorkoutPlanExercise.workoutPlanExercise,
                  fragment: WorkoutPlanExerciseFragmentDoc,
                });
                //insert into plan, and then resort by ordering
                const nodes = [...existingWorkoutPlanExercises.nodes, newWorkoutPlanExercise].sort((a, b) => a.ordering - b.ordering);
                return { nodes };
              }
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
