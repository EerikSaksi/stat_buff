import {gql, useQuery} from '@apollo/client';
import React from 'react'
import {Text, TouchableOpacity} from 'react-native'
import CenteredView from '../../util_components/centered_view'
import Loading from '../../util_components/loading';
import TopView from '../../util_components/top_view';


const USER = gql`query user_query($username: String!){
    user(username: $username){
      username
    }
}`
const UPDATE_BODY_STATS = gql`mutation ($username: String!, $ismale: Boolean, $weight: Int){
  updateBodyStatByUsername(input: {username: $username, patch: {ismale: ismale, weight: $weight}}){
    clientMutationId
  }
}`
type NavigationProps = {params: {username: string}};
const User: React.FC<{route: NavigationProps}> = ({route}) => {
  const {data} = useQuery(USER, {
    variables: {username: route.params.username}
  })

  if (!data) {
    return (<Loading />)
  }
  return (
    <React.Fragment>
      <TopView>
        <TouchableOpacity>
          <Text>Update Stats</Text>
        </TouchableOpacity>

      </TopView>
      <CenteredView>
        <Text>{`Welcome back ${data.user.username}`}</Text>
      </CenteredView>
    </React.Fragment>
  )

}
export default User
