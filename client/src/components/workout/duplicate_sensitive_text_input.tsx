import React, {useEffect} from "react";
const DuplicateSensitiveTextInput: React.FC = () => {
  const [duplicateError, setDuplicateError] = useState(false)
  useEffect(() => {
    setDuplicateError(workoutPlanNames.some((name) => newWorkoutPlanName === name));
  }, [newWorkoutPlanName]);
};
export default DuplicateSensitiveTextInput;
