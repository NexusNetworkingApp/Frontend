import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../AuthContext';

const Login = () => {
  const { isLoggedIn, login } = useAuth();
  const [accountType, setAccountType] = useState('individual');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAccountTypeChange = (value) => {
    setAccountType(value);
  };

  const handleSubmit = async () => {
    try {
      const loginSuccessful = await login(accountType, email, password);

      if (loginSuccessful) {
        console.log('Login successful');
        // Reset form after successful login
        setEmail('');
        setPassword('');
        // Navigate to the home page or perform any other desired action
      } else {
        console.log('Login failed');
        // Handle unsuccessful login (e.g., show an error message)
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      {isLoggedIn ? (
        <Text>You are already logged in. Redirect to the home page or show logged-in content.</Text>
      ) : (
        <View>
          <View style={styles.inputContainer}>
            <Text>Account Type:</Text>
            <View style={styles.selectContainer}>
              <TouchableOpacity onPress={() => handleAccountTypeChange('individual')}>
                <Text style={[styles.accountType, accountType === 'individual' && styles.selected]}>
                  Individual
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleAccountTypeChange('organization')}>
                <Text style={[styles.accountType, accountType === 'organization' && styles.selected]}>
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




