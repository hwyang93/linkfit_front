import { iconPath } from '@/lib/iconPath';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import common, { width } from '../styles/common';

const SimpleLogin: React.FC = () => {
  const testClick = () => {
    Alert.alert('알림', '클릭테스트에용');
  };

  return (
    <View>
      <View style={common.mv30}>
        <Text style={[common.text_m, common.tac]}>간편 로그인</Text>
        <View style={styles.iconBox}>
          <View style={styles.easyIcon}>
            <Pressable onPress={testClick}>
              <Image source={iconPath.KAKAO} style={styles.icon} resizeMode={'cover'} />
            </Pressable>
          </View>
          <View style={styles.easyIcon}>
            <Pressable onPress={testClick}>
              <Image source={iconPath.NAVER} style={styles.icon} resizeMode={'cover'} />
            </Pressable>
          </View>
          {/*<View style={styles.easyIcon}>*/}
          {/*  <Pressable onPress={testClick}>*/}
          {/*    <Image*/}
          {/*      source={iconPath.GOOGLE}*/}
          {/*      style={styles.icon}*/}
          {/*      resizeMode={'cover'}*/}
          {/*    />*/}
          {/*  </Pressable>*/}
          {/*</View>*/}
          {/*<View style={styles.easyIcon}>*/}
          {/*  <Pressable onPress={testClick}>*/}
          {/*    <Image*/}
          {/*      source={iconPath.APPLE}*/}
          {/*      style={styles.icon}*/}
          {/*      resizeMode={'cover'}*/}
          {/*    />*/}
          {/*  </Pressable>*/}
          {/*</View>*/}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  easyIcon: {
    marginHorizontal: 8,
  },
  icon: {
    height: 40,
    width: 40,
  },
  iconBox: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: +width * 16,
  },
});

export default SimpleLogin;
