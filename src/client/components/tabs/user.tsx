import {gql, useQuery} from '@apollo/client';
import React from 'react'
import {Text} from 'react-native'
import CenteredView from '../../util_components/centered_view'
import Loading from '../../util_components/loading';


const USER = gql`query user_query($username: String!){
    user(username: $username){
      username
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
    <CenteredView>
      <Text>{`Welcome back ${data.user.username}`}</Text>
    </CenteredView>
  )

}
export default User
