import React, {useState} from 'react'
import {gql, useQuery} from '@apollo/client'
import {getCurrentUserAsync} from 'expo-google-sign-in'
const USER_BY_TOKEN_ID = gql`query userbytokenid($tokenID: String!){
    userByTokenID(tokenID: $tokenID){
      username
    }
}`
export const useTokenQuery = (tokenID: String | undefined) => {
  const [userExists, setUserExists] = useState<null | boolean>(true)
  const {data, loading} =  useQuery(USER_BY_TOKEN_ID, {
    onCompleted: (data) => {
      data.user ? setUserExists(true) : setUserExists(false)
    },
    skip: !tokenID 
  })
  return {data, userExists, setUserExists, loading}
}
//helper function that fetches the current tokenID, often needed in conjuction
export const getCurrentTokenID = async () => {
  const result = await getCurrentUserAsync()
  return(result?.auth?.idToken)
}

