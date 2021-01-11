import React, { useRef, useEffect } from "react";
import {visibleSection} from "../../apollo/cache";
import {useReactiveVar} from "@apollo/client/react/hooks";
export default function useAnalyticsSender() {
  const vs = useReactiveVar(visibleSection)
  const lastSectionData = useRef({name: "User", time: new Date()})
  const analytics = useRef({
    strengthModalVisible: 0.0,
    bodystatsModalVisible: 0.0,
    workoutModalVisiblefloat: 0.0,
    chatModalVisible: 0.0,
    User: 0.0,
    Members: 0.0,
    Enemy: 0.0,
  });
  useEffect(() => {
    const now = new Date()
    //the time that we spent on the last section is equal to time elapsed since we first opened it until now
    analytics.current[lastSectionData.current.name] += (now.getTime() - lastSectionData.current.time.getTime()) / 1000

    //the last section now becomes the current section, and its use starts now
    lastSectionData.current = {name: vs, time: now}
    console.log(analytics)
  }, [vs])
};
