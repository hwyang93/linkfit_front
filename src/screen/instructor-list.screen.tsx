import { LoggedInParamList } from '@/../AppInner';
import FilterChip from '@/components/Common/FilterChip';
import InstructorListItem from '@/components/Compound/InstructorListItem';
import EmptySet from '@/components/EmptySet';
import Header from '@/components/Header/Header';
import HeaderLeft from '@/components/HeaderLeft';
import { useInstructorList } from '@/hooks/instructor/use-instructor-list';
import useFilter from '@/hooks/use-filter';
import { ROUTE } from '@/lib/constants/route';
import common from '@/styles/common';
import { Instructor } from '@/types/api/instructor.type';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.INSTRUCTOR.LIST>;

// TODO: 페이지네이션 추가
export const InstructorListScreen = ({ navigation }: Props) => {
  const positionFilter = useFilter('');

  const params = {
    noPaging: false,
    curPage: 1,
    perPage: 10,
  };

  const instructorListQuery = useInstructorList(params);
  const instructorList = instructorListQuery.data;

  // TODO: 필터 기능 추가

  // TODO: 좋아요 기능 추가

  return (
    <SafeAreaView edges={['top', 'bottom', 'left', 'right']} style={{ flex: 1 }}>
      <Header
        title="강사"
        leftContent={<HeaderLeft canGoBack />}
        rightContent={<FilterChip label="포지션" rightIcon />}
      />
      <View style={[common.mt16, { marginHorizontal: 16 }]}>
        <Text style={common.title}>내 주변 강사</Text>
        <Text style={common.text_m}>링크핏의 우수 강사를 확인하세요.</Text>
      </View>
      {instructorList && instructorList.length === 0 && (
        <View style={{ marginBottom: 32, flex: 1 }}>
          <EmptySet text="내 주변 강사가 없어요." />
        </View>
      )}
      {instructorList && instructorList.length > 0 && (
        <FlatList
          contentContainerStyle={{ margin: 16 }}
          data={instructorList}
          keyExtractor={(_, index) => index.toString()}
          decelerationRate="fast"
          snapToAlignment="start"
          renderItem={({ item }: { item: Instructor }) => (
            <InstructorListItem
              instructorId={item.seq}
              following={item.isFollow === 'Y'}
              avatarImageSrc={item.profileImage?.originFileUrl}
              field={item.field}
              career={item.career}
              nickname={item.nickname}
              address={item.address}
              followerCount={item.followerCount}
              isCertificated
              onAvatarPress={() =>
                navigation.navigate(ROUTE.INSTRUCTOR.PROFILE, {
                  memberSeq: item.seq,
                })
              }
            />
          )}
          ItemSeparatorComponent={() => <View style={common.separator} />}
        />
      )}
    </SafeAreaView>
  );
};