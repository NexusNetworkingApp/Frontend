import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from '../Screens/SignUp';
import Login from '../Screens/login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Chat from '../Screens/Chat';
import Jobs from '../Screens/Jobs';
import Likes from '../Screens/Likes';
import Profile from '../Screens/Profile';


const Tab = createBottomTabNavigator();
function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Sign Up"
          onPress={() => navigation.navigate('SignUp')}
        />
        <Button
          title="Log in"
          onPress={() => navigation.navigate('Login')}
        />
        <Tab.Navigator>
        <Tab.Screen name="Feed" component={SignUp} />
        <Tab.Screen name="Messages" component={Login} />
        </Tab.Navigator>
      </View>
    );
  }

function MyTabs() {
    return (
      <Tab.Navigator
        initialRouteName="Discover"
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
        }}
      >
        <Tab.Screen
          name="Discover"
          component={SignUp}
          options={{
            tabBarLabel: 'Discover',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Jobs"
          component={Jobs}
          options={{
            tabBarLabel: 'Jobs',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Likes"
          component={Likes}
          options={{
            tabBarLabel: 'Likes',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={Chat}
          options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="bell" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }


  export default MyTabs;