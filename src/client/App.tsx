import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import User from './components/tabs/user'
import Group from './components/tabs/group'
import Loading from './util_components/loading';

const Tab = createBottomTabNavigator();
const App: React.FC<{username: string}> = ({username}) => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
      </Tab.Navigator>
    </NavigationContainer>
  )
}
export default App


//<Tab.Screen name="User" component={User} initialParams={{username}} />
//<Tab.Screen name="Group" component={Group} initialParams={{username}} />
