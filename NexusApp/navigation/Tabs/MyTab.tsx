import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Jobs from '../Screens/Jobs';
import Discover from '../Screens/Discover';
import Likes from '../Screens/Likes';
import Chat from '../Screens/Chat';
import Profile from '../Screens/Profile';
import Standouts from '../Screens/Standouts';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function MyTabs({ userType}) {
  
  return (
    <Tab.Navigator initialRouteName="Discover">
  <Tab.Screen
    name="Discover"
    component={Discover}
    options={{
      tabBarLabel: 'Discover',
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="home" color={color} size={size} />
      ),
    }}
  />
  {userType === 'INDIVIDUAL' ? (
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
  ) : userType === 'ORGANIZATION' ? (
    <Tab.Screen
      name="Standouts"
      component={Standouts}
      options={{
        tabBarLabel: 'Standouts',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  ) : null}
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
