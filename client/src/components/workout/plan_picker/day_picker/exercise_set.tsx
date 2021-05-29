import React from "react";
import { BodystatFragment } from "../../../../generated/graphql";
import { TextInput, List } from "react-native-paper";
import useStrengthPredictions from "./use_strength_predictions";
import {ConditionalVolume} from './day'
const WorkoutExerciseSet: React.FC<{
  exerciseId: number;
  row: number;
  col: number;
  volume: ConditionalVolume;
  updateVolumes: (row: number, column: number, volume: ConditionalVolume) => void;
  bodystat: BodystatFragment | undefined;
}> = ({ exerciseId, row, col, volume, updateVolumes, bodystat }) => {
  const predictions = useStrengthPredictions(volume.reps, volume.weight, exerciseId, bodystat);
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
            value={volume.weight?.toString()}
            onChangeText={(v) => {
              const parsed = parseInt(v);
              var weight: number | undefined | null;
              if (!isNaN(parsed)) {
                weight = parsed;
              }
              updateVolumes(row, col, { reps: volume.reps, weight });
            }}
          />
          <TextInput
            style={{ margin: 3 }}
            placeholder="Reps"
            mode="outlined"
            dense
            keyboardType="numeric"
            value={volume.reps?.toString()}
            onChangeText={(v) => {
              const parsed = parseInt(v);
              var reps: number | undefined | null;
              if (!isNaN(parsed)) {
                reps = parsed;
              }
              updateVolumes(row, col, { weight: volume.weight, reps });
            }}
          />
        </>
      )}
    ></List.Item>
  );
};
export default React.memo(WorkoutExerciseSet);
