import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {initAsync, signInAsync, GoogleSignInAuthResult} from 'expo-google-sign-in'

export default function App() {
  const [user, setUser] = useState<GoogleSignInAuthResult>();
  useEffect(() => {
    const signIn = async () => {
      initAsync()
      const tempUser = await signInAsync()
      setUser(tempUser)
    }
    signIn()
  }, [])
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(user)}</Text>
    </View>
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
