import React, {useState} from 'react'
import {gql, useMutation} from '@apollo/client'
import {StyleSheet} from 'react-native';
import {Card, Input} from 'react-native-elements'
const CREATE_USER_BY_TOKEN_ID = gql`mutation createuserbytokenid($tokenId: String!, $username: String!){
    createUserByTokenId(tokenId: $tokenId, username: $username)
}`

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
});
const CreateUser: React.FC = () => {
  const [inputUsername, setInputUsername] = useState("")
  const [createUser, {data}] = useMutation(CREATE_USER_BY_TOKEN_ID)
  return(
    <Card containerStyle = {styles.container} ><Input>createUser</Input></Card>
  )

}
export default CreateUser



