import React, {useEffect, useState} from 'react';
import {useQuery, gql} from '@apollo/client';
import {Text, FlatList, ScrollView} from 'react-native';
import Loading from '../../util_components/loading';
import {slugify} from '../../util_components/slug';
import ExerciseSearchResult from './exercise_search_result';
const EXERCISE_SEARCH = gql`query($input: String!){
  exercises(filter: {slugName: {includesInsensitive: $input}}, orderBy: POPULARITY_RANKING_ASC, first: 8){
    nodes{
      slugName
    }
  }
}`;
const USER_EXERCISE_SEARCH = gql`query($username: String!){
	user(username: $username){
    userExercisesByUsername{
      nodes{
        slugName
      }
    }
  }
}`


const ExerciseSearch: React.FC<{input: string, username: string, onlyShowTracked: boolean}> = ({input, username, onlyShowTracked}) => {
  //the user will enter search normally, so slugify their input to be compatible with the slugged exercises
  const [sluggedInput, setSluggedInput] = useState("");
  useEffect(() => {
    setSluggedInput(slugify(input));
  }, [input]);

  const {data} = useQuery(EXERCISE_SEARCH, {
    variables: {input: sluggedInput},
    skip: input === "" && onlyShowTracked
  });

  const {data: userData} = useQuery(USER_EXERCISE_SEARCH, {
    variables: {username, input: sluggedInput},
    skip: !onlyShowTracked
  });


  //if the user is inputting something and the requested search (user data when we only want tracked exercises or data when we want either) is undefined then loading
  if ((input !== "" && !onlyShowTracked && data) || (onlyShowTracked && !userData)) {
    return (<Loading />)
  }
  console.log(data)

  //either example search or actual search
  const exercises =
    onlyShowTracked
      ? userData.user.userExercisesByUsername.nodes.map(exercise => exercise.slugName)
      : input === ""
        ? ["bench-press", "deadlift", "squat", "shoulder-press", "pull-ups", "dumbbell-bench-press", "barbell-curl", "dumbbell-curl"]
        //map the search that the user wants
        : data.exercises.nodes.map(exercise => exercise.slugName);
  
  //const exercises = ["bench-press"]

  return (
    <ScrollView style={{width: '100%'}}>
      {!onlyShowTracked && input === ""
        ?
        <Text style={{fontSize: 20, textAlign: 'center'}}>
          Most popular searches
          </Text>
        : undefined}
      <FlatList data={exercises} style={{width: '100%'}}
        renderItem={({item}) => <ExerciseSearchResult key={item} exerciseSlug={item} username={username} />
        }
      >
      </FlatList>
    </ScrollView>
  );
};
export default ExerciseSearch;

