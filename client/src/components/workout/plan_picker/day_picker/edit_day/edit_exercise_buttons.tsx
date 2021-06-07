import React from "react";
import { View } from "react-native";
import { useUpdateWorkoutPlanExerciseSetsMutation, WorkoutPlanExerciseFragment } from "../../../../../generated/graphql";
import {Button} from "react-native-paper";
const EditExerciseButtons: React.FC<{workoutPlanExercise: WorkoutPlanExerciseFragment}> = ({workoutPlanExercise}) => {
  const [updateUserCurrentWorkoutPlanSets] = useUpdateWorkoutPlanExerciseSetsMutation();
  return(
  <View style={{ flexDirection: "row" }}>
    <Button
      icon="table-row-plus-after"
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
    <Button icon="delete-circle" onPress={() => {}}>
      {""}
    </Button>
  </View>
  )
};
export default EditExerciseButtons;
