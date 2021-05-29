import React, { useRef, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import User from "./user";
import Workout from "./workout";

import { visibleSection } from "../apollo/cache";
import useAnalyticsSender from "./analytics/use_analytics_sender";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
const Tab = createBottomTabNavigator();

const PERSISTENCE_KEY = "NAVIGATION_STATE";
const App: React.FC<{ username: string }> = ({ username }) => {
  const navigationRef = useRef<any>();
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = useState();
  //init the analytics tracker and sender
  useAnalyticsSender(username);

  useEffect(() => {
    const restoreState = async () => {
      try {
        if (Platform.OS !== "web") {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;
          if (state !== undefined) {
            setInitialState(state);
          }
        }
      }
      
      catch(error){
        console.log(error)
      }
      finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      initialState={initialState}
      onStateChange={(state) => {
        const tab = navigationRef.current.getCurrentRoute().name;
        //set the tab as the visible section
        //group is never set as opening group will also open enemy or members. I'm adding "tab" because postgres doesnt like "user" as a variable name
        if (tab !== "Group") visibleSection(tab + "Tab");
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state));
      }}
    >
      <Tab.Navigator>
        <Tab.Screen name="User" component={User} initialParams={{ username }} />
        <Tab.Screen name="Workout" component={Workout} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default App;
