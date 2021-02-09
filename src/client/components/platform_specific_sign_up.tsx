import React from "react";
import { signInAsync, AppleAuthenticationButtonStyle, AppleAuthenticationButton, AppleAuthenticationScope, AppleAuthenticationButtonType } from "expo-apple-authentication";
import { Platform, View, StyleSheet } from "react-native";
import { SocialIcon } from "react-native-elements";
import { generateShadow } from "react-native-shadow-generator";

const styles = StyleSheet.create({
  buttonWrapper: { height: "100%", width: "100%", flex: 1, justifyContent: "center", alignItems: "center" },
  socialIcon: {
    width: "50%",
    ...generateShadow(24),
  },
  appleButton: {
    width: "70%",
    height: "10%",
  },
});
const isAndroid = Platform.OS === "android";
const PlatformSpecificSignUp: React.FC<{ setGoogleLoggedIn: (arg: boolean) => void; refetchUser: () => void }> = ({ setGoogleLoggedIn, refetchUser }) => {
  if (isAndroid) {
    <View style={styles.buttonWrapper}>
      <SocialIcon
        type="google"
        title={"Sign in with Google"}
        button
        style={styles.socialIcon}
        onPress={async () => {
          setGoogleLoggedIn(true);
          refetchUser();
        }}
      />
    </View>;
  }
  return (
    <View style={styles.buttonWrapper}>
      <AppleAuthenticationButton
        style={styles.appleButton}
        onPress={async () => {
          await signInAsync({
            requestedScopes: [AppleAuthenticationScope.EMAIL],
          })
            .then((response) => {
              alert(response.identityToken);
              setGoogleLoggedIn(true)
            })
            .catch((error) => alert(error));
        }}
        buttonType={AppleAuthenticationButtonType.SIGN_UP}
        buttonStyle={AppleAuthenticationButtonStyle.WHITE_OUTLINE}
      />
    </View>
  );
};
export default PlatformSpecificSignUp;
