import React from 'react';
import styles from '../assets/styles';

import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import Icon from './Icon';

const CardItem = ({ organizationName, title, type, image, variant }) => {
  // Custom styling
  const fullWidth = Dimensions.get('window').width;
  const imageStyle = [
    {
      borderRadius: 8,
      width: variant ? fullWidth / 2 - 30 : fullWidth - 80,
      height: variant ? 15 : 45,
      margin: variant ? 0 : 20,
    },
  ];

  const nameStyle = [
    {
      paddingTop: variant ? 10 : 15,
      paddingBottom: variant ? 5 : 7,
      color: '#363636',
      fontSize: variant ? 15 : 30,
    },
  ];
  const titleStyle = [
    {
      paddingTop: variant ? 10 : 15,
      paddingBottom: variant ? 5 : 7,
      color: '#363636',
      fontSize: variant ? 9 : 20,
    },
  ];

  return (
    <View style={styles.containerCardItem}>
      {/* IMAGE */}
      <Image source={image} style={imageStyle} />

      {/* ORGANIZATION NAME */}
      <Text style={nameStyle}>{organizationName}</Text>

      {/* TITLE */}
      <Text style={titleStyle}>{title}</Text>

      {/* TYPE */}
      <Text style={titleStyle}>{type}</Text>
    </View>
  );
};

export default CardItem;
