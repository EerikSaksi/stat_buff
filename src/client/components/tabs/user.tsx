import React, {useState} from 'react'
import {gql, useQuery, useReactiveVar} from '@apollo/client';
import {Text, View, StatusBar} from 'react-native'
import Loading from '../../util_components/loading';
import UserModal from "./strength_modal";
import {usernameVar} from '../../apollo/cache';
import GenericSprite from '../../sprites/generic_sprite';

import BodyStatsModal from "./bodystats_modal"

import {Button} from 'react-native-elements';


const USER_BODY_STATS = gql`query user_query($username: String!){
    user(username: $username){
      username
    }
}`

const USER = gql`query user_query($username: String!){
    user(username: $username){
      username
    }
}`

const User: React.FC = () => {
  const username = useReactiveVar(usernameVar)
  const {data} = useQuery(USER, {
    variables: {username},
  })
  const [strengthModalVisible, setStrengthModalVisible] = useState(false)
  const [bodystatsModalVisible, setBodystatsModalVisible] = useState(true)

  if (!data) {
    return (<Loading />)
  }

  return (
    <View style={{justifyContent: 'center', flex: 10, alignItems: 'center', top: StatusBar.currentHeight}}>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
        <Button style={{flex: 1}} title='Update Lifts' onPress={() => setStrengthModalVisible(true)} />
        <Button style={{flex: 1}} title='Update Body Stats' onPress={() => setBodystatsModalVisible(true)} />
      </View>
      <View style={{flex: 1}}>
        <Text> {`Welcome back, ${username}`} </Text>
      </View>
      <UserModal visible={strengthModalVisible} setVisible={setStrengthModalVisible} username={username} />
      <BodyStatsModal visible={bodystatsModalVisible} setVisible={setBodystatsModalVisible} username={username} />
      <View style={{flex: 8, justifyContent: 'center', }}>
        <GenericSprite />
      </View>
    </View>
  )
}
export default User
