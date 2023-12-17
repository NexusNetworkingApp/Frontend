import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthProvider, useAuth} from './AuthContext';
import Home from './navigation/Screens/Home';
import Signup from './navigation/Screens/SignUp';
import Login from './navigation/Screens/login';
import MyTabs from './navigation/Tabs/MyTab';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function App() {
  const {isLoggedIn} = useAuth();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const retrieveAccount = async () => {
      try {
        // Retrieve account information from AsyncStorage
        const storedAccount = await AsyncStorage.getItem('account');
        if (storedAccount !== null) {
          // If there is stored account information, parse and set it
          setAccount(JSON.parse(storedAccount));
        }
      } catch (error) {
        // Handle errors if any
        console.error('Error retrieving account information:', error);
      }
    };

    retrieveAccount();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />

          {isLoggedIn && account && (
            <Stack.Screen name="Main">
              {() => (
                <MyTabs userType={account.accountType} />
              )}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
