import { SCREEN_WIDTH } from '@/lib/constants/common';
import { iconPath } from '@/lib/iconPath';
import { fetchMemberMyInfo } from '@api/member';
import CenterProfileBox from '@components/CenterProfileBox';
import MyTitle from '@components/My/MyTitle';
import { useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GRAY, WHITE } from '@styles/colors';
import common from '@styles/common';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoggedInParamList } from '../../AppInner';

const columns2 = (SCREEN_WIDTH - 32) / 2;
const columns3 = (SCREEN_WIDTH - 32) / 3;

const MENU = [
  {
    icon: iconPath.MY_FOLLOWING,
    title: '팔로잉 관리',
    link: 'FollowingManage',
  },
  {
    icon: iconPath.MY_BOOKMARK,
    title: '북마크 관리',
    link: 'BookmarkManage',
  },
  {
    icon: iconPath.MY_LICENSE,
    title: '사업자 정보',
    link: 'CompanyInfo',
  },
  {
    icon: iconPath.MY_REVIEWS,
    title: '후기 관리',
    link: 'ReviewManage',
  },
  {
    icon: iconPath.MY_SETTINGS,
    title: '설정',
    link: 'Setting',
  },
];

type Props = NativeStackScreenProps<LoggedInParamList, 'MyCenter'>;

export const MyCenterScreen = ({ navigation }: Props) => {
  const [myInfo, setMyInfo] = useState<any>({});

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchMemberMyInfo()
        .then(({ data }: any) => {
          setMyInfo(data);
        })
        .catch((message: any) => {
          console.log(message);
        });
    }
  }, [isFocused]);

  return (
    <SafeAreaView edges={['left', 'right']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={common.mb20}>
          <CenterProfileBox memberInfo={myInfo.memberInfo} />
        </View>

        <View style={common.mb8}>
          <Text style={[common.title_s]}>프로필 메뉴</Text>
          <View style={[common.rowCenter, { flexWrap: 'wrap' }]}>
            {MENU.map((item: any, index) => {
              return (
                <Pressable
                  onPress={() => navigation.navigate(item.link)}
                  key={index}
                  style={[styles.menuItem, { width: columns3, height: 80 }]}>
                  <Image source={item.icon} style={common.size32} />
                  <Text style={common.text_s}>{item.title}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={[common.mb8]}>
          <MyTitle title={'채용 공고'} button={true} link={'MyPost'} />
        </View>

        <View style={common.mb24}>
          <View style={[common.rowCenter, { flexWrap: 'wrap' }]}>
            <View
              style={[
                styles.menuItem,
                {
                  width: columns2,
                  height: 56,
                  borderRightWidth: 1,
                  borderColor: GRAY.LIGHT,
                },
              ]}>
              <Text style={common.text_s}>진행중</Text>
              <Text style={common.title_s}>{myInfo.recruitCountInfo?.ingRecruitCount}</Text>
            </View>

            <View
              style={[
                styles.menuItem,
                {
                  width: columns2,
                  height: 56,
                },
              ]}>
              <Text style={common.text_s}>마감</Text>
              <Text style={common.title_s}>{myInfo?.recruitCountInfo?.closedRecruitCount}</Text>
            </View>
          </View>
        </View>

        <View style={[common.mb8]}>
          <MyTitle title={'포지션 제안'} button={true} link={'SendSuggestion'} />
        </View>

        <View style={common.mb24}>
          <View style={[common.rowCenter, { flexWrap: 'wrap' }]}>
            <View
              style={[
                styles.menuItem,
                {
                  width: columns3,
                  height: 56,
                  borderRightWidth: 1,
                  borderColor: GRAY.LIGHT,
                },
              ]}>
              <Text style={common.text_s}>대기중</Text>
              <Text style={common.title_s}>{myInfo.suggestCountInfo?.waitingSuggestCount}</Text>
            </View>

            <View
              style={[
                styles.menuItem,
                {
                  width: columns3,
                  height: 56,
                  borderRightWidth: 1,
                  borderColor: GRAY.LIGHT,
                },
              ]}>
              <Text style={common.text_s}>완료</Text>
              <Text style={common.title_s}>{myInfo.suggestCountInfo?.completedSuggestCount}</Text>
            </View>
            <View
              style={[
                styles.menuItem,
                {
                  width: columns3,
                  height: 56,
                },
              ]}>
              <Text style={common.text_s}>마감</Text>
              <Text style={common.title_s}>{myInfo.suggestCountInfo?.closedSuggestCount}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderBox: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: GRAY.DEFAULT,
  },
  kebabIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
});
