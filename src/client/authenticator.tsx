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
  return(<ExerciseModal username = "orek" visible = {true} setVisible = {(arg: boolean) => {}} refetchParent= {() => {}} />)
}
