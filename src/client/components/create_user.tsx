import React, {useState} from 'react'
import {gql, useMutation} from '@apollo/client'
const CREATE_USER_BY_TOKEN_ID = gql`mutation createuserbytokenid($tokenId: String!, $username: String!){
    createUserByTokenId(tokenId: $tokenId, username: $username)
}`
const CreateUser: React.FC = () => {
  const [inputUsername, setInputUsername] = useState("")
  const [createUser, {data}] = useMutation(CREATE_USER_BY_TOKEN_ID)
}
export default CreateUser



