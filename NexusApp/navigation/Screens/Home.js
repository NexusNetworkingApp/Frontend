import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const handleSignUpPress = () => {
    navigation.navigate('Signup'); // Replace 'SignUp' with the actual name of your sign-up screen
  };

  const handleLoginPress = () => {
    navigation.navigate('Login'); // Replace 'Login' with the actual name of your login screen
  };

  return (
    <View style={styles.homeContainer}>
      <Text style={styles.homeTitle}>Nexus</Text>
      <Text style={styles.homeText}>Change the way you network.</Text>

      {/* Touchable components for sign-up and login */}
      <TouchableOpacity onPress={handleSignUpPress} style={styles.homeLink}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLoginPress} style={styles.homeLink}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  homeText: {
    fontSize: 16,
    marginBottom: 20,
  },
  homeLink: {
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    marginVertical: 5,
  },
});

export default Home;