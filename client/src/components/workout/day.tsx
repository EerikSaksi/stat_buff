import React, { useCallback, useState } from "react";
import { List } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Volume, WorkoutPlanExerciseFragment } from "generated/graphql";
import WorkoutExerciseSet from "./exercise_set";

type Route = {
  params: {
    exercises: WorkoutPlanExerciseFragment[];
  };
};
const Day: React.FC<{route: Route}> = ({ route }) => {
  const [expandedId, setExpandedId] = useState(1);
  const [volumes, setVolumes] = useState<Volume[][]>(() =>
    route.params.exercises.map((exercise) => new Array(exercise?.sets).fill({ weight: undefined, reps: undefined }))
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
        {route.params.exercises.map((workoutExercise, row) => (
          <List.Accordion
            key={row}
            id={row + 1}
            title={`${workoutExercise?.exercise?.name}: ${workoutExercise?.sets} sets of ${workoutExercise?.reps} reps`}
          >
            {Array.from({ length: workoutExercise?.sets || 0 }).map((_, col) => (
              <WorkoutExerciseSet
                key = {`${row} ${col}`}
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
