import React, {useState} from 'react'
import {Text, TextInput, Switch, View, StyleSheet, Modal} from 'react-native'
import TopView from '../../util_components/top_view'
import {Button, Input, Overlay} from 'react-native-elements'
import {useMutation, useQuery} from '@apollo/client/react'
import {gql} from '@apollo/client'
const styles = StyleSheet.create({
  modal: {
    opacity: 0,
    margin: 100, // This is the important style you need to set
    alignItems: undefined,
    justifyContent: undefined,
  }
})

const CREATE_BODY_STAT = gql`mutation ($username: String!, $ismale: Boolean!, $bodymass: Int!){
  createBodyStat(input: {bodyStat: {username: $username, ismale: $ismale, bodymass: $bodymass}}){
    clientMutationId
  }
}`

const UPDATE_BODY_STAT = gql`mutation ($username: String!, $ismale: Boolean!, $bodymass: Int!){
  updateBodyStatByUsername(input: {username: $username, patch: {ismale: $ismale, bodymass: $bodymass}}){
    clientMutationId
  }
}`
const FETCH_BODY_STAT = gql`query($username: String!){
  bodyStatByUsername(username: $username){
    ismale
    bodymass
  }
}`

const UserModal: React.FC<{visible: boolean, setVisible: (b: boolean) => void, username: string}> = ({visible, setVisible, username}) => {
  const [bodymass, setBodymass] = useState<number | undefined>(undefined)
  const [isMale, setIsMale] = useState(true)

  //check if the user has created body stats before (and in that case prefill the inputs)
  const {data, loading, refetch} = useQuery(FETCH_BODY_STAT, {
    variables: {username},
    onCompleted: (bodyStatByUsername) => {
      if (bodyStatByUsername && bodyStatByUsername.ismale){
        setIsMale(bodyStatByUsername.ismale)
        setBodymass(bodyStatByUsername.bodymass)
      }
    }
  })

  const [updateBodyStats] = useMutation(UPDATE_BODY_STAT, {
    variables: {bodymass, ismale: isMale, username},
    onCompleted: () => refetch
  })
  const [createBodyStats] = useMutation(CREATE_BODY_STAT, {
    variables: {bodymass, ismale: isMale, username},
    onCompleted: () => refetch
  })


  //disabled if still fetching existing body stats, and either update or create based on if the user has created stats befoer
  const bodyStatButton = 
    loading || !bodymass
      ?   <Button title={loading ? "Loading" : "Enter a weight"} raised={true} disabled = {true} />
      :   data
          ?   <Button title="Update body stats" raised={true} onPress={() => updateBodyStats()} />  
          :   <Button title="Create body stats" raised={true} onPress={() => createBodyStats()} />

  return (
    <Modal style={{margin: 0}} visible={visible} onDismiss={() => setVisible(false)} onRequestClose={() => setVisible(false)} animationType={'slide'}>
      <React.Fragment>
        <Text style={{textAlign: 'center', fontSize: 20}} >
          Update body stats
          </Text>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-evenly'}}>
          <TextInput value = {bodymass ? bodymass.toString() : undefined} placeholder='bodymass (kg)' onChangeText={(text) => setBodymass(parseInt(text))} keyboardType={'numeric'}>
          </TextInput>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>Male</Text>
            <Switch value={isMale} thumbColor={'white'} trackColor={{false: 'blue', true: 'pink'}} onValueChange={(value) => setIsMale(!value)}></Switch>
            <Text>Female</Text>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center'}}>
          {bodyStatButton}
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

