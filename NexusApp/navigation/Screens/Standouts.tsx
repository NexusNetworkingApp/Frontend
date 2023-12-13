import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import {Image, ScrollView} from 'react-native';


const Standouts = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const createIndividual = async () => {
    try {
      const response = await fetch('http://localhost:8080/account/create-individual', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          passwordHash: 'hashedPassword', // Note: In a real-world scenario, you should hash the password on the server.
        }),
      });

      if (response.ok) {
        try {
          const responseData = await response.json();
          console.log('Response Data:', responseData);
        } catch (jsonError) {
          console.error('JSON Parsing Error:', jsonError);
        }
      } else {
        console.error('Failed to login');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <View >
      <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>Welcome back to the NEXUS!</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true} 
      />
      
      <Button onPress={createIndividual} title="Log in" />
      </View>
    </ScrollView>
  );
};

export default Standouts;
