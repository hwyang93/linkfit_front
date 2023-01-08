import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import common, {width} from '../styles/common';

function Logo() {
  return (
    <View style={styles.logoArea}>
      <View style={styles.logoBox}>
        <Image
          source={require('../assets/images/logoText.png')}
          style={styles.logoText}
          resizeMode={'cover'}
        />
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logoImage}
          resizeMode={'cover'}
        />
      </View>
      <Text style={[common.text_m, common.tac, common.mt20]}>
        당신의 커리어를 위한 여정에{'\n'} Linkfit이 함께 할게요.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logoArea: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBox: {
    width: +width * 200,
  },
  logoText: {
    width: '100%',
    marginBottom: 8,
  },
  logoImage: {
    width: '100%',
    height: 58,
  },
});

export default Logo;
