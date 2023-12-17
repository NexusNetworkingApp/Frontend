import React, {useState} from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useAuth} from '../../AuthContext';

const Login = ({navigation}) => {
  const {isLoggedIn, login, logout} = useAuth();
  const [accountType, setAccountType] = useState('INDIVIDUAL');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAccountTypeChange = (value: React.SetStateAction<string>) => {
    setAccountType(value);
  };

  const handleSubmit = async () => {
    try {
      const loginSuccessful = await login(accountType.toLowerCase(), email, password);

      if (loginSuccessful) {
        console.log('Login successful');
        // Reset form after successful login
        setEmail('');
        setPassword('');
        // Navigate to the home page or perform any other desired action

        // navigation.navigate('Discover');
        navigation.navigate('MyTabs');
        
      } else {
        console.log('Login failed');

        // Handle unsuccessful login (e.g., show an error message)
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };
  const handleSignOut = async () => {
    try {
      // Call the logout function from useAuth
      await logout(navigation);
      console.log('Sign-out successful');
      // Optionally, you can navigate to the login screen or any other screen after sign-out
      navigation.navigate('Home');
    } catch (error) {
      console.error('Sign-out failed:', error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      {isLoggedIn ? (
        <>
          <Text>
            You are already logged in. Redirect to the home page or show
            logged-in content.
          </Text>
          <Button title="Sign Out" onPress={handleSignOut} />
        </>
      ) : (
        <View>
          <View style={styles.inputContainer}>
            <Text>Account Type:</Text>
            <View style={styles.selectContainer}>
              <TouchableOpacity
                onPress={() => handleAccountTypeChange('INDIVIDUAL')}>
                <Text
                  style={[
                    styles.accountType,
                    accountType === 'INDIVIDUAL' && styles.selected,
                  ]}>
                  Individual
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleAccountTypeChange('ORGANIZATION')}>
                <Text
                  style={[
                    styles.accountType,
                    accountType === 'ORGANIZATION' && styles.selected,
                  ]}>
                  Organization
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text>Email:</Text>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text>Password:</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <Button title="Login" onPress={handleSubmit} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  selectContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  accountType: {
    marginRight: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  selected: {
    backgroundColor: 'lightblue',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 10,
    padding: 10,
  },
});

export default Login;
