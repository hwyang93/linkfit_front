import SectionHeader from '@/components/Common/SectionHeader';
import ResumeCard from '@/components/Compound/ResumeCard';
import { SCREEN_WIDTH } from '@/lib/constants/common';
import { ROUTE } from '@/lib/constants/route';
import { iconPath } from '@/lib/iconPath';
import { formatDate } from '@/lib/util';
import { FetchMemberMyInfoResponse } from '@/types/api/member.type';
import { fetchMemberMyInfo } from '@api/member';
import ProfileBox from '@components/ProfileBox';
import toast from '@hooks/toast';
import { useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GRAY, WHITE } from '@styles/colors';
import common from '@styles/common';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoggedInParamList } from '../../../AppInner';

const columns3 = (SCREEN_WIDTH - 32) / 3;
const columns4 = (SCREEN_WIDTH - 32) / 4;

const MENU = [
  // {
  //   icon: iconPath.MY_PLACE,
  //   title: '지역 인증',
  //   link: 'CertifyLocation',
  // },
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
] as const;

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.TAB.MY>;

export const MyTab = ({ navigation }: Props) => {
  const [myInfo, setMyInfo] = useState<FetchMemberMyInfoResponse>();

  const isFocused = useIsFocused();

  const handleResumeCardPress = (resumeSeq: number) => {
    navigation.navigate('ResumePreview', {
      resumeSeq: resumeSeq,
      applySeq: null,
      recruitSeq: null,
    });
  };

  useEffect(() => {
    if (isFocused) {
      fetchMemberMyInfo()
        .then(({ data }) => {
          setMyInfo(data);
        })
        .catch((error) => {
          toast.error({ message: error.message });
        });
    }
  }, [isFocused]);

  return (
    <>
      {myInfo && (
        <SafeAreaView edges={['left', 'right']} style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={common.mb20}>
              {myInfo && <ProfileBox memberInfo={myInfo.memberInfo} />}
            </View>
            <View style={common.mb8}>
              <SectionHeader title="프로필 메뉴" />
              <View style={[common.rowCenter, { flexWrap: 'wrap' }]}>
                {MENU.map((item, index) => (
                  <Pressable
                    key={index}
                    style={[styles.menuItem, { width: columns3, height: 80 }]}
                    onPress={() => navigation.navigate(item.link)}>
                    <Image source={item.icon} style={common.size32} />
                    <Text style={common.text_s}>{item.title}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
            <SectionHeader
              style={{ marginBottom: 8 }}
              title="이력서"
              onPress={() => navigation.navigate('ResumeManage')}
            />
            {/* TODO: 플레이스홀더 UI 추가 */}
            {myInfo.masterResume.seq ? (
              <ResumeCard
                isMaster
                title={myInfo.masterResume.title}
                timestamp={formatDate(myInfo.masterResume.updatedAt)}
                style={{ marginBottom: 16 }}
                onPress={() => handleResumeCardPress(myInfo.masterResume.seq)}
              />
            ) : (
              <View style={{ marginBottom: 16 }} />
            )}
            <SectionHeader
              style={{ marginBottom: 8 }}
              title="지원 현황"
              onPress={() => navigation.navigate('ApplicationStatus')}
            />
            <View style={common.mb24}>
              <View style={[common.rowCenter, { flexWrap: 'wrap' }]}>
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
                  <Text style={common.title_s}>{myInfo?.applyCountInfo.totalApplyCount}</Text>
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
                  <Text style={common.title_s}>{myInfo?.applyCountInfo.passApplyCount}</Text>
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
                  <Text style={common.title_s}>{myInfo?.applyCountInfo.failApplyCount}</Text>
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
                  <Text style={common.title_s}>{myInfo?.applyCountInfo.cancelApplyCount}</Text>
                </View>
              </View>
            </View>
            <View style={common.mb8}>
              <SectionHeader
                title="받은 포지션 제안"
                onPress={() => navigation.navigate('ReceivedSuggestion')}
              />
            </View>
            <View style={common.mb24}>
              <View style={[common.rowCenter, { flexWrap: 'wrap' }]}>
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
                  <Text style={common.title_s}>{myInfo?.suggestCountInfo.totalSuggestCount}</Text>
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
                  <Text style={common.title_s}>{myInfo?.suggestCountInfo.waitingSuggestCount}</Text>
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
                    {myInfo?.suggestCountInfo.completedSuggestCount}
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
                  <Text style={common.title_s}>{myInfo?.suggestCountInfo.closedSuggestCount}</Text>
                </View>
              </View>
            </View>
            <View style={common.mb8}>
              <SectionHeader title="내 공고" onPress={() => navigation.navigate('MyPost')} />
            </View>
            <View style={common.mb16}>
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
                  <Text style={common.text_s}>등록 완료</Text>
                  <Text style={common.title_s}>{myInfo?.noticeCountInfo.totalNoticeCount}</Text>
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
                  <Text style={common.title_s}>{myInfo?.noticeCountInfo.recruitCount}</Text>
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
                  <Text style={common.title_s}>{myInfo?.noticeCountInfo.seekCount}</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  kebabIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
