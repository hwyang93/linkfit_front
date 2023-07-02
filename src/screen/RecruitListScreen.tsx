import BottomSheet from '@/components/Common/BottomSheet';
import BottomSheetOption from '@/components/Common/BottomSheetOption';
import CTAButton from '@/components/Common/CTAButton';
import FilterChip from '@/components/Common/FilterChip';
import FilterChipContainer from '@/components/Common/FilterChipContainer';
import FloatingActionButton from '@/components/Common/FloatingActionButton';
import RecruitListItem from '@/components/Compound/RecruitListItem';
import PositionFilterModal from '@/components/Modal/PositionFilterModal';
import RecruitTypeFilterModal from '@/components/Modal/RecruitTypeFilterModal';
import TimeFilterModal from '@/components/Modal/TimeFilterModal';
import useModal from '@/hooks/useModal';
import THEME from '@/styles/theme';
import {FetchRecruitsResponse} from '@/types/api/recruit';
import {iconPath} from '@/utils/iconPath';
import {getFilterChipLabel} from '@/utils/util';
import {fetchRecruits} from '@api/recruit';
import FABContainer from '@components/Common/FABContainer';
import toast from '@hooks/toast';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import common from '@styles/common';
import {isAxiosError} from 'axios';
import {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LoggedInParamList} from '../../AppInner';

type Props = NativeStackScreenProps<LoggedInParamList, 'RecruitList'>;

const RecruitListScreen = ({navigation}: Props) => {
  const [recruits, setRecruits] = useState<FetchRecruitsResponse>();

  const [positionFilterValueList, setPositionFilterValueList] = useState<
    string[]
  >([]);
  const [recruitTypeFilterValueList, setRecruitTypeFilterValueList] = useState<
    string[]
  >([]);
  const [timeFilterValueList, setTimeFilterValueList] = useState<string[]>([]);

  const positionModal = useModal();
  const recruitTypeModal = useModal();
  const timeModal = useModal();
  const viewModal = useModal();

  const resetChipVisible =
    positionFilterValueList.length > 0 ||
    recruitTypeFilterValueList.length > 0 ||
    timeFilterValueList.length > 0;

  const resetFilter = () => {
    setPositionFilterValueList([]);
    setRecruitTypeFilterValueList([]);
    setTimeFilterValueList([]);
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

  const handleViewFilterApply = () => {
    viewModal.close();
  };

  const getRecruits = useCallback(() => {
    const params = {
      fields: positionFilterValueList,
      time: timeFilterValueList,
      recruitType: recruitTypeFilterValueList,
    };

    fetchRecruits(params)
      .then(({data}) => {
        setRecruits(data);
      })
      .catch(error => {
        if (isAxiosError(error)) {
          toast.error({message: error.message});
        }
      });
  }, [
    positionFilterValueList,
    recruitTypeFilterValueList,
    timeFilterValueList,
  ]);

  useEffect(() => {
    getRecruits();
  }, [getRecruits]);

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <FilterChipContainer>
        {resetChipVisible && (
          <FilterChip
            variant="reset"
            label="초기화"
            style={{marginRight: 8}}
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
          style={{marginLeft: 8}}
          rightIcon
          onPress={recruitTypeModal.open}
        />
        <FilterChip
          active={timeFilterValueList.length > 0}
          label={getFilterChipLabel(timeFilterValueList, '수업시간')}
          style={{marginLeft: 8}}
          rightIcon
          onPress={timeModal.open}
        />
        {/* TODO: 조회순 필터 기능 추가 */}
        <FilterChip
          label="조회순"
          style={{marginLeft: 8}}
          rightIcon
          onPress={viewModal.open}
        />
      </FilterChipContainer>
      <View style={{marginHorizontal: 16}}>
        <FlatList
          data={recruits}
          decelerationRate="fast"
          renderItem={({item}) => (
            <View style={{marginBottom: 16}}>
              <RecruitListItem
                seq={item.seq}
                position={item.position}
                title={item.title}
                companyName={item.companyName}
                address={item.companyName}
                bookmarkChecked={item.isBookmark === 'Y'}
                imageSrc={item.writer?.profileImage?.originFileUrl}
                onPress={() =>
                  navigation.navigate('JobPost', {recruitSeq: item.seq})
                }
              />
            </View>
          )}
          snapToAlignment="start"
          numColumns={2}
          contentContainerStyle={{paddingBottom: 32}}
          ListHeaderComponent={
            <View style={{paddingVertical: 16}}>
              <Text style={[common.title]}>구인 공고</Text>
              <Text style={common.text_m}>
                내 주변의 구인 공고를 만나보세요!
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
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
      <PositionFilterModal
        visible={positionModal.visible}
        onDismiss={positionModal.close}
        initialOptions={positionFilterValueList}
        onApply={handlePositionFilterApply}
      />
      <RecruitTypeFilterModal
        visible={recruitTypeModal.visible}
        onDismiss={recruitTypeModal.close}
        initialOptions={recruitTypeFilterValueList}
        onApply={handleRecruitTypeFilterApply}
      />
      <TimeFilterModal
        visible={timeModal.visible}
        onDismiss={timeModal.close}
        initialOptions={timeFilterValueList}
        onApply={handleTimeFilterApply}
      />
      <BottomSheet
        visible={viewModal.visible}
        onDismiss={viewModal.close}
        title="조회순">
        <BottomSheetOption label="최신순" onPress={viewModal.close} />
        <BottomSheetOption label="조회순" onPress={viewModal.close} />
        <CTAButton
          style={{marginHorizontal: 16, marginTop: 32}}
          label="필터 적용"
          onPress={handleViewFilterApply}
        />
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

export default RecruitListScreen;
