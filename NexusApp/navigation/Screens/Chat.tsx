import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

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
    <View style={styles.container}>
      {loading && <Text style={styles.loadingText}>Loading...</Text>}
      {error && <Text style={[styles.errorText, styles.text]}>{error}</Text>}

      {matches.length > 0 && (
        <FlatList
          data={matches}
          keyExtractor={(item) => item.matchId.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                const otherUserId =
                  item.user1.accountId === account.accountId ? item.user2.accountId : item.user1.accountId;
                navigateToMessage(otherUserId);
              }}
              style={styles.matchContainer}
            >
              <View key={item.matchId}>
                {item.user1.accountId === account.accountId ? (
                  <View>
                    {item.user2.accountType === 'INDIVIDUAL' && (
                      <Text style={styles.nameText}>{`${item.user2.individual.firstName} ${item.user2.individual.lastName}`}</Text>
                    )}
                    {item.user2.accountType === 'ORGANIZATION' && (
                      <Text style={styles.organizationText}>{item.user2.organization.organizationName}</Text>
                    )}
                  </View>
                ) : (
                  <View>
                    {item.user1.accountType === 'INDIVIDUAL' && (
                      <Text style={styles.nameText}>{`${item.user1.individual.firstName} ${item.user1.individual.lastName}`}</Text>
                    )}
                    {item.user1.accountType === 'ORGANIZATION' && (
                      <Text style={styles.organizationText}>{item.user1.organization.organizationName}</Text>
                    )}
                  </View>
                )}
                <Text style={styles.dateText}>{`Match date: ${item.matchDate}`}</Text>
                <Text style={styles.messageText}>{`Message: ${item.matchMessage}`}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5F5F5', // Light background color
  },
  loadingText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
  },
  matchContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  organizationText: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
  },
});

export default Chat;
