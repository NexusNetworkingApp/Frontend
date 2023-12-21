import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { API_URL } from '../../util/URL';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API_URL}/account/all-jobs`);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error.message);
      }
    };

    fetchJobs();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Jobs</Text>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.jobId.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={styles.cardContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.jobType}>Job Type: {item.type}</Text>
              <Text style={styles.startDate}>Start Date: {item.startDate}</Text>
              <Text style={styles.endDate}>End Date: {item.endDate}</Text>
              {/* Add other job details as needed */}
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => {
                  // Replace 'https://example.com/apply-job' with the actual external URL
                  // You may want to open the URL in a WebView or implement a navigation solution
                  console.log(`Apply button pressed for job ${item.jobId}`);
                }}
              >
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
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
  cardContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    margin: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  jobType: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 4,
  },
  startDate: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 4,
  },
  endDate: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 4,
  },
  applyButton: {
    backgroundColor: '#32CD32',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Jobs;
