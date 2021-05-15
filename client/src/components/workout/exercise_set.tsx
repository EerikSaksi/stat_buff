import React, { useState } from "react";
import { TextInput, List } from "react-native-paper";
import useStrengthPredictions from "./use_strength_predictions";
const WorkoutExerciseSet: React.FC<{exerciseId: number}> = ({exerciseId}) => {
  const [weight, setWeight] = useState<undefined | number>();
  const [reps, setReps] = useState<undefined | number>();
  const predictions = useStrengthPredictions(reps, weight, exerciseId, 80, true)
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
            value={weight?.toString() }
            onChangeText={(v) => {
              const parsed = parseInt(v);
              if (!isNaN(parsed)) {
                setWeight(parsed);
              }
              else{
                setWeight(undefined)
              }
            }}
          />
          <TextInput
            style={{ margin: 3 }}
            placeholder="Reps"
            mode="outlined"
            dense
            keyboardType="numeric"
            value={reps?.toString()}
            onChangeText={(v) => {
              const parsed = parseInt(v);
              if (!isNaN(parsed)) {
                setReps(parsed);
              }
            }}
          />
        </>
      )}
    ></List.Item>
  );
};
export default WorkoutExerciseSet;
