import React, { useCallback, useState } from "react";
import { List } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { WorkoutPlanExercisesFragment, Volume } from "generated/graphql";
import WorkoutExerciseSet from "./exercise_set";

type Route = {
  params: {
    exercises: WorkoutPlanExercisesFragment;
  };
};
const Day: React.FC<Route> = ({ params }) => {
  const [expandedId, setExpandedId] = useState(1);
  const [volumes, setVolumes] = useState<Volume[][]>(() =>
    params.exercises.workoutExercises.map((exercise) => new Array(exercise?.sets).fill({ weight: undefined, reps: undefined }))
  );
  const updateVolumes = useCallback((row: number, column: number, volume: Volume) => {
    setVolumes(old => {
      const copy = [...old]
      copy[row][column] = volume
      return copy
    })
  }, []) 
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
        {params.exercises.workoutExercises.map((workoutExercise, row) => (
          <List.Accordion
            key={row}
            id={row + 1}
            title={`${workoutExercise?.exercise?.name}: ${workoutExercise?.sets} sets of ${workoutExercise?.reps} reps`}
          >
            {Array.from({ length: workoutExercise?.sets || 0 }).map((_, col) => (
              <WorkoutExerciseSet
                row = {row}
                col = {col}
                exerciseId={workoutExercise?.exercise?.id || -1}
                updateVolumes = {updateVolumes}
                volume = {volumes[row][col]}
              />
            ))}
          </List.Accordion>
        ))}
      </List.AccordionGroup>
    </SafeAreaView>
  );
};
export default Day;
