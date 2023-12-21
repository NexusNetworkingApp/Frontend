import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Picker, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { API_URL } from '../../util/URL';
import MMKVStorage from 'react-native-mmkv-storage';

const mmkv = new MMKVStorage.Loader().initialize();

const JobPosting = () => {
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
  

  // State to manage form input
  const [jobData, setJobData] = useState({
    organization: account?.organization, // Use optional chaining to avoid errors
    title: '',
    description: '',
    type: 'FULL_TIME',
    startDate: '',
    endDate: '',
    postDuration: 30,
    postDate: Date.now(),
  });

  // Handle form input changes
  const handleInputChange = (name, value) => {
    console.log(`Setting ${name} to:`, value); // Add this line for logging
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  // Handle job posting
  const handleJobPost = async () => {
    try {
      // Check if the organization is available
      if (account?.organization) {
        // Update the organization field in the jobData
        setJobData((prevData) => ({
          ...prevData,
          organization: account.organization,
        }));

        // Send job data to the server for posting
        await axios.post(`${API_URL}/account/organization/post-job`, jobData);

        // Handle success (e.g., show a success message, redirect, etc.)
        console.log('Job posted successfully!');
      } else {
        console.error('Error posting job: Organization not available');
      }
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Error posting job:', error.message);
    }
  };

  // Render the form content only when the account object is not null
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Job Posting</Text>
      {account && (
        <View>
          <View style={styles.formField}>
            <Text>Title:</Text>
            <TextInput
              style={styles.input}
              name="title"
              value={jobData.title}
              onChangeText={(text) => handleInputChange('title', text)}
            />
          </View>
          <View style={styles.formField}>
            <Text>Description:</Text>
            <TextInput
              style={styles.input}
              name="description"
              value={jobData.description}
              onChangeText={(text) => handleInputChange('description', text)}
              multiline
            />
          </View>
          <View style={styles.formField}>
            <Text>Job Type:</Text>
            <Picker
              selectedValue={jobData.type}
              onValueChange={(itemValue) => handleInputChange('type', itemValue)}
            >
              <Picker.Item label="Full Time" value="FULL_TIME" />
              <Picker.Item label="Part Time" value="PART_TIME" />
              <Picker.Item label="Internship" value="INTERNSHIP" />
              <Picker.Item label="Temporary" value="TEMPORARY" />
              <Picker.Item label="Seasonal" value="SEASONAL" />
              {/* Add other job types as needed */}
            </Picker>
          </View>
          <View style={styles.formField}>
            <Text>Start Date:</Text>
            <TextInput
              style={styles.input}
              name="startDate"
              value={jobData.startDate}
              onChangeText={(text) => handleInputChange('startDate', text)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.formField}>
            <Text>End Date:</Text>
            <TextInput
              style={styles.input}
              name="endDate"
              value={jobData.endDate}
              onChangeText={(text) => handleInputChange('endDate', text)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.formField}>
            <Text>Post Duration (in days):</Text>
            <TextInput
              style={styles.input}
              name="postDuration"
              value={jobData.postDuration.toString()}
              onChangeText={(text) => handleInputChange('postDuration', parseInt(text))}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleJobPost}>
            <Text style={styles.buttonText}>Post Job</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  formField: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 12,
  },
  button: {
    backgroundColor: '#32CD32',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default JobPosting;
