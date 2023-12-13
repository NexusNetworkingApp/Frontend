import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import {Image, ScrollView} from 'react-native';


const Discover = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [biography, setBiography] = useState('');
  const [location, setLocation] = useState('');

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
          firstName,
          lastName,
          dateOfBirth,
          gender,
          receiveNotifications: true,
          biography,
          lastActive: '20231117',
          location: parseInt(location, 10), // Assuming location is a number.
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
        console.error('Failed to create individual');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <View >
      <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>Welcome to the NEXUS!</Text>
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
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="First Name"
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Last Name"
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Date of Birth"
        onChangeText={(text) => setDateOfBirth(text)}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Gender"
        onChangeText={(text) => setGender(text)}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Biography"
        onChangeText={(text) => setBiography(text)}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Location"
        onChangeText={(text) => setLocation(text)}
      />
      <Button onPress={createIndividual} title="Sign up" />
      </View>
    </ScrollView>
  );
};

export default Discover;
