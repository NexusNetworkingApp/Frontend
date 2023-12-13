import React, { useState } from 'react';
import { Switch,View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { API_URL } from '../../util/URL';

const Signup = () => {
  const [userType, setUserType] = useState('individual');

  const [individualFormData, setIndividualFormData] = useState({
    email: '',
    passwordHash: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    receiveNotifications: false,
    biography: '',
    lastActive: new Date().toISOString(),
    location: 0,
  });

  const [organizationFormData, setOrganizationFormData] = useState({
    email: '',
    passwordHash: '',
    organizationName: '',
    foundedDate: '',
    industry: '',
    receiveNotifications: false,
    biography: '',
    lastActive: new Date().toISOString(),
    verified: false,
    location: 0,
  });

  const handleChange = (name, value) => {
    const formData = userType === 'individual' ? setIndividualFormData : setOrganizationFormData;

    formData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUserTypeChange = (value) => {
    setUserType(value);
  };

  const handleSubmit = async () => {
    const userData = userType === 'individual' ? individualFormData : organizationFormData;

    try {
      let response;
      console.log(userData);
      if (userType === 'individual') {
        response = await axios.post(`${API_URL}/account/create-individual`, userData);
      } else if (userType === 'organization') {
        response = await axios.post(`${API_URL}/account/create-organization`, userData);
      }

      console.log('API Response:', response.data);
    } catch (error) {
      console.error('API Error:', error.message);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.heading}>Sign Up</Text>
        <View>
          <Text>Account Type:</Text>
          <View style={styles.selectContainer}>
            <TouchableOpacity onPress={() => handleUserTypeChange('individual')}>
              <Text style={[styles.accountType, userType === 'individual' && styles.selected]}>
                Individual
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleUserTypeChange('organization')}>
              <Text style={[styles.accountType, userType === 'organization' && styles.selected]}>
                Organization
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.form}>
          <Text>Email Address:</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            value={userType === 'individual' ? individualFormData.email : organizationFormData.email}
            onChangeText={(value) => handleChange('email', value)} 
            required
          />

          <Text>Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={userType === 'individual' ? individualFormData.passwordHash : organizationFormData.passwordHash}
            onChangeText={(value) => handleChange('passwordHash', value)}
            minLength={8}
            required
          />
          {userType === 'individual' && (
            <>
            <Text>First Name:</Text>
            <TextInput
              style={styles.input}
              value={individualFormData.firstName}
              onChangeText={(value) => handleChange('firstName', value)}
            />

            <Text>Last Name:</Text>
            <TextInput
              style={styles.input}
              value={individualFormData.lastName}
              onChangeText={(value) => handleChange('lastName', value)}
            />

            <Text>Date of Birth:</Text>
            <TextInput
              style={styles.input}
              placeholder='19991219'
              value={individualFormData.dateOfBirth}
              onChangeText={(value) => handleChange('dateOfBirth', value)}
            />

            <Text>Gender:</Text>
            <TextInput
              style={styles.input}
              value={individualFormData.gender}
              onChangeText={(value) => handleChange('gender', value)}
            />

            <Text>Receive Notifications:</Text>
            <Switch
              value={individualFormData.receiveNotifications}
              onValueChange={(value) => handleChange('receiveNotifications', value)}
            />

            <Text>Biography:</Text>
            <TextInput
              style={styles.input}
              multiline
              value={individualFormData.biography}
              onChangeText={(value) => handleChange('biography', value)}
            />

            <Text>Location:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={individualFormData.location.toString()} // Convert to string if it's a number
              onChangeText={(value) => handleChange('location', value)}
            />
            </>
          )}

          {userType === 'organization' && (
            <>
              <Text>Organization Name:</Text>
              <TextInput
                style={styles.input}
                value={organizationFormData.organizationName}
                onChangeText={(value) => handleChange('organizationName', value)}
                required
              />

              <Text>Founded Date:</Text>
              {/* Assuming you have a custom DatePicker component for date input */}
              <TextInput
              style={styles.input}
              placeholder="19901219"
              value={organizationFormData.foundedDate}
              onChangeText={(value) => handleChange('foundedDate', value)}
              />


              <Text>Industry:</Text>
              <TextInput
                style={styles.input}
                value={organizationFormData.industry}
                onChangeText={(value) => handleChange('industry', value)}
              />

              <Text>Receive Notifications:</Text>
              <Switch
                value={organizationFormData.receiveNotifications}
                onValueChange={(value) => handleChange('receiveNotifications', value)}
              />

              <Text>Biography:</Text>
              <TextInput
                style={styles.input}
                multiline
                value={organizationFormData.biography}
                onChangeText={(value) => handleChange('biography', value)}
              />

              <Text>Verified:</Text>
              <Switch
                value={organizationFormData.verified}
                onValueChange={(value) => handleChange('verified', value)}
              />

              <Text>Location:</Text>
              <TextInput
                style={styles.input}
                keyboardType='numeric'
                value={organizationFormData.location.toString()}
                onChangeText={(value) => handleChange('location', value)}
              />
            </>
          )}

          
          {/* ... (Continue similar structure for other fields) */}

          <Button title="Create Account" onPress={handleSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  accountType: {
    marginRight: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  selected: {
    backgroundColor: 'lightblue',
  },
  form: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 10,
    padding: 10,
  },
});

export default Signup;
