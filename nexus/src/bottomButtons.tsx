// BottomButtons.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import Navigation from './navigation';
import { useState } from 'react';
//import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

//import Navigation from './Navigation'; // Import the Navigation component
import Home from './Home';
import Standouts from './Standouts';
import Likes from './Likes';
import Messages from './Messages';
import Profile from './Profile';

const screenConfig = [
    { name: 'Home', component: Home },
    { name: 'Standouts', component: Standouts },
    { name: 'Likes', component: Likes },
    { name: 'Messages', component: Messages },
    { name: 'Profile', component: Profile },
  ];

function BottomButtons() {
    const [initialRouteName, setInitialRouteName] = useState('Home'); // Initialize with the default route

    return (
      <View>
   
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setInitialRouteName('Home')}
          >
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setInitialRouteName('Standouts')}
          >
            <Text>Standouts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setInitialRouteName('Likes')}
          >
            <Text>Likes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setInitialRouteName('Messages')}
          >
            <Text>Messages</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setInitialRouteName('Profile')}
          >
            <Text>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
  },
  button: {
    
    backgroundColor: 'orange',
    padding: 5,
    borderRadius: 5,
  },
});

export default BottomButtons;
