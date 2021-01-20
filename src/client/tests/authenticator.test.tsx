import React from "react";
import renderer from "react-test-renderer";
import Authenticator from "../authenticator"
import {ApolloProvider} from "@apollo/client";
import {client} from "./test_apollo_client";
it("matches snapshot", () => {
  const tree = renderer.create(<ApolloProvider client = {client}><Authenticator/></ApolloProvider>).toJSON();
  expect(tree).toMatchSnapshot();
});
