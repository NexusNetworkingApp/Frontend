import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './navigation/Screens/SignUp';
import Login from './navigation/Screens/login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyTabs from './navigation/Tabs/MyTab';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
    
  );
}


export default App;
