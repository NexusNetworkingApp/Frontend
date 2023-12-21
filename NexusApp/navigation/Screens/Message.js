import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { API_URL } from '../../util/URL';
import { useRoute, useNavigation } from '@react-navigation/native';
import MMKVStorage from 'react-native-mmkv-storage';

const mmkv = new MMKVStorage.Loader().initialize();
const Message = () => {
  const route = useRoute();
  const { accountId, otherUserId } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [account, setAccount] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const storedAccount = mmkv.getMap('account');
    setAccount(storedAccount);
  }, [accountId]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/account/messages/${accountId}/${otherUserId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error.message);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [accountId]);

  const handleSendMessage = async () => {
    try {
      await axios.post(`${API_URL}/account/message/send/${accountId}/${otherUserId}/${newMessage}`);
      await fetchMessages();
    } catch (error) {
      console.error('Error sending or fetching messages:', error.message);
      console.log(accountId, otherUserId, newMessage);
    }

    setNewMessage('');
  };

  const renderItem = ({ item }) => (
    <View style={item.sender.accountId === account.accountId ? styles.sentMessage : styles.receivedMessage}>
      <Text>{item.sender.accountId === account.accountId ? 'You' : item.sender.individual.firstName}</Text>
      <Text>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text>Back to Chat</Text>
        </TouchableOpacity>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.messageId.toString()}
        renderItem={renderItem}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
          placeholder="Type your message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#87CEEB',
    padding: 8,
    marginVertical: 4,
    borderRadius: 8,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#DDDDDD',
    padding: 8,
    marginVertical: 4,
    borderRadius: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#32CD32',
    padding: 8,
    borderRadius: 8,
  },
  backButton: {
    marginTop: 16,
    backgroundColor: '#CCCCCC',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default Message;
