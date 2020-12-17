import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text, View } from "react-native";
import EnemyView from "./enemy_view";
import {useTheme} from "@react-navigation/native";
import Statistics from "./statistics";
const Tab = createMaterialTopTabNavigator();
const YourGroup: React.FC<{ groupname: string }> = ({ groupname }) => {
  const {colors} = useTheme()
  return (
    <View style = {{ flex: 1, justifyContent: 'center' }}>
      <View style = {{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderBottomColor: colors.primary, borderBottomWidth: 1}}>
        <Text style = {{ fontSize: 25 }}>
          
          {groupname}
        </Text>
      </View>
      <Tab.Navigator style={{ flex: 10 }} tabBarOptions = {{style: {borderTopColor: colors.primary, borderTopWidth: 1, }}} >
        <Tab.Screen
          name="Enemy"
          component={EnemyView}
          initialParams={{ groupname: groupname }}
        />
        <Tab.Screen
          name="Statistics"
          component={Statistics}
          initialParams={{ groupname: groupname }}
        />
      </Tab.Navigator>
    </View>
  );
};
export default YourGroup;
