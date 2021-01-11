import React, { useEffect } from "react";
import { visibleSection } from "../../apollo/cache";
const useUserAnalytics: React.FC<{ workoutModalVisible: boolean; strengthModalVisible: boolean; bodystatsModalVisible: boolean }> = ({
  workoutModalVisible,
  strengthModalVisible,
  bodystatsModalVisible,
}) => {
  useEffect(() => {
    if (workoutModalVisible) {
      visibleSection("workoutModalVisible");
    } else if (strengthModalVisible) {
      visibleSection("strengthModalVisible");
    } else if (bodystatsModalVisible) {
      visibleSection("bodystatsModalVisible");
    } else {
      visibleSection("User");
    }
  }, [workoutModalVisible, strengthModalVisible, bodystatsModalVisible]);
  return null;
};
export default useUserAnalytics;
