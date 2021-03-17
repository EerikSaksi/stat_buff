import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Text, FlatList, View } from "react-native";
import Loading from "../../../util_components/loading";
import { slugify } from "../../../util_components/slug";
import ExerciseSearchResult from "./exercise_search_result";

const EXERCISE_SEARCH = gql`
  query($input: String!, $bodyweightFilter: BooleanFilter) {
    exercises(filter: { slugName: { includesInsensitive: $input }, bodyweight:  $bodyweightFilter }, orderBy: POPULARITY_RANKING_ASC, first: 8) {
      nodes {
        slugName
        bodyweight
      }
    }
  }
`;

const USER_EXERCISE_SEARCH = gql`
  query($username: String!) {
    user(username: $username) {
      nodeId
      userExercisesByUsername {
        nodes {
          nodeId
          slugName
        }
      }
    }
  }
`;

const popularExercises = [
  { slugName: "bench-press", bodyweight: false },
  { slugName: "deadlift", bodyweight: false },
  { slugName: "squat", bodyweight: false },
  { slugName: "shoulder-press", bodyweight: false },
  { slugName: "pull-ups", bodyweight: true },
  { slugName: "dumbbell-bench-press", bodyweight: false },
  { slugName: "barbell-curl", bodyweight: false },
  { slugName: "dumbbell-curl", bodyweight: false},
];
const popularBodyweightExercises = [
  { slugName: "pull-ups", bodyweight: true },
  { slugName: "push-ups", bodyweight: true },
  { slugName: "dips", bodyweight: true },
  { slugName: "chin-ups", bodyweight: true },
  { slugName: "dumbbell-lunge", bodyweight: true },
  { slugName: "sit-ups", bodyweight: true },
  { slugName: "muscle-ups", bodyweight: true },
  { slugName: "bodyweight-squat", bodyweight: true },
];
const ExerciseSearch: React.FC<{ input: string; username: string; onlyShowTracked: boolean; refetchParent: () => void; onlyBodyweight: boolean }> = ({
  input,
  username,
  onlyShowTracked,
  refetchParent,
  onlyBodyweight,
}) => {
  //the user will enter search normally, so slugify their input to be compatible with the slugged exercises
  const [sluggedInput, setSluggedInput] = useState("");
  useEffect(() => {
    setSluggedInput(slugify(input));
  }, [input]);

  const { data } = useQuery(EXERCISE_SEARCH, {
    variables: { input: sluggedInput },
    skip: input === "" && onlyShowTracked,
  });

  const { data: userData } = useQuery(USER_EXERCISE_SEARCH, {
    variables: { username, input: sluggedInput, bodyweightFilter: { equalTo: true } },
    skip: !onlyShowTracked,
  });

  //if the user is inputting something and the requested search (user data when we only want tracked exercises or data when we want either) is undefined then loading
  if ((input !== "" && !onlyShowTracked && !data) || (onlyShowTracked && !userData)) {
    return <Loading />;
  }

  //either example search or actual search
  const exercises = onlyShowTracked
    ? userData.user.userExercisesByUsername.nodes
    : input === ""
    ? onlyBodyweight
      ? popularBodyweightExercises
      : popularExercises
    : //map the search that the user wants
      data.exercises.nodes;

  return (
      <FlatList
        data={exercises}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.slugName}
        renderItem={({ item }) => <ExerciseSearchResult exerciseSlug={item.slugName} bodyweight={item.bodyweight} username={username} userExercise = {userData?.user.userExercisesByUsername.nodes.find(userExercise => userExercise.slugName === item.slugName)} />}
      ></FlatList>
  );
};
export default ExerciseSearch;
