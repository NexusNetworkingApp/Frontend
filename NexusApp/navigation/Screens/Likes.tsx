import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MMKVStorage from 'react-native-mmkv-storage';
import { useAuth } from '../../AuthContext';
import { API_URL } from '../../util/URL';

const mmkv = new MMKVStorage.Loader().initialize();


const Likes = () => {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const storedAccount = mmkv.getString('account');
        if (storedAccount) {
          setAccount(JSON.parse(storedAccount));
        }
      } catch (error) {
        console.error('Error retrieving account information:', error.message);
      }
    };

    fetchAccount();
  }, []);

  useEffect(() => {
    const fetchLikes = async () => {
      setLoading(true);

      try {
        if (account) {
          const response = await axios.get(`${API_URL}/account/fetch-likes/${account.accountId}`);
          setLikes(response.data);
        }
      } catch (error) {
        console.error('Error fetching likes:', error.message);
        setError('Error fetching likes. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchLikes();
  }, [account]);

  const handleMatch = async (like) => {
    try {
      await axios.post(`${API_URL}/account/create-match`, like);

      console.log('Match created successfully');
    } catch (error) {
      console.error('Error creating match:', error.message);
      console.error('Server response:', error.response?.data);
    }
  };

  return (
    <View>
      
      {loading && <Text>Loading...</Text>}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      {likes.length > 0 && (
        <View>
          {likes.map((like) => (
            <View key={like.likeId}>
              <Text>Message: {like.likeMessage}</Text>
              {like.sender && (
                <>
                  <Text>Sender ID: {like.sender.accountId}</Text>
                  <Text>Sender Type: {like.sender.accountType}</Text>
                  {like.sender.accountType === 'INDIVIDUAL' && (
                    <>
                      <Text>Sender Name: {like.sender.individual.firstName} {like.sender.individual.lastName}</Text>
                      {/* Add more fields specific to INDIVIDUAL account type */}
                    </>
                  )}
                  {like.sender.accountType === 'ORGANIZATION' && (
                    <>
                      <Text>Organization Name: {like.sender.organization.organizationName}</Text>
                      {/* Add more fields specific to ORGANIZATION account type */}
                    </>
                  )}
                </>
              )}
              <Button title="Match" onPress={() => handleMatch(like)} />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default Likes;
