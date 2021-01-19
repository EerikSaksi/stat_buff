import React, { useRef} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import User from "./components/tabs/user/user";
import Group from "./components/tabs/group/group";
import { visibleSection } from "./apollo/cache";
import useAnalyticsSender from "./hooks/analytics/use_analytics_sender";
import {View} from "react-native";

const Tab = createBottomTabNavigator();

const App: React.FC<{ username: string }> = ({ username }) => {
  const navigationRef = useRef<any>();

  //init the analytics tracker and sender
  useAnalyticsSender(username)
  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={() => {
        const tab = navigationRef.current.getCurrentRoute().name;
        //set the tab as the visible section 
        //group is never set as opening group will also open enemy or members. I'm adding "tab" because postgres doesnt like "user" as a variable name
        if (tab !== "Group") visibleSection(tab + "Tab");
      }}
    >
      <Tab.Navigator>
        <Tab.Screen name="NOview" component={Group} initialParams={{ username }} />
        <Tab.Screen name="User" component={User} initialParams={{ username }} />
        <Tab.Screen name="Group" component={View} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default App;
