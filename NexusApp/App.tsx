import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './AuthContext';
import Home from './navigation/Screens/Home';
import Signup from './navigation/Screens/SignUp';
import Login from './navigation/Screens/login';
import Chat from './navigation/Screens/Chat';
import Jobs from './navigation/Screens/Jobs';
import Likes from './navigation/Screens/Likes';
import Profile from './navigation/Screens/Profile';
import Discover from './navigation/Screens/Discover';
import Standouts from './navigation/Screens/Standouts';
import MyTabs from './navigation/Tabs/MyTab';

const Stack = createNativeStackNavigator();

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
          {isLoggedIn && (
            <>
              <Stack.Screen name="Chat" component={Chat} />
              <Stack.Screen name="Discover" component={Discover} />
              <Stack.Screen name="Jobs" component={Jobs} />
              <Stack.Screen name="Likes" component={Likes} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Standouts" component={Standouts} />
              <MyTabs userType={userType} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
