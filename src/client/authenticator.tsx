import React, { useState } from "react";
import { gql } from "@apollo/client";
import {Text} from 'react-native'
import { GiftedChat } from "react-native-gifted-chat";
import { Modal, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CreateUser from "./components/create_user";
import { AppleAuthenticationButton, signInAsync, AppleAuthenticationButtonType, AppleAuthenticationButtonStyle } from "expo-apple-authentication";
const App = React.lazy(() => import("./App"));
const AppDemo = React.lazy(() => import("./components/app_demo/app_demo"));

const USERNAME = gql`
  query {
    username
  }
`;

const styles = StyleSheet.create({
  arrow: {
    color: "black",
    fontSize: 40,
    position: "absolute",
    top: "2%",
  },
  paddingWrap: {
    paddingTop: "10%",
    flex: 1,
  },
  safeArea: {
    height: "100%",
  },
});
export default function Authenticator() {
  console.log("ran");
  return (
    <React.Fragment>
      <Text style={{ fontSize: 40 }}>hello world</Text>
      <AppleAuthenticationButton
        onPress={() => {
          signInAsync();
        }}
        buttonType={AppleAuthenticationButtonType.SIGN_UP}
        buttonStyle={AppleAuthenticationButtonStyle.WHITE_OUTLINE}
      />
    </React.Fragment>
  );
}
