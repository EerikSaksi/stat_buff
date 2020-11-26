import React, {useRef, useState} from 'react'
import {gql, useQuery, useMutation, useReactiveVar} from '@apollo/client';
import {Text, Modal, View} from 'react-native'
import CenteredView from '../../util_components/centered_view'
import Loading from '../../util_components/loading';
import TopView from '../../util_components/top_view';
import UserModal from './user_modal';
import {usernameVar} from '../../apollo/cache';
import GenericSprite from '../../sprites/generic_sprite';
import {Button} from 'react-native-elements';


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
  const [modalVisible, setModalVisible] = useState(true)

  if (!data) {
    return (<Loading />)
  }

  return (
    <View style={{justifyContent: 'center', flex: 10, alignItems: 'center'}}>
      <View style={{flex: 1}}><Button title='Update Stats' onPress={() => setModalVisible(true)} /></View>
      <View style={{flex: 1}}><Text> {`Welcome back, ${username}`} </Text></View>
      <UserModal visible = {modalVisible} setVisible = {setModalVisible} username = {username}/> 
      <View style={{flex: 8, justifyContent: 'center', }}>
        <GenericSprite/>
      </View>
    </View>
  )
}
export default User
