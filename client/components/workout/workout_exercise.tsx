import React, { useState } from "react";
import { List, } from "react-native-paper";
import { View } from "react-native";
import WorkoutExerciseSet from "./workout_exercise_set";
const WorkoutExercise: React.FC<{ name: string; sets: number; targetReps: number; id: number }> = ({ name, sets, targetReps, id }) => {
  return (
    <List.Accordion id={id} title={`${name}: ${sets} sets of ${targetReps} reps`} >
      {Array.from({ length: sets }).map((_, i) => (
        <WorkoutExerciseSet/>
      ))}
    </List.Accordion>
  );
};
export default WorkoutExercise;
