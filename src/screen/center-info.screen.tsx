import ExpandButton from '@/components/Common/ExpandButton';
import IconButton from '@/components/Common/IconButton';
import RowView from '@/components/Common/RowView';
import SectionHeader from '@/components/Common/SectionHeader';
import CenterProfile from '@/components/Compound/CenterProfile';
import RecruitCard from '@/components/Compound/RecruitCard';
import ReviewListItem from '@/components/Compound/ReviewListItem';
import { useCompany } from '@/hooks/company/use-company';
import SRC from '@/lib/constants/assets';
import { SCREEN_WIDTH } from '@/lib/constants/common';
import { ROUTE } from '@/lib/constants/route';
import { iconPath } from '@/lib/iconPath';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoggedInParamList } from '../../AppInner';

const DUMMY_IMAGES = [
  require('@images/center_01.png'),
  require('@images/center_02.png'),
  require('@images/center_03.png'),
  require('@images/center_04.png'),
  require('@images/center_05.png'),
];

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.CENTER.INFO>;

export const CenterInfoScreen = ({ route }: Props) => {
  const companyQuery = useCompany(route.params.memberSeq);
  const centerInfo = companyQuery.data?.companyInfo;
  const recruits = companyQuery.data?.recruits;
  const reputations = companyQuery.data?.reputations;

  // TODO: api 연동 필요

  if (!companyQuery.data || !centerInfo) return null;

  return (
    <SafeAreaView edges={['left', 'right']} style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ margin: 16 }}>
          <Image
            style={{ width: '100%', height: 160, borderRadius: 8 }}
            source={SRC.IMAGES.CENTER01}
          />
          <View style={{ marginTop: 16 }}>
            <CenterProfile
              centerId={centerInfo.seq}
              name="링크 필라테스"
              isFavorite={false}
              favoriteCount="23"
              field="필라테스"
              address="서울 송파구"
            />
          </View>
          <SectionHeader title="소개글" style={{ marginTop: 16 }} />
          <Text style={{ fontSize: 16, marginTop: 8 }}>
            강남구 역삼동에 위치해있는 필라테스 센터입니다.
          </Text>
          <RowView style={{ marginTop: 24, justifyContent: 'space-between' }}>
            <SectionHeader title="링크" />
            <RowView>
              <IconButton source={iconPath.LINK_URL} />
              <IconButton source={iconPath.LINK_BLOG} style={{ marginLeft: 16 }} />
              <IconButton source={iconPath.LINK_BRUNCH} style={{ marginLeft: 16 }} />
            </RowView>
          </RowView>
          <SectionHeader title="채용 중" style={{ marginTop: 24 }} />
          <RecruitCard
            style={{ marginTop: 8 }}
            title="필라테스 강사님 모십니다."
            recruitType="파트"
            date="월,수,금"
            time="시간협의"
            bookmarked
          />
          <RecruitCard
            style={{ marginTop: 8 }}
            title="필라테스 강사님 모십니다."
            recruitType="파트"
            date="월,수,금"
            time="시간협의"
            bookmarked
          />
          <ExpandButton style={{ marginTop: 8 }} expanded={false} onPress={() => {}} />
          <SectionHeader title="센터 사진" style={{ marginTop: 24 }} />
          <RowView style={{ flexWrap: 'wrap', marginTop: 8 }}>
            {DUMMY_IMAGES.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  flexDirection: 'row',
                  width: (SCREEN_WIDTH - 38) / 3,
                  height: (SCREEN_WIDTH - 38) / 3,
                  margin: 1,
                }}>
                <Image source={item} style={{ width: '100%', height: '100%' }} />
              </Pressable>
            ))}
          </RowView>
          <SectionHeader style={{ marginTop: 24 }} title="센터 후기" onPress={() => {}} />
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
    </SafeAreaView>
  );
};
