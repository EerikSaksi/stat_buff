import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import EnemyView from "./enemy_view";
import { useTheme } from "@react-navigation/native";
import Statistics from "./statistics";
import Members from "./members";
import { MaterialIcons } from "@expo/vector-icons";
import ChatModal from "./chat_modal";
import { Badge, withBadge } from "react-native-elements";
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
});
const BadgedMaterialIcons = withBadge(1)(MaterialIcons)
const YourGroup: React.FC<{ groupname: string; username: string }> = ({ groupname, username }) => {
  const { colors } = useTheme();
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [newMessages, setNewMessages] = useState(0);
  return (
    <View style={styles.root}>
      <View style={{ ...styles.topRow, borderBottomColor: colors.primary }}>
        <Text style={{ fontSize: 25, textAlign: "center", color: colors.text }}>{groupname}</Text>
        <View style={{ position: "absolute", right: '5%' }}>
          <BadgedMaterialIcons onPress={() => setChatModalVisible(true)} name="message" size={30} color="black"/>
        </View>
      </View>
      <ChatModal groupname={groupname} visible={chatModalVisible} setVisible={setChatModalVisible} username={username} setNewMessages={setNewMessages} />
      <Tab.Navigator style={{ flex: 10 }} tabBarOptions={{ style: { borderTopColor: colors.primary, borderTopWidth: 1 } }}>
        <Tab.Screen name="Enemy" component={EnemyView} initialParams={{ groupname }} />
        <Tab.Screen name="Members" component={Members} initialParams={{ groupname }} />
        <Tab.Screen name="Statistics" component={Statistics} initialParams={{ groupname }} />
      </Tab.Navigator>
    </View>
  );
};
export default YourGroup;
