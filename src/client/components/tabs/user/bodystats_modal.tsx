import React from "react"
import {gql} from "@apollo/client"
import {useMutation} from "@apollo/client/react"
import {useQuery} from "@apollo/client/react/hooks/useQuery"
import {useState} from "react"
import {Text, Switch, View, Modal, TextInput} from 'react-native'
import {Button, Divider} from 'react-native-elements'
import {Ionicons} from "@expo/vector-icons"
import {generateShadow} from "react-native-shadow-generator"

const CREATE_BODY_STAT = gql`mutation ($username: String!, $ismale: Boolean!, $bodymass: Int!){
  createBodystat(input: {bodystat: {username: $username, ismale: $ismale, bodymass: $bodymass}}){
    clientMutationId
  }
}`

const UPDATE_BODY_STAT = gql`mutation ($username: String!, $ismale: Boolean!, $bodymass: Int!){
  updateBodystatByUsername(input: {username: $username, patch: {ismale: $ismale, bodymass: $bodymass}}){
    clientMutationId
  }
}`
const FETCH_BODY_STAT = gql`query($username: String!){
    bodystat(username: $username){
      ismale
      bodymass
    }
  }
`

const BodyStatsModal: React.FC<{visible: boolean, setVisible: (b: boolean) => void, username: string, refetchParent: () => void}> = ({visible, setVisible, username, refetchParent}) => {
  const [bodymass, setBodymass] = useState<number | undefined>(undefined)
  const [isMale, setIsMale] = useState(true)

  //check if the user has created body stats before (and in that case prefill the inputs)
  const {data, loading, refetch} = useQuery(FETCH_BODY_STAT, {
    variables: {username},
    onCompleted: ({bodystat}) => {
      if (bodystat.ismale) {
        setIsMale(bodystat.ismale)
        setBodymass(bodystat.bodymass)
      }
    }
  })

  const [updateBodyStats] = useMutation(UPDATE_BODY_STAT, {
    variables: {bodymass, ismale: isMale, username},
    onCompleted: () => {refetch(); refetchParent()}
  })
  const [createBodyStats] = useMutation(CREATE_BODY_STAT, {
    variables: {bodymass, ismale: isMale, username},
    onCompleted: () => {refetch(); refetchParent()}
  })

  //disabled if still fetching existing body stats, and either update or create based on if the user has created stats befoer
  const bodyStatButton =
    loading || !bodymass
      ? <Button title={loading ? "Loading" : "Enter a weight"} raised={true} disabled={true} />
      : data && data.bodystat
        ? <Button title="Update body stats" raised={true} onPress={() => updateBodyStats()} />
        : <Button title="Create body stats" raised={true} onPress={() => createBodyStats()} />

  return (
    <Modal visible={visible} onDismiss={() => setVisible(false)} onRequestClose={() => setVisible(false)} animationType={'slide'} transparent={true}>
      <View style={{margin: '10%', marginTop: '30%', marginBottom: '30%', flex: 1, backgroundColor: 'white', ...generateShadow(24), justifyContent: 'center', alignItems: 'center', }}>
        <Ionicons onPress={() => setVisible(false)} name="ios-arrow-round-back" style={{color: 'black', fontSize: 40, left: '2%', position: 'absolute', top: 0}} />
        <View style={{flex: 2, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
          <View style={{alignItems: 'center', justifyContent: 'center', }}>
            <View style = {{ flex: 1 }}><Text>Weight (kg)</Text></View>
            <TextInput style={{textAlign: 'center', flex: 1}} value={bodymass ? bodymass.toString() : undefined} placeholder='Bodyweight (kg)' onChangeText={(text) => setBodymass(parseInt(text))} keyboardType={'numeric'} />
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
          <Text>Which dataset would you like to use?</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
          <Text>Male</Text>
          <Switch value={!isMale} thumbColor={'white'} trackColor={{false: 'blue', true: 'pink'}} onValueChange={(value) => setIsMale(!value)}></Switch>
          <Text>Female</Text>
        </View>
        <View style={{alignItems: 'center', flex: 8, justifyContent: 'flex-start', }}>
          <Text style={{textAlign: 'center'}}>
            This data is private (needed for strength calculations)
          </Text>
          {bodyStatButton}
          <Divider style={{backgroundColor: 'black'}} />
        </View>
      </View>
    </Modal >
  )
}
export default BodyStatsModal
