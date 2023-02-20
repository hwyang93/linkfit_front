import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GRAY, WHITE} from '@styles/colors';
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
import CenterProfileBox from '@components/CenterProfileBox';

const windowWidth = Dimensions.get('window').width;
const columns2 = (windowWidth - 32) / 2;
const columns3 = (windowWidth - 32) / 3;
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
    link: 'CertifyInstructor',
  },
  {
    icon: iconPath.MY_REVIEWS,
    title: '후기 관리',
    link: 'ReviewManage',
  },
];

function MyCenterScreen() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const [myInfo, setMyInfo] = useState({
    memberInfo: {
      nickname: '',
      intro: '',
      field: '',
      licences: {},
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
      completeSuggestCount: undefined,
      closeSuggestCount: undefined,
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
    <ScrollView style={{flex: 1, backgroundColor: WHITE}}>
      <View style={[styles.container, {paddingBottom: insets.bottom}]}>
        <View style={common.mb20}>
          <CenterProfileBox />
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

        {/* 이력서 박스 */}

        <View style={[common.mb8]}>
          <MyTitle title={'채용 공고'} button={true} />
        </View>

        <View style={common.mb24}>
          <View style={[common.rowCenter, {flexWrap: 'wrap'}]}>
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
              <Text style={common.title_s}>3</Text>
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
              <Text style={common.title_s}>1</Text>
            </View>
          </View>
        </View>

        <View style={[common.mb8]}>
          <MyTitle title={'포지션 제안'} button={true} />
        </View>

        <View style={common.mb24}>
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
              <Text style={common.text_s}>대기중</Text>
              <Text style={common.title_s}>3</Text>
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
              <Text style={common.title_s}>1</Text>
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
              <Text style={common.title_s}>2</Text>
            </View>
          </View>
        </View>
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
export default MyCenterScreen;