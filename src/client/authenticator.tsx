import React, { useState, useEffect, Suspense } from "react";
import { initAsync, isSignedInAsync, signInSilentlyAsync, } from "expo-google-sign-in";
import { gql, useLazyQuery } from "@apollo/client";
import Loading from "./util_components/loading";
const App = React.lazy(() => import("./App"));
const AppDemo = React.lazy(() => import("./components/app_demo/app_demo"));

const USERNAME = gql`
  query {
    activeUser{
      username
    }
  }
`;

export default function Authenticator() {
  //try fetch the current user if we have a token (if not logged in google first we need to sign in)
  const [refetchUser, { data}] = useLazyQuery(USERNAME);
  useEffect(() => {
    const tryGetToken = async () => {
      await initAsync();
      await signInSilentlyAsync();
      if (await isSignedInAsync()) {
        setGoogleLoggedIn(true);
      }
      refetchUser();
    };
    tryGetToken();
    //reauthenticate the user every 50 minutes or so (tokens expire every hour)
  }, []);
  if (!data) {
    return null;
  }
  if (!data.activeUser) {
    return (
      <Suspense fallback={<Loading />}>
        <AppDemo refetchUser={refetchUser}/>
      </Suspense>
    );
  }
  return (
    <Suspense fallback={<Loading />}>
      <App username={data.activeUser.username} />
    </Suspense>
  );
}
