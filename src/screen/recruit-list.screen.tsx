import BottomSheet from '@/components/Common/BottomSheet';
import BottomSheetOption from '@/components/Common/BottomSheetOption';
import FilterChip from '@/components/Common/FilterChip';
import FilterChipContainer from '@/components/Common/FilterChipContainer';
import FloatingActionButton from '@/components/Common/FloatingActionButton';
import RecruitListItem from '@/components/Compound/RecruitListItem';
import EmptySet from '@/components/EmptySet';
import PositionFilterModal from '@/components/Modal/PositionFilterModal';
import RecruitTypeFilterModal from '@/components/Modal/RecruitTypeFilterModal';
import TimeFilterModal from '@/components/Modal/TimeFilterModal';
import { useRecruitList } from '@/hooks/recruit/use-recruit-list';
import useModal from '@/hooks/use-modal';
import { ROUTE } from '@/lib/constants/route';
import { SORT } from '@/lib/constants/sort';
import { iconPath } from '@/lib/iconPath';
import { getFilterChipLabel } from '@/lib/util';
import THEME from '@/styles/theme';
import FABContainer from '@components/Common/FABContainer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import common from '@styles/common';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoggedInParamList } from '../../AppInner';

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.RECRUIT.LIST>;

export const RecruitListScreen = ({ navigation }: Props) => {
  const [positionFilterValueList, setPositionFilterValueList] = useState<string[]>([]);
  const [recruitTypeFilterValueList, setRecruitTypeFilterValueList] = useState<string[]>([]);
  const [timeFilterValueList, setTimeFilterValueList] = useState<string[]>([]);
  const [viewFilterValue, setViewFilterValue] = useState<string | null>(null);

  const params = {
    fields: positionFilterValueList,
    time: timeFilterValueList,
    recruitType: recruitTypeFilterValueList,
    view: viewFilterValue,
  };

  const recruitListQuery = useRecruitList(params);
  const recruitList = recruitListQuery.data;

  console.log('@', recruitList);

  const positionModal = useModal();
  const recruitTypeModal = useModal();
  const timeModal = useModal();
  const viewModal = useModal();

  const resetChipVisible =
    positionFilterValueList.length > 0 ||
    recruitTypeFilterValueList.length > 0 ||
    timeFilterValueList.length > 0 ||
    viewFilterValue;

  const resetFilter = () => {
    setPositionFilterValueList([]);
    setRecruitTypeFilterValueList([]);
    setTimeFilterValueList([]);
    setViewFilterValue(null);
  };

  const handlePositionFilterApply = (selectedOptions: string[]) => {
    setPositionFilterValueList(selectedOptions);
    positionModal.close();
  };

  const handleRecruitTypeFilterApply = (selectedOptions: string[]) => {
    setRecruitTypeFilterValueList(selectedOptions);
    recruitTypeModal.close();
  };

  const handleTimeFilterApply = (selectedOptions: string[]) => {
    setTimeFilterValueList(selectedOptions);
    timeModal.close();
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <FilterChipContainer>
        {resetChipVisible && (
          <FilterChip
            variant="reset"
            label="초기화"
            style={{ marginRight: 8 }}
            onPress={resetFilter}
          />
        )}
        <FilterChip
          active={positionFilterValueList.length > 0}
          label={getFilterChipLabel(positionFilterValueList, '포지션')}
          rightIcon
          onPress={positionModal.open}
        />
        <FilterChip
          active={recruitTypeFilterValueList.length > 0}
          label={getFilterChipLabel(recruitTypeFilterValueList, '구인형태')}
          style={{ marginLeft: 8 }}
          rightIcon
          onPress={recruitTypeModal.open}
        />
        <FilterChip
          active={timeFilterValueList.length > 0}
          label={getFilterChipLabel(timeFilterValueList, '수업시간')}
          style={{ marginLeft: 8 }}
          rightIcon
          onPress={timeModal.open}
        />
        <FilterChip
          active={!!viewFilterValue}
          label={SORT[viewFilterValue as keyof typeof SORT] || '조회순'}
          style={{ marginLeft: 8 }}
          rightIcon
          onPress={viewModal.open}
        />
      </FilterChipContainer>
      <View style={{ paddingVertical: 16, marginHorizontal: 16 }}>
        <Text style={[common.title]}>구인 공고</Text>
        <Text style={common.text_m}>내 주변의 구인 공고를 만나보세요!</Text>
      </View>
      <View style={{ marginHorizontal: 16, flex: 1 }}>
        {recruitList && recruitList.length > 0 && (
          <FlatList
            data={recruitList}
            decelerationRate="fast"
            renderItem={({ item }) => (
              <View style={{ marginBottom: 16 }}>
                <RecruitListItem
                  seq={item.seq}
                  position={item.position}
                  title={item.title}
                  companyName={item.companyName}
                  address={item.companyName}
                  bookmarkChecked={item.isBookmark === 'Y'}
                  imageSrc={item.writer?.profileImage?.originFileUrl}
                  onPress={() => navigation.navigate('JobPost', { recruitSeq: item.seq })}
                />
              </View>
            )}
            snapToAlignment="start"
            numColumns={2}
            contentContainerStyle={{ paddingBottom: 32, flex: 1 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      {recruitList && recruitList.length === 0 && (
        <View style={{ flex: 1, marginBottom: 32 }}>
          <EmptySet text="등록된 구인 공고가 없어요." />
        </View>
      )}
      <FABContainer>
        <FloatingActionButton
          iconSource={iconPath.PENCIL_W}
          onPress={() => navigation.navigate('JobOfferForm')}
        />
        {/* 임시 비활성화 */}
        {/* <FloatingActionButton
          style={{marginTop: 16}}
          iconSource={iconPath.MAP}
          variant="secondary"
          label="지도보기"
          onPress={() => navigation.navigate('RecruitMap')}
        /> */}
      </FABContainer>
      {positionModal.visible && (
        <PositionFilterModal
          visible={positionModal.visible}
          onDismiss={positionModal.close}
          initialOptions={positionFilterValueList}
          onApply={handlePositionFilterApply}
        />
      )}
      {recruitTypeModal.visible && (
        <RecruitTypeFilterModal
          visible={recruitTypeModal.visible}
          onDismiss={recruitTypeModal.close}
          initialOptions={recruitTypeFilterValueList}
          onApply={handleRecruitTypeFilterApply}
        />
      )}
      {timeModal.visible && (
        <TimeFilterModal
          visible={timeModal.visible}
          onDismiss={timeModal.close}
          initialOptions={timeFilterValueList}
          onApply={handleTimeFilterApply}
        />
      )}
      {/* {viewModal.visible && (
        <ViewFilterModal
          visible={viewModal.visible}
          onDismiss={viewModal.close}
          initialOptions={viewFilterValue}
          onApply={handleViewFilterApply}
        />
      )} */}
      <BottomSheet visible={viewModal.visible} onDismiss={viewModal.close}>
        {Object.entries(SORT).map(([value, label], index) => (
          <BottomSheetOption
            key={index}
            label={label}
            selected={viewFilterValue === value}
            onPress={() => {
              setViewFilterValue(value);
              viewModal.close();
            }}
          />
        ))}
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.WHITE,
  },
});
