// MainBuffer.js
import React, { useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import { View, ActivityIndicator } from 'react-native';

const MainBuffer = ({ navigation }) => {
  const { isLoggedIn, account } = useAuth();

  useEffect(() => {
    // You can add any additional logic here if needed
    // For example, fetching data or performing any checks

    // Redirect to the appropriate screen based on user authentication status
    if (isLoggedIn && account) {
      navigation.replace('MyTabs', { userType: account.accountType });
    } else {
      navigation.replace('Login');
    }
  }, [isLoggedIn, account, navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default MainBuffer;
