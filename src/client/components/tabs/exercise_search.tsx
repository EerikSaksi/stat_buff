import React, {useState} from 'react'
import {useQuery, gql} from '@apollo/client'
import {View, Text} from 'react-native'
import Loading from '../../util_components/loading'
import {ListItem} from 'react-native-elements'
import unslugify from '../../util_components/unslugify'
const EXERCISE_SEARCH = gql`query($input: String!){
  exercises(filter: {slugName: {includesInsensitive: $input}}, orderBy: POPULARITY_RANKING_ASC, first: 5){
    nodes{
      slugName
    }
  }
}`

const ExerciseSearch: React.FC<{input: string}> = ({input}) => {
  const {data, loading} = useQuery(EXERCISE_SEARCH, {
    variables: {input},
    skip: input === ""
  })

  if (loading) {
    return <Loading />
  }
  else if (input === "") {
    return (
      <View>
        {
          ["Bench Press", "Deadlift", "Squat", "Shoulder Press", "Pull Ups",].map(exercise => {
            <ListItem title={exercise} />
          })
        }
      </View>
    )
  }
  else if (!data.exercises.nodes.length) {
    return (<Text> No exercises found </Text>)
  }
  return (
    <View>
      {
        data.exercises.nodes.map(exercise => {
          <ListItem style = {{ flex: 1 }} title={unslugify(exercise.slugName)} />
        })
      }
    </View>
  )
}
export default ExerciseSearch
