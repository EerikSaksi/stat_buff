import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import User from './components/tabs/user/user'
import Group from './components/tabs/group/group'

const Tab = createBottomTabNavigator();
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Group" component={Group} />
        <Tab.Screen name="User" component={User}  />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
export default App

