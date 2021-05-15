import React, { useState } from "react";
import { List } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { WorkoutPlanExercisesFragment } from "generated/graphql";
import WorkoutExerciseSet from "./exercise_set";

type Route = {
  params: {
    exercises: WorkoutPlanExercisesFragment;
  };
};
const Day: React.FC<{ route: Route }> = ({ route }) => {
  const [expandedId, setExpandedId] = useState(1);
  console.log(route.params.exercises);
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
        {route.params.exercises.workoutExercises.map((workoutExercise, i) => (
          <List.Accordion
            key = {i}
            id={i + 1}
            title={`${workoutExercise?.exercise?.name}: ${workoutExercise?.sets} sets of ${workoutExercise?.reps} reps`}
          >
            {Array.from({ length: workoutExercise?.sets || 0 }).map((_, i) => (
              <WorkoutExerciseSet key = {i} exerciseId={workoutExercise?.exercise?.id || -1} />
            ))}
          </List.Accordion>
        ))}
      </List.AccordionGroup>
    </SafeAreaView>
  );
};
export default Day;
