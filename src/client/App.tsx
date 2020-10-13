import React from 'react';
import {Text} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
GoogleSignin.configure({
  webClientId:
    '761460499269-lh416u93k5pmeg6t2u73karm0trnqkcb.apps.googleusercontent.com',
});

const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo);
  } catch (error) {
    console.log(error);
  }
};
const App = () => {
  return <GoogleSigninButton onPress={signIn} />;
};

export default App;
