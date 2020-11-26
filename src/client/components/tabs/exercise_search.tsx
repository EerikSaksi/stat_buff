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


const ExerciseSearch: React.FC<{input: string;}> = ({input}) => {
  //the user will enter search normally, so slugify their input to be compatible with the slugged exercises
  const [sluggedInput, setSluggedInput] = useState("");
  useEffect(() => {
    setSluggedInput(slugify(input));
  }, [input]);

  const {data} = useQuery(EXERCISE_SEARCH, {
    variables: {input: sluggedInput},
    skip: input === ""
  });

  if (!data && input !== "") {
    return (<Loading />);
  }

  //either example search or actual search
  const exercises = input === ""
    ? ["bench-press", "deadlift", "squat", "shoulder-press", "pull-ups"]
    : data.exercises.nodes.map(exercise => exercise.slugName);

  return (
    <ScrollView style = {{ width: '100%' }}>
      {input === ""
        ?
        <Text style={{fontSize: 20, textAlign: 'center'}}>
          Most popular searches
          </Text>
        : undefined}
      <FlatList data={exercises} style={{width: '100%'}}
        renderItem={({item}) => <ExerciseSearchResult exerciseSlug={item} />
        }
      >
      </FlatList>
    </ScrollView>
  );
};
export default ExerciseSearch;

