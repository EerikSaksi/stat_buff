import {gql, useQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react'
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
  const {data, loading} = useQuery(USER, {
    variables: {username: route.params.username}
  })
  if (loading) {
    return (<Loading />)
  }
  return (
    <CenteredView>
      <Text>{data && data.user ? data.user.username : "User not found"}</Text>
    </CenteredView>
  )

}
export default User
