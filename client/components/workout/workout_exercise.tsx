import React, { useState } from "react";
import { List, } from "react-native-paper";
import { View } from "react-native";
const WorkoutExercise: React.FC<{ name: string; sets: number; targetReps: number; id: number }> = ({ name, sets, targetReps, id }) => {
  return (
    <List.Accordion id={id} title={`${name}: ${sets} sets of ${targetReps} reps`} >
      {Array.from({ length: sets }).map((_, i) => (
      ))}
    </List.Accordion>
  );
};
export default WorkoutExercise;
