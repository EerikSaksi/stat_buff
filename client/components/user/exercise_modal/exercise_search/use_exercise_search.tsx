import React, { useEffect, useState } from "react";
const exerciseMetadata = require("./exercise_metadata.json");
const useExerciseSearch = (query: string) => {
  const [matchingExercises, setMatchingExercises] = useState<string[]>([]);
  useEffect(() => {
    if (query) {
      const upperQuery = query.toUpperCase();
      const tempMatchingExercises: any[] = [];
      for (const exercise of exerciseMetadata) {
        if (exercise.name.toUpperCase().indexOf(upperQuery) !== -1) {
          tempMatchingExercises.push(exercise);
          if (10 <= tempMatchingExercises.length) {
            break;
          }
        }
      }
      setMatchingExercises(tempMatchingExercises);
    }
  }, [query]);
  return { matchingExercises };
};
export default useExerciseSearch;
