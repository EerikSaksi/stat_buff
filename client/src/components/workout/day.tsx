import React, { useState } from "react";
import { List } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {WorkoutPlanExercisesFragment} from "generated/graphql";
import WorkoutExerciseSet from "./exercise_set";

type Route = {
  params: {
    exercises: WorkoutPlanExercisesFragment
  };
};
const Day: React.FC<Route> = ({params}) => {
  const [expandedId, setExpandedId] = useState(1);
  return (
    <SafeAreaView>
      <List.AccordionGroup
        expandedId={expandedId}
        onAccordionPress={(expandedId) => {
          if (typeof expandedId === "number") {
            setExpandedId((oldExpandedId) => (oldExpandedId === expandedId ? 0 : expandedId));
          }
        }}
      >
        {params.exercises.workoutExercises.map((workoutExercise, i) => {
            workoutExercise?.exercise?.id
            ?
            <List.Accordion id={i} title={`${workoutExercise.exercise.name}: ${workoutExercise.sets} sets of ${workoutExercise.reps} reps`} >
              {Array.from({ length:  workoutExercise.sets}).map((_, i) => (
                <WorkoutExerciseSet exerciseId = {workoutExercise.exercise.id}/>
              ))}
            </List.Accordion>
            : undefined
      </List.AccordionGroup>
    </SafeAreaView>
  );
};
export default Day;
