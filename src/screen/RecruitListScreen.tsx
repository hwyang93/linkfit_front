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

  const {
    modalVisible: positionModalVisible,
    openModal: openPositionModal,
    closeModal: closePositionModal,
  } = useModal();

  const {
    modalVisible: recruitTypeModalVisible,
    openModal: openRecruitTypeModal,
    closeModal: closeRecruitTypeModal,
  } = useModal();

  const {
    modalVisible: timeModalVisible,
    openModal: openTimeModal,
    closeModal: closeTimeModal,
  } = useModal();
  const {
    modalVisible: viewModalVisible,
    openModal: openViewModal,
    closeModal: closeViewModal,
  } = useModal();

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
    closePositionModal();
  };

  const handleRecruitTypeFilterApply = (selectedOptions: string[]) => {
    setRecruitTypeFilterValueList(selectedOptions);
    closeRecruitTypeModal();
  };

  const handleTimeFilterApply = (selectedOptions: string[]) => {
    setTimeFilterValueList(selectedOptions);
    closeTimeModal();
  };

  const handleViewFilterApply = () => {
    closeViewModal();
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
          onPress={openPositionModal}
        />
        <FilterChip
          active={recruitTypeFilterValueList.length > 0}
          label={getFilterChipLabel(recruitTypeFilterValueList, '구인형태')}
          style={{marginLeft: 8}}
          rightIcon
          onPress={openRecruitTypeModal}
        />
        <FilterChip
          active={timeFilterValueList.length > 0}
          label={getFilterChipLabel(timeFilterValueList, '수업시간')}
          style={{marginLeft: 8}}
          rightIcon
          onPress={openTimeModal}
        />
        {/* TODO: 조회순 필터 기능 추가 */}
        <FilterChip
          label="조회순"
          style={{marginLeft: 8}}
          rightIcon
          onPress={openViewModal}
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
        visible={positionModalVisible}
        onDismiss={closePositionModal}
        initialOptions={positionFilterValueList}
        onApply={handlePositionFilterApply}
      />
      <RecruitTypeFilterModal
        visible={recruitTypeModalVisible}
        onDismiss={closeRecruitTypeModal}
        initialOptions={recruitTypeFilterValueList}
        onApply={handleRecruitTypeFilterApply}
      />
      <TimeFilterModal
        visible={timeModalVisible}
        onDismiss={closeTimeModal}
        initialOptions={timeFilterValueList}
        onApply={handleTimeFilterApply}
      />
      <BottomSheet
        visible={viewModalVisible}
        onDismiss={closeViewModal}
        title="조회순">
        <BottomSheetOption label="최신순" onPress={closeViewModal} />
        <BottomSheetOption label="조회순" onPress={closeViewModal} />
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
