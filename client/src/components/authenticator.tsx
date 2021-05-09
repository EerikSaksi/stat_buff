import React, { Suspense } from "react";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import App from "./App";
import AppDemo from "./app_demo";

export default function Authenticator() {
  console.log("Ran")
  return (
    <Suspense fallback={<ActivityIndicator />}>
      <App username={"orek"} />
    </Suspense>
  );
}
