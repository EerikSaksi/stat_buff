import React, { useState, Suspense, lazy, useEffect } from "react";
import { initAsync, GoogleSignInAuthResult, signInAsync, getCurrentUserAsync, isSignedInAsync } from "expo-google-sign-in";
import { SocialIcon } from "react-native-elements";
import Loading from "./util_components/loading";
import { gql, useLazyQuery } from "@apollo/client";
import { ImageBackground, StyleSheet } from "react-native";
import { generateShadow } from "react-native-shadow-generator";
//const App = lazy(() => import('./App'))
import App from "./App";
import AppDemo from "./components/app_demo/app_demo";
const CenteredView = lazy(() => import("./util_components/centered_view"));
const CreateUser = lazy(() => import("./components/create_user"));

const USERNAME = gql`
  query {
    username
  }
`;

const styles = StyleSheet.create({});

export default function Authenticator() {
  return <AppDemo />;
  const [googleID, setGoogleID] = useState<string | undefined>("wowa");

  //try fetch the current user if we have a token (if not logged in google first we need to sign in)
  const [fetchUsername, { data }] = useLazyQuery(USERNAME, {
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
        <CreateUser refetchUser={fetchUsername} googleID = {googleID} setGoogleID = {setGoogleID} />
      </Suspense>
    );
  }
  return <App username={data.username} />;
}
