import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {BLUE, WHITE} from '@styles/colors';
import common from '@styles/common';
import {iconPath} from '@/utils/iconPath';
import {GRAY} from '@styles/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../../AppInner';
import {useCallback} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

const DATA = [
  {
    icon: iconPath.NOTIFICATION,
    title: '알림 설정',
    link: 'NotificationSetting',
  },
  {
    icon: iconPath.ACCOUNT,
    title: '계정 관리',
    link: 'Account',
  },
  {
    icon: iconPath.BLACKLIST,
    title: '차단 사용자 관리',
    link: 'Blacklist',
  },
  {
    icon: iconPath.NOTICE,
    title: '공지사항',
    link: 'Notice',
  },
  {
    icon: iconPath.INQUIRY,
    title: '1:1 문의',
    link: 'Inquiry',
  },
  {
    icon: iconPath.DOCUMENT,
    title: '버전 정보',
    link: 'Version',
  },
  {
    icon: iconPath.RULE,
    title: '서비스 이용약관',
    link: 'Rule',
  },
];

function SettingScreen() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  const onLogout = useCallback(async () => {
    await EncryptedStorage.removeItem('accessToken');
    await EncryptedStorage.removeItem('refreshToken');
    navigation.navigate('SignIn');
  }, [navigation]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {DATA.map((item: any, index) => (
        <Pressable
          key={index}
          style={[common.rowCenterBetween, styles.box]}
          onPress={() => navigation.navigate(item.link)}>
          <View style={common.rowCenter}>
            <Image source={item.icon} style={common.size24} />
            <Text style={[common.ml8, common.text_m]}>{item.title}</Text>
          </View>
          <View>
            <FontAwesome name={'chevron-right'} color="black" size={12} />
          </View>
        </Pressable>
      ))}

      <View>
        <Pressable style={common.mv20} onPress={onLogout}>
          <Text style={[common.text_m, styles.linkText]}>로그아웃</Text>
        </Pressable>
        <Pressable
          style={common.mv20}
          onPress={() =>
            Alert.alert('테스트', '캐시데이터 삭제가 되지 않아용')
          }>
          <Text style={[common.text_m, styles.linkText]}>캐시 데이터 삭제</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
  box: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: GRAY.LIGHT,
  },
  linkText: {
    color: BLUE.DEFAULT,
    textDecorationLine: 'underline',
    textDecorationColor: BLUE.DEFAULT,
  },
});
export default SettingScreen;
