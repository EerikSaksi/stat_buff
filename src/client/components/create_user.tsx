import React, {useState, useEffect} from 'react'
import {gql, useMutation, useQuery} from '@apollo/client'
import {TextInput, Text, Button, StyleSheet} from 'react-native'
import {getCurrentUser} from 'expo-google-sign-in'
import CenteredView from '../util_components/centered_view'
const CREATE_USER_BY_TOKEN_ID = gql`mutation createuserbytokenid($tokenId: String!, $username: String!){
    createUserByTokenID(tokenId: $tokenId, username: $username)
}`

const USER = gql`query user($username: String!){
  user(username: $username){
    username
  }
}`
const styles = StyleSheet.create({
  invalidInput: {
    backgroundColor: "red"
  },
  validInput: {
    backgroundColor: "#90EE90"
  }
})

const CreateUser: React.FC = () => {
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")

  const [createUser] = useMutation(CREATE_USER_BY_TOKEN_ID, {
    onCompleted: (data) => data
  })

  //check if username exists
  const {data: userData, loading: userLoading} = useQuery(USER, {
    variables: {username},
    skip: username === ""
  })

  useEffect(() => {
    //contains disallowed characters
    if (!username.match(/^[a-zA-Z0-9._]+$/) == null) {
      setError("Only characters, numbers and _ are allowed.")
    }
    else if (username.length >= 20) {
      setError("Username too long")
    }
    //not checking if userData 
    else if (!userLoading && userData && userData.user) {
      setError("Username taken")
    }
    else {
      setError("")
    }
  }, [username, userData])
  const submit = async () => {
    if (error.length === 0 && username.length !== 0) {
      //get new token
      const result = getCurrentUser()

      //pass the username along with the token to the createUser function
      createUser({variables: {username, tokenID: result?.auth?.idToken}})
    }
  }
  return (
    <CenteredView>
      <Text>
        {error}
      </Text>
      <TextInput onEndEditing={submit} style={username.length !== 0 ? (error.length == 0 ? styles.validInput : styles.invalidInput) : undefined} value={username} placeholder="Enter username"
        onChangeText={(e) => setUsername(e)}>
      </TextInput>
      <Button title="Submit" disabled={error.length !== 0 || username.length === 0} onPress={submit}>
      </Button>
    </CenteredView>
  )
}
export default CreateUser
