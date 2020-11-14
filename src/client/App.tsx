import React from 'react'
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import User from './components/tabs/user'

const Tab = createBottomTabNavigator();
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="You" component={User} />
        <Tab.Screen name="Team" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
export default App
