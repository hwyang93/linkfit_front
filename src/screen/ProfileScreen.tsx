import {fetchInstructor} from '@/api/instructor';
import ExpandButton from '@/components/Common/ExpandButton';
import RowView from '@/components/Common/RowView';
import SectionHeader from '@/components/Common/SectionHeader';
import InstructorProfile from '@/components/Compound/InstructorProfile';
import RecruitCard from '@/components/Compound/RecruitCard';
import ReviewListItem from '@/components/Compound/ReviewListItem';
import {FetchInstructorResponse} from '@/types/api/instructor';
import {SCREEN_WIDTH} from '@/utils/constants/common';
import {formatDate} from '@/utils/util';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useCallback, useEffect, useState} from 'react';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LoggedInParamList} from '../../AppInner';

const DUMMY_IMAGES = [
  require('@images/center_01.png'),
  require('@images/center_02.png'),
  require('@images/center_03.png'),
  require('@images/center_04.png'),
  require('@images/center_05.png'),
];

type Props = NativeStackScreenProps<LoggedInParamList, 'Profile'>;

const ProfileScreen = ({route}: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [data, setData] = useState<FetchInstructorResponse>();

  const fetchData = useCallback(async () => {
    try {
      const response = await fetchInstructor(route.params.memberSeq);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [route.params.memberSeq]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // TODO: api 연동 필요

  return (
    <SafeAreaView edges={['left', 'right']} style={{flex: 1}}>
      {data && (
        <ScrollView contentContainerStyle={{padding: 16, paddingBottom: 32}}>
          <InstructorProfile
            nickname={data.nickname}
            field="필라테스"
            career={data.career}
            address={data.address}
            followerCount={data.follower}
            isCertificated
          />
          <SectionHeader style={{marginTop: 16}} title="소개글" />
          <Text style={{fontSize: 16, lineHeight: 24, marginTop: 8}}>
            {data.intro}
          </Text>
          {/* 링크 섹션 임시 비활성화 */}
          {/* <RowView
            style={{
              marginTop: 20,
              justifyContent: 'space-between',
            }}>
            <SectionHeader title="링크" />
            <RowView>
              <IconButton source={iconPath.LINK_URL} />
              <IconButton
                source={iconPath.LINK_BLOG}
                style={{marginLeft: 16}}
              />
              <IconButton
                source={iconPath.LINK_BRUNCH}
                style={{marginLeft: 16}}
              />
            </RowView>
          </RowView> */}
          <SectionHeader title="채용 중" style={{marginTop: 20}} />
          <RecruitCard
            style={{marginTop: 8}}
            title="필라테스 강사님 모십니다."
            recruitType="파트"
            date="월,수,금"
            time="시간협의"
            bookmarked
          />
          {expanded && (
            <>
              <RecruitCard
                style={{marginTop: 8}}
                title="필라테스 강사님 모십니다."
                recruitType="파트"
                date="월,수,금"
                time="시간협의"
                bookmarked
              />
              <RecruitCard
                style={{marginTop: 8}}
                title="필라테스 강사님 모십니다."
                recruitType="파트"
                date="월,수,금"
                time="시간협의"
                bookmarked
              />
            </>
          )}
          <ExpandButton
            expanded={expanded}
            style={{marginTop: 8}}
            onPress={() => setExpanded(!expanded)}
          />
          <SectionHeader title="포트폴리오" style={{marginTop: 16}} />
          <RowView style={{flexWrap: 'wrap', marginTop: 8}}>
            {DUMMY_IMAGES.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  flexDirection: 'row',
                  width: (SCREEN_WIDTH - 38) / 3,
                  height: (SCREEN_WIDTH - 38) / 3,
                  margin: 1,
                }}>
                <Image source={item} style={{width: '100%', height: '100%'}} />
              </Pressable>
            ))}
          </RowView>
          <SectionHeader
            title="강사 후기"
            style={{marginTop: 20}}
            onPress={() => {}}
          />
          <View style={{marginTop: 8}}>
            {data.reputations?.map((reputation, index) => (
              <ReviewListItem
                key={index}
                nickname={reputation.evaluationMember.name}
                role="강사"
                timestamp={formatDate(reputation.createdAt)}
                content={reputation.comment}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;
