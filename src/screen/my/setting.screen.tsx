import useAuth from '@/hooks/use-auth';
import { ROUTE } from '@/lib/constants/route';
import { iconPath } from '@/lib/iconPath';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BLUE, GRAY, WHITE } from '@styles/colors';
import common from '@styles/common';
import { useCallback } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LoggedInParamList } from '../../../AppInner';

const DATA = [
  // {
  //   icon: iconPath.NOTIFICATION,
  //   title: '알림 설정',
  //   link: 'NotificationSetting',
  // },
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
    title: '이용약관',
    link: ROUTE.TERM.LIST,
  },
];

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.MY.SETTING>;

export const SettingScreen = ({ navigation }: Props) => {
  const { signOut } = useAuth();

  const onLogout = useCallback(async () => {
    signOut();
  }, [signOut]);

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
          onPress={() => Alert.alert('테스트', '캐시데이터 삭제가 되지 않아용')}>
          <Text style={[common.text_m, styles.linkText]}>캐시 데이터 삭제</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  box: {
    borderBottomWidth: 1,
    borderColor: GRAY.LIGHT,
    paddingVertical: 16,
  },
  container: {
    backgroundColor: WHITE,
    flex: 1,
    padding: 16,
  },
  linkText: {
    color: BLUE.DEFAULT,
    textDecorationColor: BLUE.DEFAULT,
    textDecorationLine: 'underline',
  },
});
