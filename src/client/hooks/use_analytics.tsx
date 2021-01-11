import React, { useEffect } from "react";
import { visibleSection } from "../apollo/cache";
type useAnalyticsProps = {
  User?: boolean;
  Group?: boolean;
  Enemy?: boolean;
  Members?: boolean;
  strengthModalVisible?: boolean;
  bodystatsModalVisible?: boolean;
  workoutModalVisible?: boolean;
  chatModalVisible?: boolean;
};
const useAnalytics: React.FC<useAnalyticsProps> = ({ strengthModalVisible, bodystatsModalVisible, workoutModalVisible, chatModalVisible, User, Enemy, Members }) => {
  useEffect(() => {
    //we shouldnt be tracking the modals as visible if the user is on the group section
    if (User) {
      if (workoutModalVisible) {
        visibleSection("workoutModalVisible");
      } else if (strengthModalVisible) {
        visibleSection("strengthModalVisible");
      } else if (bodystatsModalVisible) {
        visibleSection("bodystatsModalVisible");
      }
      //the user is on the user page without anything open
      else {
        visibleSection("User");
      }
    }
  }, [workoutModalVisible, strengthModalVisible, bodystatsModalVisible, User]);

  //the chat can simulataneously be open while we have Enemy or Members in the background, but the chat takes precedence and is checked first
  useEffect(() => {
    if (chatModalVisible) {
      visibleSection("chatModalVisible");
    }
    else if (Enemy){
      visibleSection("Enemy");
    }
    else if (Members){
      visibleSection("Members");
    }
  }, [chatModalVisible, Enemy, Members]);

  return null;
};
export default useAnalytics;
