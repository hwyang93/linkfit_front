import {fetchInstructor} from '@/api/instructor';
import ExpandButton from '@/components/Common/ExpandButton';
import RowView from '@/components/Common/RowView';
import SectionHeader from '@/components/Common/SectionHeader';
import InstructorProfile from '@/components/Compound/InstructorProfile';
import RecruitCard from '@/components/Compound/RecruitCard';
import ReviewListItem from '@/components/Compound/ReviewListItem';
import {FetchInstructorResponse} from '@/types/api/instructor';
import {SCREEN_WIDTH} from '@/utils/constants/common';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
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
  const [instructor, setInstructor] = useState<FetchInstructorResponse>();
  // const [reputation, setReputation] = useState<MemberReputationEntity[]>();

  // const memberInfo = useAppSelector(state => state.user);

  // const memberSeq = route.params.memberSeq;

  useEffect(() => {
    const loadData = async () => {
      await fetchInstructor(route.params.memberSeq)
        .then(({data}) => {
          setInstructor(data);
          // setReputation(data.reputations);
        })
        .catch(error => {
          console.log(error);
        });
    };
    loadData();
  }, [route.params.memberSeq]);

  return (
    <SafeAreaView edges={['left', 'right']} style={{flex: 1}}>
      {instructor && (
        <ScrollView contentContainerStyle={{padding: 16, paddingBottom: 32}}>
          <InstructorProfile
            nickname={instructor.nickname}
            field="필라테스"
            career={instructor.career}
            address={instructor.address}
            followerCount={instructor.follower}
            isCertificated
          />
          <SectionHeader style={{marginTop: 16}} title="소개글" />
          <Text style={{fontSize: 16, lineHeight: 24, marginTop: 8}}>
            강남구 역삼동에 위치해있는 필라테스 센터입니다.
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
            <ReviewListItem
              nickname="닉네임"
              role="강사"
              timestamp="2022.12.12"
              content="후기 내용입니다. 후기 내용입니다. 후기 내용입니다. 후기 내용입니다."
            />
            <ReviewListItem
              nickname="닉네임"
              role="강사"
              timestamp="2022.12.12"
              content="후기 내용입니다. 후기 내용입니다. 후기 내용입니다. 후기 내용입니다."
            />
            <ReviewListItem
              nickname="닉네임"
              role="강사"
              timestamp="2022.12.12"
              content="후기 내용입니다. 후기 내용입니다. 후기 내용입니다. 후기 내용입니다."
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;
