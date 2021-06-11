import React, { useRef, useEffect } from "react";
import { visibleSection } from "../../apollo/cache";
import { useReactiveVar, useMutation, gql } from "@apollo/client";
import { AppState } from "react-native";
type AppSection = "strengthModalVisible" | "bodystatsModalVisible" | "workoutModalVisible" | "chatModalVisible" | "UserTab" | "MembersTab" | "EnemyTab";



export default function useAnalyticsSender(username: string) {
}
