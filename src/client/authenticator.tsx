import React, { useState, useEffect, Suspense } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import Loading from "./util_components/loading";
const App = React.lazy(() => import("./App"));
const AppDemo = React.lazy(() => import("./components/app_demo/app_demo"));

const USERNAME = gql`
  query {
    activeUser {
      username
    }
  }
`;

export default function Authenticator() {
  //try fetch the current user if we have a token (if not logged in google first we need to sign in)
  const [refetchUser, { data, client }] = useLazyQuery(USERNAME, {
    fetchPolicy: 'cache-and-network'
  });
  useEffect(() => {
    refetchUser();
  }, []);
  if (!data) {
    return null;
  }
  if (!data.activeUser) {
    client?.writeQuery({
      query: gql`
        query {
          token
        }
      `,
      data: {
        token: null,
      },
    });
    return (
      <Suspense fallback={<Loading />}>
        <AppDemo refetchUser={refetchUser} />
      </Suspense>
    );
  }
  return (
    <Suspense fallback={<Loading />}>
      <App username={data.activeUser.username} />
    </Suspense>
  );
}
