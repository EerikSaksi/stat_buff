import React, { useState, Suspense, useEffect, lazy } from "react";
import { initAsync, GoogleSignInAuthResult, signInAsync, getCurrentUserAsync, isSignedInAsync } from "expo-google-sign-in";
import Loading from "./util_components/loading";
import { gql, useLazyQuery } from "@apollo/client";
const App = lazy(() => import("./App"));
const AppDemo = lazy(() => import("./components/app_demo/app_demo"));

const USERNAME = gql`
  query {
    username
  }
`;


export default function Authenticator() {
  const [googleID, setGoogleID] = useState<string | undefined>();

  //try fetch the current user if we have a token (if not logged in google first we need to sign in)
  const [refetchUser, { data }] = useLazyQuery(USERNAME);

  //when starting try check if user logged in and fetch their token
  useEffect(() => {
    refetchUser();
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
    return null;
  }
  if (!data.username) {
    return (
      <Suspense fallback={<Loading />}>
        <AppDemo refetchUser={refetchUser} googleID={googleID} setGoogleID={setGoogleID} />
      </Suspense>
    );
  }
  return (
    <Suspense fallback={<Loading />}>
      <App username={data.username} />
    </Suspense>
  );
}
