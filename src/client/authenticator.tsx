import React, { useEffect, Suspense } from "react";
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
  const [refetchUser, { data }] = useLazyQuery(USERNAME);
  useEffect(() => {
    refetchUser();
  }, []);
  if (!data) {
    return null;
  }
  console.log({ data });
  if (!data.activeUser) {
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
