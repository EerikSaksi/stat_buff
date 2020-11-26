import React from 'react'
import {View, TextInput, Text} from 'react-native'
import {unslugify} from '../../util_components/slug'
import {Button} from 'react-native-elements'
const ExerciseSearchResult: React.FC<{exerciseSlug: string}> = ({exerciseSlug}) => {
  return (
    <View key={exerciseSlug} style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: '5%'}}>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1}}>
          <Text>
            {unslugify(exerciseSlug)}
          </Text>
        </View>
        <TextInput style={{flex: 1, textAlign: 'center'}} placeholder={'Weight (kg)'} />
        <TextInput style={{flex: 1, textAlign: 'center'}} placeholder={'Reps'} />
      </View>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 2}}>
          <Button title='Calculate Strength' />
        </View>
      </View>
    </View>
  )
}
export default ExerciseSearchResult

