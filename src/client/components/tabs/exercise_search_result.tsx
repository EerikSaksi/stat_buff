import React, {useState} from 'react'
import {View, TextInput, Text} from 'react-native'
import {unslugify} from '../../util_components/slug'
import {Button} from 'react-native-elements'
import {gql, useLazyQuery, useMutation, useQuery} from '@apollo/client'

const CALCULATE_STRENGTH = gql`query($liftmass: Float!, $exerciseSlug: String!, $repetitions: Int!){
  calculateStrength(liftmass: $liftmass, exercise: $exerciseSlug, repetitions: $repetitions)
}`


const USER_EXERCISE = gql`query($exerciseSlug: String!, $username: String!){
  userExercise(slugName: $exerciseSlug, username: $username){
    repetitions
    liftmass
    strongerpercentage
  }
}`

const CREATE_USER_EXERCISE = gql`mutation($exerciseSlug: String!, $username: String!, $repetitions: Int!, $percentage: Int!, $liftmass: Float!) {
  createUserExercise(input:{userExercise:{slugName: $exerciseSlug, username: $username, repetitions: $repetitions strongerpercentage: $percentage liftmass: $liftmass}}){
    clientMutationId
  }
}
`

const UPDATE_USER_EXERCISE = gql`mutation($exerciseSlug: String!, $username: String!, $repetitions: Int!, $percentage: Int!, $liftmass: Float!) {
  updateUserExercise(input:{slugName: $exerciseSlug, username: $username, patch: { repetitions: $repetitions strongerpercentage: $percentage liftmass: $liftmass}}){
    clientMutationId
  }
}
`
const ExerciseSearchResult: React.FC<{exerciseSlug: string, username: string}> = ({exerciseSlug, username}) => {
  const [liftmass, setLiftmass] = useState<undefined | string>(undefined)
  const [repetitions, setRepetitions] = useState<undefined | number>(undefined)
  const [percentage, setPercentage] = useState<undefined | number>(undefined)
  const [fetchCalculateStrength, {data, loading}] = useLazyQuery(CALCULATE_STRENGTH, {
    variables: {liftmass: parseFloat(liftmass!), exerciseSlug, repetitions},
    onCompleted: (data) => setPercentage(data.calculateStrength)
  })

  const {data: savedData, refetch} = useQuery(USER_EXERCISE, {
    variables: {username, exerciseSlug},
    onCompleted: (data) => {
      //user has tracked this exercise
      if (data.userExercise && data.userExercise.repetitions) {
        setRepetitions(data.userExercise.repetitions)
        setLiftmass(data.userExercise.liftmass.toString())
        setPercentage(data.userExercise.strongerpercentage)
      }
    }
  })

  //provide mutations for updating and updating lift stats. These are offered based on whether data exists in the database, and both trigger a refetch to keep the data updated
  const [createUserExercise] = useMutation(CREATE_USER_EXERCISE, {
    variables: {exerciseSlug, username, repetitions, percentage, liftmass: parseFloat(liftmass!)},
    onCompleted: () => refetch()
  })
  const [updateUserExercise] = useMutation(UPDATE_USER_EXERCISE, {
    variables: {exerciseSlug, username, repetitions, percentage, liftmass: parseFloat(liftmass!)},
    onCompleted: () => refetch()
  })

  var button;
  //user has data in the database for this exercise. Autofill input and allow user to edit and update their stats
  if (savedData && savedData.userExercise && savedData.userExercise.repetitions) {
    const {strongerpercentage} = savedData.userExercise
    button = <Button title={`Stronger than ${strongerpercentage}%. Tap to recalculate.`} onPress={() => updateUserExercise()} />
  }

  else if (data) {
    button = <Button title={`Stronger than ${percentage}%. Tap to save.`} onPress={() => createUserExercise()} />
  }
  else {
    button = <Button title={loading ? "Loading..." : "Calculate Relative Strength"} disabled={!liftmass || !repetitions} onPress={() => fetchCalculateStrength()} />
  }


  return (
    <View key={exerciseSlug} style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: '5%'}}>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1}}>
          <Text>
            {unslugify(exerciseSlug)}
          </Text>
        </View>
        <TextInput onChangeText={(t) => setLiftmass(t)} keyboardType='numeric' value={liftmass } style={{flex: 1, textAlign: 'center'}} placeholder={'Weight (kg)'} />
        <TextInput onChangeText={(t) => setRepetitions(parseInt(t))} keyboardType='numeric' value={repetitions ? repetitions.toString() : undefined} style={{flex: 1, textAlign: 'center'}} placeholder={'Reps'} />
      </View>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 2}}>
          {button}
        </View>
      </View>
    </View>
  )
}
export default ExerciseSearchResult
