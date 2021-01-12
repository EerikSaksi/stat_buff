import React, { useRef, useEffect } from "react";
import { visibleSection } from "../../apollo/cache";
import { useReactiveVar, useMutation, gql } from "@apollo/client";
import { AppState } from "react-native";
type AppSection = "strengthModalVisible" | "bodystatsModalVisible" | "workoutModalVisible" | "chatModalVisible" | "UserTab" | "MembersTab" | "EnemyTab";

const SEND_ANALYTICS = gql`
  mutation($username: String!, $analytics: [SectionAndTimeSpentInput]!) {
    createSessionAnalytic(input: { sessionAnalytic: { username: $username, analytics: $analytics } }) {
      clientMutationId
    }
  }
`;

export default function useAnalyticsSender(username: string) {
  const vs = useReactiveVar(visibleSection);

  //initially there is no last section
  const lastSectionData = useRef<{ name: AppSection; time: Date } | undefined>();
  const analytics = useRef<{ section: AppSection; timeSpent: number }[]>([]);
  const [sendAnalytics] = useMutation(SEND_ANALYTICS, {
    variables: {analytics: analytics.current, username },
    //after we send the session we reset the analytics to avoid accidentally sending them twice
    onCompleted: () => {
      analytics.current = [];
      lastSectionData.current = undefined;
    },
  });
  useEffect(() => {
    //if the user is about to go inactive, then we send the analytics
    const sendAnalyticsOnExitApp = (nextAppState) => {
      if (nextAppState === "inactive" || nextAppState === "background") {
        //add final used section before we send it off
        if (lastSectionData.current) {
          analytics.current.push({ section: lastSectionData.current.name, timeSpent: (Date.now() - lastSectionData.current.time.getTime()) / 1000 });
        }
        sendAnalytics();
      }
    };
    AppState.addEventListener("change", sendAnalyticsOnExitApp);
    return () => AppState.removeEventListener("change", sendAnalyticsOnExitApp);
  }, []);
  useEffect(() => {
    const now = new Date();
    //the time that we spent on the last section is equal to time elapsed since we first opened it until now
    if (lastSectionData.current) {
      analytics.current.push({ section: lastSectionData.current.name, timeSpent: (now.getTime() - lastSectionData.current.time.getTime()) / 1000 });
    }
    //the last section now becomes the current section, and its use starts now
    lastSectionData.current = { name: vs as AppSection, time: now };
    console.log(analytics)
  }, [vs]);
}
