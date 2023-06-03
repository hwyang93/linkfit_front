import {LoggedInParamList} from '@/../AppInner';
import {WHITE} from '@/styles/colors';
import common from '@/styles/common';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientNaivgationTab: React.FC = () => {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  return (
    <LinearGradient
      style={[styles.tabBox]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#62C1E9', '#3962f3']}>
      <Pressable
        style={styles.tabItem}
        onPress={() => navigation.navigate('RecruitMap')}>
        <Text style={[common.text_m, common.fwb, {color: WHITE}]}>구인</Text>
      </Pressable>
      <Pressable
        style={styles.tabItem}
        onPress={() => navigation.navigate('InstructorList')}>
        <Text style={[common.text_m, common.fwb, {color: WHITE}]}>강사</Text>
      </Pressable>
      <View style={styles.centerLine} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  tabBox: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: 48,
    borderRadius: 8,
  },
  tabItem: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerLine: {
    position: 'absolute',
    top: 12,
    height: 24,
    width: 1,
    backgroundColor: WHITE,
  },
});

export default GradientNaivgationTab;
