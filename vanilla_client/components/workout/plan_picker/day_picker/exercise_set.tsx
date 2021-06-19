import React from "react";
import { TextInput, List} from "react-native-paper";
import useStrengthPredictions from "./use_strength_predictions";
import {ConditionalVolume} from './use_local_volumes'
import {Bodystat} from './day'

const WorkoutExerciseSet: React.FC<{
  exerciseId: number;
  setIndex: number;
  workoutPlanExerciseId: number,
  volume: ConditionalVolume;
  updateVolumes: (workoutPlanExerciseId: number, setIndex: number, volume: ConditionalVolume) => void;
  bodystat: Bodystat;
}> = ({ exerciseId, setIndex, workoutPlanExerciseId, volume, updateVolumes, bodystat }) => {
  const predictions = useStrengthPredictions(volume, exerciseId, bodystat);
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
              updateVolumes(workoutPlanExerciseId, setIndex, { reps: volume.reps, weight });
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
              updateVolumes(workoutPlanExerciseId, setIndex, { weight: volume.weight, reps });
            }}
          />
        </>
      )}
    ></List.Item>
  );
};
export default WorkoutExerciseSet;
