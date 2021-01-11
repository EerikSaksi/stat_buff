import React, { useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import User from "./components/tabs/user/user";
import Group from "./components/tabs/group/group";
import useAnalytics from "./hooks/use_analytics";

const Tab = createBottomTabNavigator();
const App: React.FC<{ username: string }> = ({ username }) => {
  //our top level listener can identify when each of these becomes visible
  const [tabs, setTabs] = useState({ User: false, Group: false, Enemy: false, Members: false });

  //feed these values to the analytics hook
  useAnalytics(tabs);
  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={() => {
        setTabs(() => {
          var newTabs = { User: false, Group: false, Enemy: false, Members: false };
          newTabs[navigationRef.current.getCurrentRoute().name] = true;
          return newTabs;
        });
      }}
    >
      <Tab.Navigator>
        <Tab.Screen name="User" component={User} initialParams={{ username }} />
        <Tab.Screen name="Group" component={Group} initialParams={{ username }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default App;
