import {ApolloProvider} from "@apollo/client";
import React from "react";
import renderer from "react-test-renderer";
import {client} from "./test_apollo_client"
import WorkoutModal from "../components/workout_modal"
it("matches snapshot", () => {
  const tree = renderer.create(<ApolloProvider client = {client}><WorkoutModal username = {"orek"} visible = {true} setVisible = {(arg: boolean) => {arg}} skillTitle = "novice" /></ApolloProvider>).toJSON();
  expect(tree).toMatchSnapshot();
});
