import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WHITE} from '../styles/colors';

function Link() {
  return (
    <View style={styles.container}>
      <Text>채용 화면</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
});

export default Link;
