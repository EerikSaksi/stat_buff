import { ApolloProvider } from "@apollo/client";
import React from "react";
import renderer from "react-test-renderer";
import { client } from "./test_apollo_client";
import ExerciseSearchResult from "../components/tabs/user/exercise_search_result";
it("ExerciseSearchResult", () => {
  const tree = renderer
    .create(
      <ApolloProvider client={client}>
        <ExerciseSearchResult exerciseSlug="bench-press" username="orek" refetchParent={() => {}} bodyweight={false} />
      </ApolloProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
