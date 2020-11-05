import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {initAsync, signInAsync, GoogleSignInAuthResult} from 'expo-google-sign-in'
import {gql, useLazyQuery} from '@apollo/client'

const user_By_Token_ID = gql`query apppublicuserbytokenid($tokenId: String!){
    appPublicUserByTokenID(tokenId: $tokenId){
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
  const [fetchUserByTokenID, {data, error}] = useLazyQuery(user_By_Token_ID)
  console.log(error)
  useEffect(() => {
    const signIn = async () => {
      initAsync()
      //get the token id and fetch data with it
      //const result: GoogleSignInAuthResult = await signInAsync();
      fetchUserByTokenID({variables: {tokenId: 'gID'}})

      console.log('ran')
    }
    signIn()
  }, [])

  return (
    <View style={styles.container} >
      <Text>Hello world!</Text>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
}
