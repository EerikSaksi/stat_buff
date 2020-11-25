import React, {useRef, useState} from 'react'
import {gql, useQuery, useMutation} from '@apollo/client';
import {Text, Modal, TouchableOpacity} from 'react-native'
import CenteredView from '../../util_components/centered_view'
import Loading from '../../util_components/loading';
import TopView from '../../util_components/top_view';
import UserModal from './user_modal';


const USER = gql`query user_query($username: String!){
    user(username: $username){
      username
    }
}`
const UPDATE_BODY_STATS = gql`mutation ($username: String!, $ismale: Boolean, $weight: Int){
  updateBodyStatByUsername(input: {username: $username, patch: {ismale: $ismale, weight: $weight}}){
    clientMutationId
  }
}`
type NavigationProps = {params: {username: string}};
const User: React.FC<{route: NavigationProps}> = ({route}) => {
  const username = route.params.username
  const {data} = useQuery(USER, {
    variables: {username}
  })
  const [modalVisible, setModalVisible] = useState(true)
  const [updateBodyStats] = useMutation(UPDATE_BODY_STATS, {
    variables: {username}
  })

  if (!data) {
    return (<Loading />)
  }

  return (
    <React.Fragment>
      <TopView style = {{ backgroundColor: 'blue' }}>
        <TouchableOpacity onPress={() => setModalVisible(true)} >
          <Text>Update Stats</Text>
        </TouchableOpacity>
      </TopView>
      <UserModal updateBodyStats={updateBodyStats} setVisible = {setModalVisible} visible = {modalVisible} username = {route.params.username}/>
      <CenteredView>
        <Text>{`Welcome back ${data.user.username}`}</Text>
      </CenteredView>
    </React.Fragment>
  )

}
export default User
