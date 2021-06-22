import React, { useRef, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Workout from "./workout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
const Tab = createBottomTabNavigator();

const PERSISTENCE_KEY = "NAVIGATION_STATE";
const App: React.FC = () => {
  const navigationRef = useRef<any>();
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    const restoreState = async () => {
      try {
        if (Platform.OS !== "web") {

          // Only restore state if there's no deep link and we're not on web
          
          //await AsyncStorage.clear()
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
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state));
      }}
    >
      <Tab.Navigator>
        <Tab.Screen name="Workout" component={Workout} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default App;
