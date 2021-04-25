import React, { useEffect, useState } from "react";
const exerciseMetadata = require("./exercise_metadata.json");

const caseInsensitiveContains = (s: string, substring: string) => s.toUpperCase().indexOf(substring) !== -1;

//type BodyPart = "Back" | "Biceps" | "Chest" | "Core" | "Forearms" | "Legs" | "Shoulders" | "Triceps" | "Whole Body";
//type ExerciseType = "Barbell"| "Bodyweight"| "Olympic"| "Dumbbell"| "Machine"| "Cable"|
const useExerciseSearch = (query: string, bodypartFilter: undefined | string[], equipmentFilter: undefined | string[]) => {
  const [matchingExercises, setMatchingExercises] = useState<string[]>([]);
  useEffect(() => {
    const equipmentFunc =
      equipmentFilter !== undefined ? (exercise: any) => equipmentFilter.some((equipment) => equipment === exercise.type) : () => true;
    const bodypartFunc =
      bodypartFilter !== undefined ? (exercise: any) => bodypartFilter.some((bodypart) => bodypart === exercise.bodyPart) : () => true;
    const upperQuery = query.toUpperCase();
    const tempMatchingExercises: any[] = [];
    for (const exercise of exerciseMetadata) {
      if (
        (caseInsensitiveContains(exercise.name, upperQuery) ||
          exercise.exerciseAliases.some((alias) => caseInsensitiveContains(alias, upperQuery))) &&
        bodypartFunc(exercise) &&
        equipmentFunc(exercise)
      ) {
        tempMatchingExercises.push(exercise);
        if (10 <= tempMatchingExercises.length) {
          break;
        }
      }
    }
    setMatchingExercises(tempMatchingExercises);
  }, [query]);
  return { matchingExercises };
};
export default useExerciseSearch;
