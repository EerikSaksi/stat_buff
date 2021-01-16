import React, { useState, useEffect } from "react";
import { initAsync, getCurrentUserAsync, isSignedInAsync, signInSilentlyAsync } from "expo-google-sign-in";
import { gql, useLazyQuery } from "@apollo/client";
import App from "./App";
import AppDemo from "./components/app_demo/app_demo";

const USERNAME = gql`
  query {
    username
  }
`;

export default function Authenticator() {
  const [googleLoggedIn, setGoogleLoggedIn] = useState(false);

  //try fetch the current user if we have a token (if not logged in google first we need to sign in)
  const [refetchUser, { data }] = useLazyQuery(USERNAME);
  useEffect(() => {
    const tryGetToken = async () => {
      await initAsync();
      if (await isSignedInAsync()) {
        setGoogleLoggedIn(true)
      }
      refetchUser();
    };
    tryGetToken();
  }, []);
  if (!data) {
    return null;
  }
  if (!data.username) {
    return <AppDemo refetchUser={refetchUser} googleLoggedIn = {googleLoggedIn} setGoogleLoggedIn = {setGoogleLoggedIn} />;
  }
  return <App username={data.username} />;
}
