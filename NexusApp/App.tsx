// App.js
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './AuthContext';
import Home from './navigation/Screens/Home';
import Signup from './navigation/Screens/SignUp';
import Login from './navigation/Screens/login';
import MyTabs from './navigation/Tabs/MyTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MMKVStorage from 'react-native-mmkv-storage';
import Message from './navigation/Screens/Message';

const Stack = createNativeStackNavigator();
const mmkv = new MMKVStorage.Loader().initialize();

function App() {
  const { isLoggedIn } = useAuth();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const storedAccount = mmkv.getMap('account');
        if (storedAccount) {
          setAccount(storedAccount);
        }
      } catch (error) {
        console.error('Error retrieving account information:', error.message);
      }
    };

    fetchAccount();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Message" component={Message} />
          {isLoggedIn && account? (
            // Directly navigate to MyTabs and pass user type as a parameter
            <Stack.Screen name="MyTabs" >
              {() => (
                <MyTabs userType={account.accountType} />
              )}
            </Stack.Screen>
          ) : null}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
