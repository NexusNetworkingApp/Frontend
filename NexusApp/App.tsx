import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

const Cafe = () => {
  const createIndividual = async () => {
    try {
      const response = await fetch('http://localhost:8080/account/create-individual', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'exampleexamplecom',
          passwordHash: 'hashedPassword',
          firstName: 'John',
          lastName: 'Doe',
          dateOfBirth: '19900101',
          gender: 'Male',
          receiveNotifications: true,
          biography: 'Sample biography',
          lastActive: '20231117',
          location: 1,
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
    <View>
      <Text>Welcome to the Cafe App!</Text>
      <Button onPress={createIndividual} title="Create Individual" />
    </View>
  );
};

export default Cafe;
