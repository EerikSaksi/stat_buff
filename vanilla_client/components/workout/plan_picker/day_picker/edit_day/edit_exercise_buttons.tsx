import React from "react";
import { View } from "react-native";
import { List } from "react-native-paper";
import {
  useUpdateWorkoutPlanExerciseSetsMutation,
  WorkoutPlanExerciseFragment,
} from "../../../../../generated/graphql";
import { Button } from "react-native-paper";
const EditExerciseButtons: React.FC<{
  workoutPlanExercise: WorkoutPlanExerciseFragment;
  setLastDeletedWorkoutExerciseId: (arg: number) => void;
}> = ({ workoutPlanExercise, setLastDeletedWorkoutExerciseId }) => {
  const [updateUserCurrentWorkoutPlanSets] = useUpdateWorkoutPlanExerciseSetsMutation();
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
        <Button icon="delete-circle" onPress={() => setLastDeletedWorkoutExerciseId(workoutPlanExercise.id)} contentStyle={{ scaleX: 1.5, scaleY: 1.5 }}>
          {""}
        </Button>
      )}
    />
  );
};
export default EditExerciseButtons;
