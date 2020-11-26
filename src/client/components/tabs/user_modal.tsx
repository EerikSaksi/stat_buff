import React, {useState} from 'react'
import {Text, Switch, View, StyleSheet, Modal, TextInput} from 'react-native'
import TopView from '../../util_components/top_view'
import {Button, Divider} from 'react-native-elements'
import {useMutation, useQuery} from '@apollo/client/react'
import {gql} from '@apollo/client'
import ExerciseSearch from "./exercise_search"
import {generateShadow} from 'react-native-shadow-generator'
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
  const [exerciseInput, setExerciseInput] = useState("")
  console.log(bodymass)

  //check if the user has created body stats before (and in that case prefill the inputs)
  const {data, loading, refetch} = useQuery(FETCH_BODY_STAT, {
    variables: {username},
    onCompleted: ({bodyStatByUsername}) => {
      if (bodyStatByUsername && bodyStatByUsername.ismale) {
        setIsMale(bodyStatByUsername.ismale)
        setBodymass(bodyStatByUsername.bodymass)
      }
    }
  })

  const [updateBodyStats] = useMutation(UPDATE_BODY_STAT, {
    variables: {bodymass, ismale: isMale, username},
    onCompleted: () => refetch()
  })
  const [createBodyStats] = useMutation(CREATE_BODY_STAT, {
    variables: {bodymass, ismale: isMale, username},
    onCompleted: () => refetch()
  })

  //disabled if still fetching existing body stats, and either update or create based on if the user has created stats befoer
  const bodyStatButton =
    loading || !bodymass
      ? <Button title={loading ? "Loading" : "Enter a weight"} raised={true} disabled={true} />
      : data && data.bodyStatByUsername
        ? <Button title="Update body stats" raised={true} onPress={() => updateBodyStats()} />
        : <Button title="Create body stats" raised={true} onPress={() => createBodyStats()} />

  return (
    <Modal style={{margin: 0}} visible={visible} onDismiss={() => setVisible(false)} onRequestClose={() => setVisible(false)} animationType={'slide'}>
      <View style={{flex: 10}}>
        <Text style={{textAlign: 'center', fontSize: 20}} >
          Update body stats
          </Text>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TextInput value = {bodymass ? bodymass.toString() : undefined} placeholder='Bodyweight (kg)' onChangeText={(text) => setBodymass(parseInt(text))} keyboardType={'numeric'} />
          </View>
          <View style={{
            flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
          }}>
            <Text>Male</Text>
            <Switch value={!isMale} thumbColor={'white'} trackColor={{false: 'blue', true: 'pink'}} onValueChange={(value) => setIsMale(!value)}></Switch>
            <Text>Female</Text>
          </View>
        </View>
        <View style={{flex: 2, alignItems: 'center'}}>
          <Text>
            This data is private (needed for strength calculations)
          </Text>
          {bodyStatButton}
        </View>
        <View style={{flex: 7, alignItems: 'center', justifyContent: 'center'}}>
          <TextInput value = {exerciseInput} onChangeText = {(t) => setExerciseInput(t)} placeholder="Search for exercises">
          </TextInput>
          <ExerciseSearch input = {exerciseInput}/>
        </View>
      </View>
    </Modal >
  )
}
export default UserModal

