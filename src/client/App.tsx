import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {initAsync, GoogleSignInAuthResult, signInAsync} from 'expo-google-sign-in'
import {gql, useLazyQuery} from '@apollo/client'
import CreateUser from './components/create_user'
import {SocialIcon} from 'react-native-elements'
const USER_BY_TOKEN_ID = gql`query userbytokenid($tokenId: String!){
    userByTokenId(tokenId: $tokenId){
      username
    }
}`


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  const [userExists, setUserExists] = useState<null | boolean>(null)

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
      <View style={styles.container} >
        <SocialIcon type='google' title={'Sign in with Google'} button
          style={{width: '50%'}}
          onPress={async () => {
            initAsync()
            //get the token id and fetch data with it
            const result: GoogleSignInAuthResult = await signInAsync();
            /*
            fetchUserByTokenID({variables: {tokenId: result.user!.auth?.idToken}})
             */
          }
          } />
      </View>
    );
  }
  if (!userExists) {
    return (<CreateUser />)
  }
}
