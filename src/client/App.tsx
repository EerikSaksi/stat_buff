import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import User from './components/tabs/user'
import Group from './components/tabs/group'

const Tab = createBottomTabNavigator();
const App: React.FC<{username: string}> = ({username}) => {
  console.log('app')
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Team" component={Group} initialParams={{username}} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
export default App

