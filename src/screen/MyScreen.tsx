import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BLUE, GRAY, WHITE} from '@styles/colors';
import ProfileBox from '@components/ProfileBox';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';
import MyTitle from '@components/My/MyTitle';
import {useEffect, useState} from 'react';
import {fetchMemberMyInfo} from '@api/member';
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';

const windowWidth = Dimensions.get('window').width;
const columns3 = (windowWidth - 32) / 3;
const columns4 = (windowWidth - 32) / 4;
const MENU = [
  {
    icon: iconPath.MY_PLACE,
    title: '지역 인증',
    link: 'CertifyLocation',
  },
  {
    icon: iconPath.MY_LICENSE,
    title: '강사 인증',
    link: 'CertifyInstructor',
  },
  {
    icon: iconPath.MY_REVIEWS,
    title: '후기 관리',
    link: 'ReviewManage',
  },
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
    icon: iconPath.MY_SETTINGS,
    title: '설정',
    link: 'Setting',
  },
];

function MyScreen() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const isFocused = useIsFocused();
  const [myInfo, setMyInfo] = useState<any>({
    memberInfo: {
      nickname: '',
      intro: '',
      field: '',
      licences: {},
      profileImage: {},
    },
    masterResume: {
      title: undefined,
    },
    applyCountInfo: {
      totalApplyCount: undefined,
      passApplyCount: undefined,
      failApplyCount: undefined,
      cancelApplyCount: undefined,
    },
    suggestCountInfo: {
      totalSuggestCount: undefined,
      waitingSuggestCount: undefined,
      completedSuggestCount: undefined,
      closedSuggestCount: undefined,
    },
    noticeCountInfo: {
      totalNoticeCount: undefined,
      recruitCount: undefined,
      seekCount: undefined,
    },
  });
  useEffect(() => {
    if (isFocused) {
      fetchMemberMyInfo()
        .then(({data}: any) => {
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
          <ProfileBox memberInfo={myInfo.memberInfo} />
        </View>

        <View style={common.mb8}>
          <Text style={[common.title_s]}>프로필 메뉴</Text>
          <View style={[common.rowCenter, {flexWrap: 'wrap'}]}>
            {MENU.map((item: any, index) => {
              return (
                <Pressable
                  onPress={() => navigation.navigate(item.link)}
                  key={index}
                  style={[styles.menuItem, {width: columns3, height: 80}]}>
                  <Image source={item.icon} style={common.size32} />
                  <Text style={common.text_s}>{item.title}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={[common.mb8]}>
          <MyTitle title={'이력서'} button={true} link={'ResumeManage'} />
        </View>

        {/* 이력서 박스 */}
        {myInfo.masterResume.seq && (
          <View style={common.mb24}>
            <View style={common.basicBox}>
              <View style={[common.resumeBadge]}>
                <Text
                  style={[
                    common.text,
                    common.fs10,
                    {color: BLUE.DEFAULT, textAlign: 'center'},
                  ]}>
                  대표
                </Text>
              </View>
              <Text style={common.title}>{myInfo.masterResume.title}</Text>
              <Text style={[common.text_s, {color: GRAY.DARK}]}>
                {myInfo.masterResume.updatedAt}
              </Text>
              <Pressable
                style={styles.kebabIcon}
                hitSlop={10}
                onPress={() => Alert.alert('click', 'test')}>
                <Image source={iconPath.KEBAB} style={[common.size24]} />
              </Pressable>
            </View>
          </View>
        )}
        {/* 이력서 박스 */}

        <View style={[common.mb8]}>
          <MyTitle
            title={'지원 현황'}
            button={true}
            link={'ApplicationStatus'}
          />
        </View>

        <View style={common.mb24}>
          <View style={[common.rowCenter, {flexWrap: 'wrap'}]}>
            <View
              style={[
                styles.menuItem,
                {
                  width: columns4,
                  height: 56,
                  borderRightWidth: 1,
                  borderColor: GRAY.LIGHT,
                },
              ]}>
              <Text style={common.text_s}>지원 완료</Text>
              <Text style={common.title_s}>
                {myInfo.applyCountInfo.totalApplyCount}
              </Text>
            </View>
            <View
              style={[
                styles.menuItem,
                {
                  width: columns4,
                  height: 56,
                  borderRightWidth: 1,
                  borderColor: GRAY.LIGHT,
                },
              ]}>
              <Text style={common.text_s}>합격</Text>
              <Text style={common.title_s}>
                {myInfo.applyCountInfo.passApplyCount}
              </Text>
            </View>
            <View
              style={[
                styles.menuItem,
                {
                  width: columns4,
                  height: 56,
                  borderRightWidth: 1,
                  borderColor: GRAY.LIGHT,
                },
              ]}>
              <Text style={common.text_s}>불합격</Text>
              <Text style={common.title_s}>
                {myInfo.applyCountInfo.failApplyCount}
              </Text>
            </View>
            <View
              style={[
                styles.menuItem,
                {
                  width: columns4,
                  height: 56,
                },
              ]}>
              <Text style={common.text_s}>지원 취소</Text>
              <Text style={common.title_s}>
                {myInfo.applyCountInfo.cancelApplyCount}
              </Text>
            </View>
          </View>
        </View>

        <View style={[common.mb8]}>
          <MyTitle
            title={'받은 포지션 제안'}
            button={true}
            link={'ReceivedSuggestion'}
          />
        </View>

        <View style={common.mb24}>
          <View style={[common.rowCenter, {flexWrap: 'wrap'}]}>
            <View
              style={[
                styles.menuItem,
                {
                  width: columns4,
                  height: 56,
                  borderRightWidth: 1,
                  borderColor: GRAY.LIGHT,
                },
              ]}>
              <Text style={common.text_s}>전체</Text>
              <Text style={common.title_s}>
                {myInfo.suggestCountInfo.totalSuggestCount}
              </Text>
            </View>
            <View
              style={[
                styles.menuItem,
                {
                  width: columns4,
                  height: 56,
                  borderRightWidth: 1,
                  borderColor: GRAY.LIGHT,
                },
              ]}>
              <Text style={common.text_s}>답변 대기중</Text>
              <Text style={common.title_s}>
                {myInfo.suggestCountInfo.waitingSuggestCount}
              </Text>
            </View>
            <View
              style={[
                styles.menuItem,
                {
                  width: columns4,
                  height: 56,
                  borderRightWidth: 1,
                  borderColor: GRAY.LIGHT,
                },
              ]}>
              <Text style={common.text_s}>답변 완료</Text>
              <Text style={common.title_s}>
                {myInfo.suggestCountInfo.completedSuggestCount}
              </Text>
            </View>
            <View
              style={[
                styles.menuItem,
                {
                  width: columns4,
                  height: 56,
                },
              ]}>
              <Text style={common.text_s}>마감</Text>
              <Text style={common.title_s}>
                {myInfo.suggestCountInfo.closedSuggestCount}
              </Text>
            </View>
          </View>
        </View>

        <View style={[common.mb8]}>
          <MyTitle title={'내 공고'} button={true} link={'MyPost'} />
        </View>

        <View style={common.mb16}>
          <View style={[common.rowCenter, {flexWrap: 'wrap'}]}>
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
              <Text style={common.text_s}>등록 완료</Text>
              <Text style={common.title_s}>
                {myInfo.noticeCountInfo.totalNoticeCount}
              </Text>
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
              <Text style={common.text_s}>구인 공고</Text>
              <Text style={common.title_s}>
                {myInfo.noticeCountInfo.recruitCount}
              </Text>
            </View>
            <View
              style={[
                styles.menuItem,
                {
                  width: columns3,
                  height: 56,
                },
              ]}>
              <Text style={common.text_s}>구직 공고</Text>
              <Text style={[common.title_s]}>
                {myInfo.noticeCountInfo.seekCount}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
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
  kebabIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
});
export default MyScreen;
