import { LoggedInParamList } from '@/../AppInner';
import AppSafeAreaView from '@/components/\bLayout/AppSafeAreaView';
import FilterChip from '@/components/Common/FilterChip';
import InstructorListItem from '@/components/Compound/InstructorListItem';
import EmptySet from '@/components/EmptySet';
import Header from '@/components/Header/Header';
import HeaderLeft from '@/components/HeaderLeft';
import PositionFilterModal from '@/components/Modal/PositionFilterModal';
import { useInstructorList } from '@/hooks/instructor/use-instructor-list';
import useModal from '@/hooks/use-modal';
import { ROUTE } from '@/lib/constants/route';
import { getFilterChipLabel } from '@/lib/util';
import common from '@/styles/common';
import { Instructor } from '@/types/api/instructor.type';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { FlatList, Text, View } from 'react-native';

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.INSTRUCTOR.LIST>;

// TODO: 페이지네이션 추가
export const InstructorListScreen = ({ navigation }: Props) => {
  const [positionFilterValueList, setPositionFilterValueList] = useState<string[]>([]);

  const positionFilterModal = useModal();

  const params = {
    noPaging: false,
    curPage: 1,
    perPage: 10,
    fields: positionFilterValueList,
  };

  const instructorListQuery = useInstructorList(params);
  const instructorList = instructorListQuery.data;

  // TODO: 필터 기능 추가

  // TODO: 좋아요 기능 추가

  const onPositionFilterApply = (selectedOptions: string[]) => {
    setPositionFilterValueList(selectedOptions);
    positionFilterModal.close();
  };

  return (
    <AppSafeAreaView>
      <Header
        title="강사"
        leftContent={<HeaderLeft canGoBack />}
        rightContent={
          <FilterChip
            label={getFilterChipLabel(positionFilterValueList, '포지션')}
            rightIcon
            onPress={positionFilterModal.open}
          />
        }
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
      {positionFilterModal.visible && (
        <PositionFilterModal
          visible={positionFilterModal.visible}
          onDismiss={positionFilterModal.close}
          initialOptions={positionFilterValueList}
          onApply={onPositionFilterApply}
        />
      )}
    </AppSafeAreaView>
  );
};
