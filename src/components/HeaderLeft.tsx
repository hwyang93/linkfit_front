import React from 'react';
import {Pressable, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HeaderLeft = () => {
  return (
    <Pressable>
      <Text>
        <Icon name="angle-left" size={24} color="#000" />
      </Text>
    </Pressable>
  );
};

export default HeaderLeft;
