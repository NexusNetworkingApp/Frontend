import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import MMKVStorage from 'react-native-mmkv-storage';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import { API_URL } from '../../util/URL';

const mmkv = new MMKVStorage.Loader().initialize();
const Chat = ({ navigation }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetchStoredAccount = async () => {
      try {
        const storedAccount = mmkv.getMap('account');
        if (storedAccount) {
          setAccount(storedAccount);
        }
      } catch (error) {
        console.error('Error retrieving account from MMKV:', error.message);
      }
    };

    fetchStoredAccount();
  }, []);

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);

      try {
        if (account) {
          const response = await axios.get(`${API_URL}/account/fetch-matches/${account.accountId}`);
          setMatches(response.data);
        }
      } catch (error) {
        console.error('Error fetching matches:', error.message);
        setError('Error fetching matches. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [account]);

  const navigateToMessage = (otherUserId) => {
   // Store otherUserId in MMKV
    navigation.navigate('Message', {
      accountId: account.accountId,
      otherUserId: otherUserId,
    });
  };

  return (
    <View>
      {loading && <Text>Loading...</Text>}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      {matches.length > 0 && (
        <FlatList
          data={matches}
          keyExtractor={(item) => item.matchId.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                const otherUserId = (item.user1.accountId === account.accountId)
                  ? item.user2.accountId
                  : item.user1.accountId;
                navigateToMessage(otherUserId);
              }}
            >
              <View key={item.matchId}>
                {(item.user1.accountId === account.accountId) && (
                  <>
                    {item.user2.accountType === 'INDIVIDUAL' && (
                      <>
                        <Text>Name: {item.user2.individual.firstName} {item.user2.individual.lastName}</Text>
                      </>
                    )}
                    {item.user2.accountType === 'ORGANIZATION' && (
                      <>
                        <Text>Organization: {item.user2.organization.organizationName}</Text>
                      </>
                    )}
                  </>
                )}
                {(item.user2.accountId === account.accountId) && (
                  <>
                    {item.user1.accountType === 'INDIVIDUAL' && (
                      <>
                        <Text>Name: {item.user1.individual.firstName} {item.user1.individual.lastName}</Text>
                      </>
                    )}
                    {item.user1.accountType === 'ORGANIZATION' && (
                      <>
                        <Text>Organization: {item.user1.organization.organizationName}</Text>
                      </>
                    )}
                  </>
                )}
                <Text>Match date: {item.matchDate}</Text>
                <Text>Message: {item.matchMessage}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default Chat;
