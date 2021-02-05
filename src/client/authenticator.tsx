import React, { useState } from "react";
import { gql } from "@apollo/client";
import ExerciseModal from "./components/tabs/user/exercise_modal";
import {GiftedChat} from "react-native-gifted-chat";
import {Modal, View, StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {Ionicons} from "@expo/vector-icons";
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
  const [visible, setVisible] = useState(true)
  return (
    <Modal style={{ height: "100%" }} visible={visible} onDismiss={() => setVisible(false)} onRequestClose={() => setVisible(false)} animationType={"slide"}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.paddingWrap}>
          <Ionicons onPress={() => setVisible(false)} style={styles.arrow} name="arrow-back-sharp" />
          <GiftedChat
            placeholder={`Send a message to "${'stinky'}"`}
            user={{ name: 'orek', _id: 0}}
            onSend={() => {
            }}
            renderUsernameOnMessage
            messages={[]}
          ></GiftedChat>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
