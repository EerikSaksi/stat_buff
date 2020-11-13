import React, {useState, useEffect} from 'react'
import {gql, useMutation, useQuery} from '@apollo/client'
import {TextInput, Text, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native'
import {getCurrentUser} from 'expo-google-sign-in'
import CenteredView from '../util_components/centered_view'
import {generateShadow} from 'react-native-shadow-generator'
const CREATE_USER_BY_TOKEN_ID = gql`mutation createuserbytokenid($tokenId: String!, $username: String!){
    createUserByTokenID(tokenId: $tokenId, username: $username)
}`

const USER = gql`query user($username: String!){
  user(username: $username){
    username
  }
}`


var styles = StyleSheet.create({
  invalidInput: {
    backgroundColor: "red"
  },
  validInput: {
    backgroundColor: "#90EE90"
  },
  noInput: {
    backgroundColor: "white",
    width: '50%',
    textAlign: 'center',
    marginBottom: '2%',
    ...generateShadow(24)
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: 'white',
    marginBottom: '2%',
  },
  button: {
    ...generateShadow(24),
    backgroundColor: "#DDDDDD",
    width: '50%',
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

  //if no errors and input: valid, if input and error, invalidInput, otherwise no input
  const inputStyle = username.length !== 0 ? (error.length == 0 ? styles.validInput : styles.invalidInput) : styles.noInput
  const submit = async () => {
    if (error.length === 0 && username.length !== 0) {
      //get new token
      const result = getCurrentUser()

      //pass the username along with the token to the createUser function
      createUser({variables: {username, tokenID: result?.auth?.idToken}})
    }
  }
  return (
    <ImageBackground blurRadius={1.5} style={styles.image} source={require('../assets/squat.jpeg')}>
      <CenteredView>
        <Text style={styles.text}>
          {error}
        </Text>
        <TextInput onEndEditing={submit} style={StyleSheet.compose(styles.noInput, inputStyle)} value={username} placeholder="Enter username"
          onChangeText={(e) => setUsername(e)}>
        </TextInput>
        <TouchableOpacity style={styles.button} disabled={error.length !== 0 || username.length === 0} onPress={submit} >
          <Text>
            Submit
          </Text>
        </TouchableOpacity>
      </CenteredView>
    </ImageBackground>
  )
}
export default CreateUser
