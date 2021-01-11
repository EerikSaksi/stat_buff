import React, { useRef} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import User from "./components/tabs/user/user";
import Group from "./components/tabs/group/group";
import { visibleSection } from "./apollo/cache";
import useAnalyticsSender from "./hooks/analytics/use_analytics_sender";

const Tab = createBottomTabNavigator();

const App: React.FC<{ username: string }> = ({ username }) => {
  const navigationRef = useRef<any>();

  //init the analytics tracker and sender
  useAnalyticsSender()
  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={() => {
        const tab = navigationRef.current.getCurrentRoute().name;
        if (tab !== "Group") visibleSection(tab);
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
