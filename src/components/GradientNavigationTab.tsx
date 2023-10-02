import { LoggedInParamList } from '@/../AppInner';
import { WHITE } from '@/styles/colors';
import common from '@/styles/common';
import THEME from '@/styles/theme';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientNaivgationTab: React.FC = () => {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  return (
    <LinearGradient
      style={styles.tabBox}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={['#62C1E9', THEME.PRIMARY]}>
      <Pressable style={styles.tabItem} onPress={() => navigation.navigate('RecruitList')}>
        <Text style={[common.text_m, common.fwb, { color: WHITE }]}>구인</Text>
      </Pressable>
      <Pressable style={styles.tabItem} onPress={() => navigation.navigate('InstructorList')}>
        <Text style={[common.text_m, common.fwb, { color: WHITE }]}>강사</Text>
      </Pressable>
      <View style={styles.centerLine} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  centerLine: {
    backgroundColor: WHITE,
    height: 24,
    position: 'absolute',
    top: 12,
    width: 1,
  },
  tabBox: {
    borderRadius: 8,
    flexDirection: 'row',
    height: 48,
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
  tabItem: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '50%',
  },
});

export default GradientNaivgationTab;
