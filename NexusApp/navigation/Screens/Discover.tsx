import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { useAuth } from '../../AuthContext';
import { API_URL } from '../../util/URL';

const Discover = () => {
  const [account, setAccount] = useState(null);
  const [discoverProfile, setDiscoverProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStoredAccount = async () => {
      try {
        const storedAccount = await AsyncStorage.getItem('account');
        if (storedAccount) {
          setAccount(JSON.parse(storedAccount));
        }
      } catch (error) {
        console.error('Error retrieving account from AsyncStorage:', error.message);
      }
    };

    fetchStoredAccount();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      if (account && account.accountType === 'INDIVIDUAL') {
        const response = await axios.get(`${API_URL}/account/individual-discover/${account.accountId}`);
        const returnedAccount = response.data;
        setDiscoverProfile(returnedAccount);
      } else if (account && account.accountType === 'ORGANIZATION') {
        const response = await axios.get(`${API_URL}/account/organization-discover`);
        const returnedAccount = response.data;
        setDiscoverProfile(returnedAccount);
      }
    } catch (error) {
      console.error('Error fetching discover profile:', error.message);
      setError('Error fetching discover profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (account) {
      fetchData();
    }
  }, [account]);

  const handleNext = () => {
    fetchData();
  };

  const handleLike = async () => {
    try {
      const likeData = {
        sender: account,
        receiver: discoverProfile,
        likeDate: new Date(),
        likeMessage: '',
        prompt: 'BIOGRAPHY',
      };

      console.log('Sending like:', likeData);

      await axios.post(`${API_URL}/account/create-like`, likeData);

      console.log('Like created successfully');
      Alert.alert('Like sent!');
      // You can perform additional actions after a successful like creation
    } catch (error) {
      console.error('Error creating like:', error.message);
      console.error('Server response:', error.response?.data); // Safely access response data
      // Handle error scenarios
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading && <Text style={styles.loadingText}>Loading...</Text>}
        {error && <Text style={styles.errorText}>{error}</Text>}
        {discoverProfile && (
          <View style={styles.profileContainer}>
            <Text style={styles.header}>
              {discoverProfile.accountType === 'INDIVIDUAL'
                ? `${discoverProfile.individual.firstName} ${discoverProfile.individual.lastName}`
                : discoverProfile.organization.organizationName}
            </Text>
            {discoverProfile.accountType === 'INDIVIDUAL' && (
              <>
                <Text style={styles.detailText}>Gender: {discoverProfile.individual.gender}</Text>
                <Text style={styles.detailText}>Biography: {discoverProfile.individual.biography}</Text>
                <Text style={styles.detailText}>Location: {discoverProfile.individual.location}</Text>
              </>
            )}
            {discoverProfile.accountType === 'ORGANIZATION' && (
              <>
                <Text style={styles.detailText}>Founded Date: {discoverProfile.organization.foundedDate}</Text>
                <Text style={styles.detailText}>Industry: {discoverProfile.organization.industry}</Text>
                <Text style={styles.detailText}>Biography: {discoverProfile.organization.biography}</Text>
                <Text style={styles.detailText}>Verified: {discoverProfile.organization.verified}</Text>
                <Text style={styles.detailText}>Location: {discoverProfile.organization.location}</Text>
              </>
            )}
          </View>
        )}
        <View style={styles.buttonContainer}>
          <Button title="Next" onPress={handleNext} disabled={loading} />
          <Button title="Like" onPress={handleLike} disabled={loading} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center',
    color: '#333', // Adjust color for better visibility
  },
  loadingText: {
    fontSize: 16,
    alignSelf: 'center',
    marginVertical: 16,
    color: '#555', // Adjust color for better visibility
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    alignSelf: 'center',
    marginVertical: 16,
  },
  profileContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666', // Adjust color for better visibility
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
});

export default Discover;
