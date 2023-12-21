import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';
import { API_URL } from '../../util/URL';

const Standouts = () => {
  // State to store the fetched accounts
  const [individualAccounts, setIndividualAccounts] = useState([]);

  useEffect(() => {
    // Function to fetch individual accounts
    const fetchIndividualAccounts = async () => {
      try {
        // Fetch individual accounts from your API
        const response = await axios.get(`${API_URL}/account/standouts`);
        // Set the fetched accounts to the state
        setIndividualAccounts(response.data);
      } catch (error) {
        console.error('Error fetching individual accounts:', error.message);
      }
    };

    // Call the fetch function when the component mounts
    fetchIndividualAccounts();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Standouts</Text>
      {/* Render the list of individual accounts using FlatList */}
      <FlatList
        data={individualAccounts}
        keyExtractor={(item) => item.accountId.toString()}
        renderItem={({ item }) => (
          <View>
            {/* Display individual account details as needed */}
            <Text>{`${item.individual.firstName} ${item.individual.lastName}`}</Text>
            {/* Add more details as needed */}
          </View>
        )}
      />
      {/* Include other components or UI elements */}
    </View>
  );
};

export default Standouts;
