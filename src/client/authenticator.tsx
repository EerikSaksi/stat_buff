import React, { useState, useEffect, Suspense } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import ExerciseModal from "./components/tabs/user/exercise_modal";
const App = React.lazy(() => import("./App"));
const AppDemo = React.lazy(() => import("./components/app_demo/app_demo"));

const USERNAME = gql`
  query {
    username
  }
`;

export default function Authenticator() {
  const [visible, setVisible] = useState(true)
  return(<ExerciseModal username = "orek" visible = {visible} setVisible = {setVisible} refetchParent= {() => {}} />)
}
