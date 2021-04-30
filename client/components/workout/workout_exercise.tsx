import React, { useState } from "react";
import { List, TextInput, Subheading } from "react-native-paper";
import { View } from "react-native";
const WorkoutExercise: React.FC<{ name: string; sets: number; targetReps: number; id: number }> = ({ name, sets, targetReps, id }) => {
  const [weight, setWeight] = useState<undefined | number>();
  const [reps, setReps] = useState<undefined | number>();
  return (
    <List.Accordion id={id} title={`${name}: ${sets} sets of ${targetReps} reps`}>
      <View style={{ flex: 0 }}>
        {Array.from({ length: sets }).map((_, i) => (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              height: 100,
              justifyContent: "center",
              alignItems: "center",
              margin: "2%",
              marginBottom: "10%",
            }}
            key={i}
          >
            <View style={{ flex: 1, margin: "5%", height: 50, justifyContent: "center" }}>
              <Subheading>Set {i}</Subheading>
            </View>
            <View style={{ flex: 2, margin: "5%", height: 50, justifyContent: "center" }}>
              <TextInput
                placeholder="Weight"
                dense={true}
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
            <View style={{ flex: 2, margin: "5%", height: 50, justifyContent: "center" }}>
              <TextInput placeholder="Reps" dense={true} mode="outlined" keyboardType="numeric" />
            </View>
          </View>
        ))}
      </View>
    </List.Accordion>
  );
};
export default WorkoutExercise;
