import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import EnemyView from "./enemy_view";
import { useTheme } from "@react-navigation/native";
import Members from "./members";
import { MaterialIcons } from "@expo/vector-icons";
import ChatModal from "./chat_modal";
import { Badge } from "react-native-elements";
const Tab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  root: {
    flex: 1,
    justifyContent: "center",
  },
  topRow: {
    flex: 1,
    backgroundColor: "white",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    width: "100%",
  },
  topText: {
    justifyContent: "center",
    alignItems: "center",
    flex: 3,
  },
  chatContainer: {
    position: "absolute",
    left: "5%",
  },
  badgeContainer: {
    position: "absolute",
    top: -4,
    right: -4,
  },
  tabNavigator: {
    flex: 10
  }
});
const YourGroup: React.FC<{ groupname: string; username: string, refetchParentGroup: (arg: boolean) => void }> = ({ groupname, username, refetchParentGroup }) => {
  const { colors } = useTheme();
  const [chatModalVisible, setChatModalVisible] = useState(true);
  const [newMessages, setNewMessages] = useState(0);
  return (
    <View style={styles.root}>
      <View style={{ ...styles.topRow, borderBottomColor: colors.primary }}>
        <Text style={{ fontSize: 25, textAlign: "center", color: colors.text }}>{groupname}</Text>
        <View style={styles.chatContainer}>
          <MaterialIcons onPress={() => setChatModalVisible(true)} name="message" size={30} color="black" />
          <Badge value={newMessages} status="error" containerStyle={styles.badgeContainer} />
        </View>
      </View>
      <ChatModal groupname={groupname} visible={chatModalVisible} setVisible={setChatModalVisible} username={username} setNewMessages={setNewMessages} />
      <Tab.Navigator style={styles.tabNavigator} tabBarOptions={{ style: { borderTopColor: colors.primary, borderTopWidth: 1 } }}>
        <Tab.Screen name="Enemy" component={EnemyView} initialParams={{ groupname }} />
        <Tab.Screen name="Members" component={Members} initialParams={{ groupname }} />
      </Tab.Navigator>
    </View>
  );
};
export default YourGroup;
