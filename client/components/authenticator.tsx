import React, { useEffect, Suspense } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import App from "./App";
import AppDemo from "./app_demo";

const USERNAME = gql`
  query {
    activeUser {
      username
    }
  }
`;

export default function Authenticator() {
  //try fetch the current user if we have a token (if not logged in google first we need to sign in)
  const [refetchUser, { data }] = useLazyQuery(USERNAME);
  useEffect(() => {
    refetchUser();
  }, []);
  if (!data) {
    return null;
  }
  if (!data.activeUser) {
    return (
      <Suspense fallback={<ActivityIndicator />}>
        <AppDemo refetchUser={refetchUser} />
      </Suspense>
    );
  }
  return (
    <Suspense fallback={<ActivityIndicator />}>
      <App username={data.activeUser.username} />
    </Suspense>
  );
}
