import React, { useState } from "react";
import { List, } from "react-native-paper";
import { View } from "react-native";
import WorkoutExerciseSet from "./exercise_set";
const WorkoutExercise: React.FC<{ name: string; sets: number; targetReps: number; accordionId: number, exerciseId: number }> = ({ name, sets, targetReps, accordionId, exerciseId}) => {
  return (
    <List.Accordion id={accordionId} title={`${name}: ${sets} sets of ${targetReps} reps`} >
      {Array.from({ length: sets }).map((_, i) => (
        <WorkoutExerciseSet exerciseId = {exerciseId}/>
      ))}
    </List.Accordion>
  );
};
export default WorkoutExercise; 
