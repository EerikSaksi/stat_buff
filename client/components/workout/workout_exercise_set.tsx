import React, { useState } from "react";
import { TextInput, List } from "react-native-paper";
import useStrengthPredictions from "./use_strength_predictions";
const WorkoutExerciseSet: React.FC = () => {
  const [weight, setWeight] = useState<undefined | number>();
  const [reps, setReps] = useState<undefined | number>();
  const predictions = useStrengthPredictions(reps, weight, 0, 80, true)
  console.log({predictions})
  return (
    <List.Item
      title={``}
      left={() => (
        <>
          <TextInput
            style={{ margin: 3 }}
            placeholder="Weight (kg)"
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
          <TextInput
            style={{ margin: 3 }}
            placeholder="Weight"
            mode="outlined"
            dense
            keyboardType="numeric"
            value={weight?.toString()}
            onChangeText={(v) => {
              const parsed = parseInt(v);
              if (!isNaN(parsed)) {
                setWeight(parsed);
              }
            }}
          />
        </>
      )}
    ></List.Item>
  );
};
export default WorkoutExerciseSet;
