import React, { Suspense } from "react";
import { ActivityIndicator } from "react-native-paper";
import App from "./App";

export default function Authenticator() {
  return (
    <Suspense fallback={<ActivityIndicator />}>
      <App username={"orek"} />
    </Suspense>
  );
}
