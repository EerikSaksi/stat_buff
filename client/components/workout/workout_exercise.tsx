import React, { useState } from "react";
import { List, TextInput, Subheading } from "react-native-paper";
import { View } from "react-native";
const WorkoutExercise: React.FC<{ name: string; sets: number; targetReps: number; id: number }> = ({ name, sets, targetReps, id }) => {
  const [weight, setWeight] = useState<undefined | number>();
  const [reps, setReps] = useState<undefined | number>();
  return (
    <List.Accordion id={id} title={`${name}: ${sets} sets of ${targetReps} reps`} style={{ borderBottomWidth: 0.5 }}>
      {Array.from({ length: sets }).map((_, i) => (
        <List.Item title={`Set ${i}`} 
          right = {() => 
          (
          <View style={{ flex: 1, height: 20 }}>
            <TextInput
              style={{ flex: 1, margin: "5%", justifyContent: "center" }}
              placeholder="Weight"
              mode="outlined"
              keyboardType="numeric"
              value={weight?.toString()}
              onChangeText={(v) => {
                const parsed = parseInt(v);
                if (!isNaN(parsed)) {
                  setReps(parsed);
                }
              }}
            />
          </View>
          <View style={{ flex: 1, height: 100 }}>
            <TextInput
              style={{ flex: 1, margin: "5%", justifyContent: "center" }}
              placeholder="Weight"
              mode="outlined"
              keyboardType="numeric"
              value={weight?.toString()}
              onChangeText={(v) => {
                const parsed = parseInt(v);
                if (!isNaN(parsed)) {
                  setReps(parsed);
                }
              }}
            />
          </View>
        </List.Item>
      )
            
          }
        >
      ))}
    </List.Accordion>
  );
};
export default WorkoutExercise;
