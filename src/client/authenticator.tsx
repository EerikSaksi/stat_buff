import React, {useState} from 'react';
import {initAsync, GoogleSignInAuthResult, signInAsync} from 'expo-google-sign-in'
import {gql} from '@apollo/client'
import CreateUser from './components/create_user'
import {SocialIcon} from 'react-native-elements'
import App from './App'
import CenteredView from './util_components/centered_view'

const USER_BY_TOKEN_ID = gql`query userbytokenid($tokenId: String!){
    userByTokenId(tokenId: $tokenId){
      username
    }
}`



export default function Authenticator() {

  const [userExists, setUserExists] = useState<null | boolean>(false)

  /*
  const [fetchUserByTokenID, {data}] = useLazyQuery(USER_BY_TOKEN_ID, {
    onCompleted: () => {
      //depending on if user exists set user exists state to true or false
      data.user ? setUserExists(true) : setUserExists(false)
    }
  })
   */

  //don't know if user exists
  if (userExists === null) {
    return (
      <CenteredView>
        <SocialIcon type='google' title={'Sign in with Google'} button
          style={{width: '50%'}}
          onPress={async () => {
            initAsync()
            //get the token id and fetch data with it
            const result: GoogleSignInAuthResult = await signInAsync();
            //fetchUserByTokenID({variables: {tokenId: result.user!.auth?.idToken}})
          }
          } />
      </CenteredView>
    );
  }
  if (userExists) {
    return (<App />)
  }
  else {
    return (<CreateUser />)
  }
}
