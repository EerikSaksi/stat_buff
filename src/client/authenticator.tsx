import React, { useState, Suspense, lazy, useEffect } from "react";
import { initAsync, GoogleSignInAuthResult, signInAsync, getCurrentUserAsync, isSignedInAsync } from "expo-google-sign-in";
import Loading from "./util_components/loading";
import { gql, useLazyQuery } from "@apollo/client";
import { StyleSheet, Text } from "react-native";
//const App = lazy(() => import('./App'))
import App from "./App";
import AppDemo from "./components/app_demo/app_demo";

const USERNAME = gql`
  query {
    username
  }
`;

const styles = StyleSheet.create({});

export default function Authenticator() {
  const [googleID, setGoogleID] = useState<string | undefined>("wowa");

  //try fetch the current user if we have a token (if not logged in google first we need to sign in)
  const [refetchUser, { data }] = useLazyQuery(USERNAME, {
    fetchPolicy: "network-only",
  });

  //when starting try check if user logged in and fetch their token
  useEffect(() => {
    //const tryGetToken = async () => {
    //  await initAsync()
    //  if (await isSignedInAsync()) {
    //    const result = await getCurrent
    //    UserAsync()
    //    setGoogleID(result?.uid)
    //  }
    //}
    //tryGetToken()
  }, []);

  if (!data) {
    return <Loading />;
  }
  if (!googleID || !data.username) {
    return (
      <Suspense fallback={<Loading />}>
        <AppDemo refetchUser={refetchUser} googleID = {googleID} setGoogleID = {setGoogleID} />
      </Suspense>
    );
  }
  return <App username={data.username} />;
}
