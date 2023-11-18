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
          email: 'example@example.com',
          passwordHash: 'hashedPassword',
          firstName: 'John',
          lastName: 'Doe',
          dateOfBirth: '1990-01-01',
          gender: 'Male',
          receiveNotifications: true,
          biography: 'Sample biography',
          lastActive: '2023-11-17T12:00:00',
          location: 1,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Response:', responseData);
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
