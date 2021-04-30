import React, { useState } from "react";
import { List, TextInput, Subheading } from "react-native-paper";
import { View } from "react-native";
const WorkoutExercise: React.FC<{ name: string; sets: number; targetReps: number; id: number }> = ({ name, sets, targetReps, id }) => {
  const [weight, setWeight] = useState<undefined | number>();
  const [reps, setReps] = useState<undefined | number>();
  return (
    <List.Accordion id={id} title={`${name}: ${sets} sets of ${targetReps} reps`} >
      {Array.from({ length: sets }).map((_, i) => (
        <List.Item
          title={`Set ${i}`}
          left={() => (
            <>
                <TextInput
                  style={{ margin: 3,  }}
                  placeholder="Weight (kg)"
                  mode="outlined"
                  dense 
                  keyboardType="numeric"
                  value={weight?.toString()}
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
                      setReps(parsed);
                    }
                  }}
                />
            </>
          )}
        ></List.Item>
      ))}
    </List.Accordion>
  );
};
export default WorkoutExercise;
