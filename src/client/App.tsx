import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import User from './components/tabs/user'
import Group from './components/tabs/group'
import Loading from './util_components/loading';

const Tab = createBottomTabNavigator();
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="User" component={User}  />
        <Tab.Screen name="Group" component={Group} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
export default App

