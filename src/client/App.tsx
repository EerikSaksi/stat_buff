import React from 'react';
import {Text} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
GoogleSignin.configure({
  webClientId: '258530305213-342934c9f0e1bp0ap8de1e43ci558jrv.apps.googleusercontent.com',
});

const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo)
  } catch (error) {
    console.log(error)
  }
};
const App = () => {
  return <GoogleSigninButton onPress={signIn} />;
};

//const styles = StyleSheet.create({
//
//)};

export default App;
