import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {initAsync, signInAsync, GoogleSignInAuthResult} from 'expo-google-sign-in'
import {gql,useLazyQuery} from '@apollo/client'

const USER_BY_TOKEN_ID = gql`query userbytokenid($tokenId: String!){
    userByTokenID(tokenId: $tokenId){
      userName
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
  const [fetchUserByTokenID, {data}] = useLazyQuery(USER_BY_TOKEN_ID)
  const {userByTokenID = {}} = data
  
  useEffect(() => {
    const signIn = async () => {
      initAsync()
      //get the token id and fetch data with it
      //const result: GoogleSignInAuthResult = await signInAsync();
      fetchUserByTokenID({variables: {tokenId: 'uh oh.. stinky'}})
    }
    signIn()
  }, [])

  return (
    <View style={styles.container} >
      <Text>{JSON.stringify(userByTokenID)}</Text>
    </View>
  );
}
