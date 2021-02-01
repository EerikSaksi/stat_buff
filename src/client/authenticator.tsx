import React, { useState, useEffect, Suspense } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import Loading from "./util_components/loading";
const App = React.lazy(() => import("./App"));
const AppDemo = React.lazy(() => import("./components/app_demo/app_demo"));

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
    refetchUser()
  }, [])
  if (!data) {
    return null;
  }
  if (!data.username) {
    return (
      <Suspense fallback={<Loading />}>
        <AppDemo refetchUser={refetchUser} googleLoggedIn={googleLoggedIn} setGoogleLoggedIn={setGoogleLoggedIn} />
      </Suspense>
    );
  }
  return (
    <Suspense fallback={<Loading />}>
      <App username={data.username} />
    </Suspense>
  );
}
