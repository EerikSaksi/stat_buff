import React, { useState } from "react";
import { TextInput, List } from "react-native-paper";
const WorkoutExerciseSet: React.FC = () => {
  const [weight, setWeight] = useState<undefined | number>();
  const [reps, setReps] = useState<undefined | number>();
  const predictions = useStrengthPredictions(reps, weight, )
  return (
    <List.Item
      title={`Set ${i}`}
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
