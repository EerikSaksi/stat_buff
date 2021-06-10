import { useState, useEffect } from "react";
const useInputValidation = (existingNames: string[], newName: string | undefined, excluded: string | undefined) => {
  const [duplicateError, setDuplicateError] = useState(false);
  useEffect(() => {
    //check if newname clashes with any existing one. if exclude passed, then dont throw error if matches exclude.
    //(if we want to rename an element you should be able to rename it back to itself)
    if (newName !== undefined) setDuplicateError(existingNames.some((name) => newName === name && excluded !== name));
  }, [newName, existingNames]);
  return { duplicateError };
};
export default useInputValidation;
