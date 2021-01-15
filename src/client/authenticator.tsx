import React, { useState, useEffect, } from "react";
import { initAsync, getCurrentUserAsync, isSignedInAsync } from "expo-google-sign-in";
import { gql, useLazyQuery } from "@apollo/client";
import App from "./App";
import AppDemo from "./components/app_demo/app_demo";

const USERNAME = gql`
  query {
    username
  }
`;

export default function Authenticator() {
  const [googleID, setGoogleID] = useState<string | undefined>();

  //try fetch the current user if we have a token (if not logged in google first we need to sign in)
  const [refetchUser, { data }] = useLazyQuery(USERNAME);
  useEffect(() => {
    refetchUser()
  }, [])
  if (!data) {
    return null;
  }
  if (!data.username) {
    return <AppDemo refetchUser={refetchUser} googleID={googleID} setGoogleID={setGoogleID} />;
  }
  return <App username={data.username} />;
}
