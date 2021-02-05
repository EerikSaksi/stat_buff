import registerRootComponent from "expo/build/launch/registerRootComponent";
import React, { useEffect } from "react";
import { View } from "react-native";
import { AppleAuthenticationButton, AppleAuthenticationButtonType, AppleAuthenticationButtonStyle, signInAsync, AppleAuthenticationScope, isAvailableAsync } from "expo-apple-authentication";
const index: React.FC = () => {
  useEffect(() => {
    const wait = async () => {
      const result = await isAvailableAsync();
      alert(result);
    };
    wait()
  }, []);
  return (
    <View style={{ height: "100%", width: "100%", flex: 1, justifyContent: "center", alignItems: "center" }}>
      <AppleAuthenticationButton
        style={{ width: "70%", height: "10%" }}
        onPress={async () => {
          await signInAsync({
            requestedScopes: [AppleAuthenticationScope.EMAIL],
          })
            .then((response) => alert(response.identityToken))
            .catch((error) => alert(error));
        }}
        buttonType={AppleAuthenticationButtonType.SIGN_UP}
        buttonStyle={AppleAuthenticationButtonStyle.WHITE_OUTLINE}
      />
    </View>
  );
};
registerRootComponent(index);
