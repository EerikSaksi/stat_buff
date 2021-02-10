import React, { useEffect, Suspense } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import Loading from "./util_components/loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const [refetchUser, { data }] = useLazyQuery(USERNAME, {
    onCompleted: async (data) => {
      if (!data.activeUser) {
        console.log(`await AsyncStorage.setItem("jwt_token", '');`);
        try {
          await AsyncStorage.setItem("jwt_token", "");
        } catch (error) {
          console.log(error);
        }
      }
    },
  });
  useEffect(() => {
    refetchUser();
  }, []);
  if (!data) {
    return null;
  }
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
