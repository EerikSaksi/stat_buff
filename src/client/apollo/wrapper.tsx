import registerRootComponent from "expo/build/launch/registerRootComponent";
import React from "react";
import { View, Text } from "react-native";
import { AppleAuthenticationButton, AppleAuthenticationButtonType, AppleAuthenticationButtonStyle, signInAsync } from "expo-apple-authentication";
const index: React.FC = () => (
  <View style={{ height: "100%", width: "100%", flex: 1, justifyContent: "center", alignItems: "center" }}>
    <AppleAuthenticationButton
      style={{ width: "70%", height: "10%" }}
      onPress={async () => {
        const user = await signInAsync();
        alert(user);
      }}
      buttonType={AppleAuthenticationButtonType.SIGN_UP}
      buttonStyle={AppleAuthenticationButtonStyle.WHITE_OUTLINE}
    />
  </View>
);
registerRootComponent(index);
