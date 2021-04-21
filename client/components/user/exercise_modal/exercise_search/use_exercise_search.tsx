import React, { useEffect, useState } from "react";
const useExerciseSearch = ({ query }) => {
  const [exerciseMetadata, setExerciseMetadata] = useState<undefined | any>();

  const [returnedExercises, setReturnedExercises] = useState([]);
  useEffect(() => {
    import("./exercise_metadata.js").then((unparsed) => {
      setExerciseMetadata(JSON.parse(unparsed));
    });
  });

  useEffect(() => {
    const matchingExercises = [];
    const upperQuery = query.toUpperCase()
    loop1:
    for (const exerciseGroup of exerciseMetadata.exerciseGroups) {
      for (const exercise of exerciseGroup) {
        if (exercise.name.toUpperCase().indexOf(upperQuery)){
          matchingExercises.concat(exercise)
          if (10 < matchingExercises.length){
            break loop1
          }
        }
      }
    }
    setReturnedExercises(matchingExercises)
  }, [exerciseMetadata, query]);
};
export default useExerciseSearch;
