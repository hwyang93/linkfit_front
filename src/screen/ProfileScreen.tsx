import {fetchInstructor} from '@/api/instructor';
import ExpandButton from '@/components/Common/ExpandButton';
import IconButton from '@/components/Common/IconButton';
import SectionHeader from '@/components/Common/SectionHeader';
import InstructorProfile from '@/components/Compound/InstructorProfile';
import RecruitCard from '@/components/Compound/RecruitCard';
import {useAppSelector} from '@/store';
import {MemberReputationEntity} from '@/types/api/entities';
import {FetchInstructorResponse} from '@/types/api/instructor';
import {iconPath} from '@/utils/iconPath';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {LoggedInParamList} from '../../AppInner';

type Props = NativeStackScreenProps<LoggedInParamList, 'Profile'>;

const ProfileScreen = ({navigation, route}: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [instructor, setInstructor] = useState<FetchInstructorResponse>();
  const [reputation, setReputation] = useState<MemberReputationEntity[]>();

  const memberInfo = useAppSelector(state => state.user);

  const memberSeq = route.params.memberSeq;

  useEffect(() => {
    const loadData = async () => {
      await fetchInstructor(route.params.memberSeq)
        .then(({data}) => {
          setInstructor(data);
          setReputation(data.reputations);
        })
        .catch(error => {
          console.log(error);
        });
    };
    loadData();
  }, [route.params.memberSeq]);

  return (
    <SafeAreaView style={{flex: 1}}>
      {instructor && (
        <ScrollView contentContainerStyle={{padding: 16}}>
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
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <SectionHeader title="링크" />
            <View style={{flexDirection: 'row'}}>
              <IconButton source={iconPath.LINK_URL} />
              <IconButton
                source={iconPath.LINK_BLOG}
                style={{marginLeft: 16}}
              />
              <IconButton
                source={iconPath.LINK_BRUNCH}
                style={{marginLeft: 16}}
              />
            </View>
          </View>
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
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;
