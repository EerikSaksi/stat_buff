import React, {useEffect} from 'react'
import {gql, useLazyQuery} from '@apollo/client'
import CenteredView from '../../util_components/centered_view'
import {getCurrentUser} from 'expo-google-sign-in'


const USER_BY_TOKEN_ID = gql`query userbytokenid($tokenId: String!){
    userByTokenId(tokenId: $tokenId){
      username
    }
}`
const User: React.FC = () => {
  const [fetchUserInfo, {data}]  = useLazyQuery(USER_BY_TOKEN_ID, {
  })
  useEffect(() => {
  }, [])
  return(
    <CenteredView>

    </CenteredView>
  )

}
export default User
