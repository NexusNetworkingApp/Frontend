import React from 'react';
import styles from '../../assets/styles';

import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';
import CardItem from '../../components/CardItem';
//import Icon from '../../components/Icon';
import Demo from '../../assets/data/demojobs.js';

const Jobs = () => {
  return (
    <View style={styles.containerMatches}>
      <ScrollView>
        <FlatList
          numColumns={2}
          data={Demo}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <CardItem
                organizationName={item.organizationName} // Display organizationName
                title={item.title}
                type = {item.type}
                variant
              />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
    // </ImageBackground>
  );
};

export default Jobs;