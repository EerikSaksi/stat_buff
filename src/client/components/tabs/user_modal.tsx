import React, {useState} from 'react'
import {Text, TextInput, Switch, View, StyleSheet, Modal} from 'react-native'
import TopView from '../../util_components/top_view'
import {Button, Input, Overlay} from 'react-native-elements'
const styles = StyleSheet.create({
  modal: {
    opacity: 0,
    margin: 100, // This is the important style you need to set
    alignItems: undefined,
    justifyContent: undefined,
  }
})
const UserModal: React.FC<{updateBodyStats: (vars: {}) => void, visible: boolean, setVisible: (b: boolean) => void, username: string}> = ({updateBodyStats, visible, setVisible, username}) => {
  const [weight, setWeight] = useState<number | undefined>(undefined)
  const [isMale, setIsMale] = useState(true)
  return (
    <Modal style={{margin: 0}} visible={visible} onDismiss={() => setVisible(false)} onRequestClose={() => setVisible(false)} animationType={'slide'}>
      <React.Fragment>
        <Text style={{textAlign: 'center', fontSize: 20}} >
          Update body stats
          </Text>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-evenly'}}>
          <TextInput placeholder='Weight (kg)' onChangeText={(text) => setWeight(parseInt(text))} keyboardType={'numeric'}>
          </TextInput>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>Male</Text>
            <Switch value={!isMale} thumbColor={'white'} trackColor={{false: 'blue', true: 'pink'}} onValueChange={(value) => setIsMale(!value)}></Switch>
            <Text>Female</Text>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center'}}>
          <Button title="Submit changes" raised={true} onPress={() => updateBodyStats({variables: {weight, isMale, username}})} />
        </View>
        <View style={{flex: 10, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center'}}>
          <Input >
          </Input>
        </View>
      </React.Fragment>
    </Modal >
  )
}
export default UserModal

