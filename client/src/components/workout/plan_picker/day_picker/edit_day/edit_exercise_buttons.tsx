import React from "react";
import { View } from "react-native";
import { List } from "react-native-paper";
import {
  useUpdateWorkoutPlanExerciseSetsMutation,
  WorkoutPlanExerciseFragment,
  useDeleteExerciseInPlanMutation,
} from "../../../../../generated/graphql";
import { Button } from "react-native-paper";
const EditExerciseButtons: React.FC<{
  workoutPlanExercise: WorkoutPlanExerciseFragment;
  setLastDeletedItem: (arg: WorkoutPlanExerciseFragment) => void;
}> = ({ workoutPlanExercise, setLastDeletedItem }) => {
  const [updateUserCurrentWorkoutPlanSets] = useUpdateWorkoutPlanExerciseSetsMutation();
  const [deleteExerciseInPlan] = useDeleteExerciseInPlanMutation({
    variables: { id: workoutPlanExercise.id },
    update(cache, { data }) {
      console.log({ data });
      if (!data?.deleteWorkoutPlanExercise || !data.deleteWorkoutPlanExercise.clientMutationId) {
        setLastDeletedItem(workoutPlanExercise)
        console.log("cache evicted");
        cache.evict({ id: cache.identify(workoutPlanExercise) });
      }
    },
  });
  return (
    <List.Item
      title=""
      left={() => (
        <View style={{ flexDirection: "row", width: "55%", justifyContent: "space-evenly" }}>
          <Button
            icon="table-row-plus-after"
            contentStyle={{ scaleX: 1.5, scaleY: 1.5 }}
            onPress={() =>
              updateUserCurrentWorkoutPlanSets({
                variables: { id: workoutPlanExercise.id, sets: workoutPlanExercise.sets + 1 },
                optimisticResponse: {
                  updateWorkoutPlanExercise: {
                    __typename: "UpdateWorkoutPlanExercisePayload",
                    workoutPlanExercise: {
                      __typename: "WorkoutPlanExercise",
                      sets: workoutPlanExercise.sets + 1,
                      id: workoutPlanExercise.id,
                    },
                  },
                },
              })
            }
          >
            {""}
          </Button>
          <Button
            icon="table-row-remove"
            contentStyle={{ scaleX: 1.5, scaleY: 1.5 }}
            onPress={() => {
              if (1 < workoutPlanExercise.sets) {
                updateUserCurrentWorkoutPlanSets({
                  variables: { id: workoutPlanExercise.id, sets: workoutPlanExercise.sets - 1 },
                  optimisticResponse: {
                    updateWorkoutPlanExercise: {
                      __typename: "UpdateWorkoutPlanExercisePayload",
                      workoutPlanExercise: {
                        __typename: "WorkoutPlanExercise",
                        sets: workoutPlanExercise.sets - 1,
                        id: workoutPlanExercise.id,
                      },
                    },
                  },
                });
              }
            }}
          >
            {""}
          </Button>
        </View>
      )}
      right={() => (
        <Button icon="delete-circle" onPress={() => deleteExerciseInPlan()} contentStyle={{ scaleX: 1.5, scaleY: 1.5 }}>
          {""}
        </Button>
      )}
    />
  );
};
export default EditExerciseButtons;
