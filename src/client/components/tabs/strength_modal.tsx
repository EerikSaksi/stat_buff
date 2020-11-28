import React, {useState} from 'react'
import {Text, Switch, View, Modal, TextInput} from 'react-native'
import ExerciseSearch from "./exercise_search"

const StrengthModal: React.FC<{visible: boolean, setVisible: (b: boolean) => void, username: string}> = ({visible, setVisible, username}) => {
  const [exerciseInput, setExerciseInput] = useState("")
  const [onlyShowTracked, setOnlyShowTracked] = useState(false)
  return (
    <Modal style={{margin: 0}} visible={visible} onDismiss={() => setVisible(false)} onRequestClose={() => setVisible(false)} animationType={'slide'}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{flex: 2, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
          <Text style={{marginRight: '2%'}}>
            Only show exercises you've tracked
            </Text>
          <Switch value={onlyShowTracked} onValueChange={(v) => setOnlyShowTracked(v)} />
        </View>
      </View>
      <View style={{flex: 10, justifyContent: 'center', alignItems: 'center'}}>
        <View>
          <TextInput value={exerciseInput} onChangeText={(t) => setExerciseInput(t)} placeholder="Search for exercises" />
        </View>
        <ExerciseSearch input={exerciseInput} username={username} onlyShowTracked={onlyShowTracked} />
      </View>
    </Modal >
  )
}
export default StrengthModal
