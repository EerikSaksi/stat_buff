import React, {useState} from 'react'
import {View, TextInput, Text} from 'react-native'
import {unslugify} from '../../util_components/slug'
import {Button} from 'react-native-elements'
import {gql, useLazyQuery} from '@apollo/client'

const CALCULATE_STRENGTH = gql`query($liftmass: Int!, $exerciseSlug: String!, $repetitions: Int!){
  calculateStrength(liftmass: $liftmass, exercise: $exerciseSlug, repetitions: $repetitions)
}`

const CALCULATE_STRENGTH = gql`query($liftmass: Int!, $exerciseSlug: String!, $repetitions: Int!){
  calculateStrength(liftmass: $liftmass, exercise: $exerciseSlug, repetitions: $repetitions)
}`
const ExerciseSearchResult: React.FC<{exerciseSlug: string}> = ({exerciseSlug}) => {
  const [liftmass, setLiftmass] = useState<undefined | number>(undefined)
  const [repetitions, setRepetitions] = useState<undefined | number>(undefined)
  const [fetchCalculateStrength, {data, loading}] = useLazyQuery(CALCULATE_STRENGTH, {
    variables: {liftmass, exerciseSlug, repetitions},
  })
  const button =
    data
      ?
      <Button title = {`Stronger than ${data.calculateStrength}%. Tap to save.`}/>
      :
      <Button title = {loading ? "Loading...": "Calculate Relative Strength" } disabled={!liftmass || !repetitions} onPress={() => fetchCalculateStrength()} />
  return (
    <View key={exerciseSlug} style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: '5%'}}>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1}}>
          <Text>
            {unslugify(exerciseSlug)}
          </Text>
        </View>
        <TextInput onChangeText={(t) => setLiftmass(parseInt(t))} keyboardType='numeric' value={liftmass ? liftmass.toString() : undefined} style={{flex: 1, textAlign: 'center'}} placeholder={'Weight (kg)'} />
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

