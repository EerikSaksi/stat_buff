import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {initAsync, signInAsync, GoogleSignInAuthResult} from 'expo-google-sign-in'
import {gql, ApolloProvider, ApolloClient, ApolloClientOptions, InMemoryCache, useLazyQuery} from '@apollo/client'

const USER_BY_TOKEN_ID = gql`query userbytokenid($tokenId: String!){
    userByTokenID(tokenId: $tokenId){
      userName
    }
}`
const options: ApolloClientOptions<unknown> = {uri: 'localhost:4000/graphql', cache: new InMemoryCache()}
const client = new ApolloClient(options);

export default function App() {
  const [fetchUserByTokenID, {data: {userByTokenID!} = {}}] = useLazyQuery(USER_BY_TOKEN_ID)
useEffect(() => {
  const signIn = async () => {
    initAsync()
    //get the token id and fetch data with it
    const result: GoogleSignInAuthResult = await signInAsync();
    fetchUserByTokenID({variables: {tokenId: result!.user!.auth?.idToken}})
  }
  signIn()
}, [])
return (
  <ApolloProvider client={client}>
    <View style={styles.container} >
      <Text>{JSON.stringify(userByTokenID)}</Text>
    </View>
  </ApolloProvider>
);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
