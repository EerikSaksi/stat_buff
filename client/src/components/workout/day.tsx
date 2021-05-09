import React, { useState } from "react";
import { List } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import WorkoutExercise from "./exercise";
const Workout: React.FC = () => {
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
        {data
          ? data.activeUser.userCurrentWorkoutPlan.workoutPlan.workoutPlanDays.nodes[0].workoutExercises.map((wE, id) => (
              <WorkoutExercise
                name={wE.exercise.name}
                sets={wE.sets}
                targetReps={wE.reps}
                accordionId={id + 1}
                exerciseId={wE.exercise.id}
              />
            ))
          : undefined}
      </List.AccordionGroup>
    </SafeAreaView>
  );
};
export default Workout;
