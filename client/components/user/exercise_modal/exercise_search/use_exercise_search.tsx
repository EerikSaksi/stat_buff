import React, { useEffect, useState } from "react";
const exerciseMetadata = require("./exercise_metadata.json");
const useExerciseSearch = (query: string) => {
  const [matchingExercises, setMatchingExercises] = useState<string[]>([]);
  useEffect(() => {
    if (query) {
      const upperQuery = query.toUpperCase();
      setMatchingExercises(exerciseMetadata.filter((exercise) => exercise.name.toUpperCase().indexOf(upperQuery) !== -1));
    }
  }, [query]);
  return {matchingExercises};
};
export default useExerciseSearch;
