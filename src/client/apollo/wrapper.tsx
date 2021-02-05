import registerRootComponent from "expo/build/launch/registerRootComponent";
import React from "react";
import {View} from "react-native";
import {AppleAuthenticationButton, AppleAuthenticationButtonType, AppleAuthenticationButtonStyle} from "expo-apple-authentication";
const index: React.FC = () => (
  <View style = {{ backgroundColor: 'blue', height: '100%', width: '100%'}}>
    <AppleAuthenticationButton onPress = {() => alert('wowa')} buttonType = {AppleAuthenticationButtonType.SIGN_UP} buttonStyle = {AppleAuthenticationButtonStyle.WHITE_OUTLINE}/>
  </View>
);
registerRootComponent(index);
