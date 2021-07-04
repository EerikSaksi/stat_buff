import React from "react";
import { TextInput, List} from "react-native-paper";
import useStrengthPredictions from "./use_strength_predictions";
import {ConditionalSet} from './use_local_sets'
import {Bodystat} from './day'

const WorkoutExerciseSet: React.FC<{
  exerciseId: number;
  setIndex: number;
  workoutPlanExerciseId: number,
  conditionalSet: ConditionalSet;
  updateLocalSet: (workoutPlanExerciseId: number, setIndex: number, conditionalSet: ConditionalSet) => void;
  bodystat: Bodystat;
}> = ({ exerciseId, setIndex, workoutPlanExerciseId, conditionalSet, updateLocalSet, bodystat }) => {
  const predictions = useStrengthPredictions(conditionalSet, exerciseId, bodystat);
  return (
    <List.Item
      title={predictions ? `${predictions.percentile}%, 1RM: ${predictions.oneRepMax}` : ""}
      left={() => (
        <>
          <TextInput
            style={{ margin: 3 }}
            placeholder="Weight (kg)"
            mode="outlined"
            dense
            keyboardType="numeric"
            value={conditionalSet.weight?.toString()}
            onChangeText={(v) => {
              const parsed = parseInt(v);
              var weight: number | undefined | null;
              if (!isNaN(parsed)) {
                weight = parsed;
              }
              updateLocalSet(workoutPlanExerciseId, setIndex, { reps: conditionalSet.reps, weight });
            }}
          />
          <TextInput
            style={{ margin: 3 }}
            placeholder="Reps"
            mode="outlined"
            dense
            keyboardType="numeric"
            value={conditionalSet.reps?.toString()}
            onChangeText={(v) => {
              const parsed = parseInt(v);
              var reps: number | undefined | null;
              if (!isNaN(parsed)) {
                reps = parsed;
              }
              updateLocalSet(workoutPlanExerciseId, setIndex, { weight: conditionalSet.weight, reps });
            }}
          />
        </>
      )}
    ></List.Item>
  );
};
export default WorkoutExerciseSet;
