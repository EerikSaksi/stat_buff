import React, {useState, useEffect} from 'react'
import {gql, useLazyQuery} from '@apollo/client'
import {signInAsync, getCurrentUserAsync} from 'expo-google-sign-in'
const USER_BY_TOKEN_ID = gql`query userbytokenid($tokenID: String!){
    userByTokenID(tokenID: $tokenID){
      username
    }
}`
const useGoogleInfo = (initialSignIn: boolean) => {
  const [username, setUsername] = useState<String | null>(null)
  const [userExists, setUserExists] = useState<null | boolean>(true)
  const [fetchUserByTokenID] = useLazyQuery(USER_BY_TOKEN_ID, {
    onCompleted: (data) => {
      if (data.user) {
        setUsername(data.user.username)
        setUserExists(true)
      }
      else {
        setUserExists(false)
      }
    }
  })
  useEffect(() => {
    const fetchUsername = async () => {
      //get the current tokenID
      var tokenID;
      if (initialSignIn) {
        const result = await signInAsync();
        tokenID = result.user!.auth?.idToken
      }
      else {
        const result = await getCurrentUserAsync();
        tokenID = result?.auth?.idToken
      }
      fetchUserByTokenID({variables: {tokenID}})
    }
    fetchUsername()
  }, [])
  return {username, userExists}
}
export default useGoogleInfo
