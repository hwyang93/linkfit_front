import BottomSheet from '@/components/Common/BottomSheet';
import BottomSheetOption from '@/components/Common/BottomSheetOption';
import CTAButton from '@/components/Common/CTAButton';
import FabContainer from '@/components/Common/FabContainer';
import FilterChip from '@/components/Common/FilterChip';
import FilterChipContainer from '@/components/Common/FilterChipContainer';
import FloatingActionButton from '@/components/Common/FloatingActionButton';
import Icon from '@/components/Common/Icon';
import RecruitListItem from '@/components/Compound/RecruitListItem';
import useModal from '@/hooks/useModal';
import {FetchRecruitsResponse} from '@/types/api/recruit';
import FILTER from '@/utils/constants/filter';
import {iconPath} from '@/utils/iconPath';
import {fetchRecruits} from '@api/recruit';
import toast from '@hooks/toast';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import common from '@styles/common';
import {isAxiosError} from 'axios';
import {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LoggedInParamList} from '../../AppInner';

const positionOptionIcon: {[key: string]: ImageSourcePropType} = {
  전체: iconPath.LINK,
  필라테스: iconPath.PILATES,
  요가: iconPath.YOGA,
};

const selectedPositionOptionIcon: {[key: string]: ImageSourcePropType} = {
  전체: iconPath.LINK_ON,
  필라테스: iconPath.PILATES_ON,
  요가: iconPath.YOGA_ON,
};

type Props = NativeStackScreenProps<LoggedInParamList, 'RecruitList'>;

const RecruitListScreen = ({navigation}: Props) => {
  const [recruits, setRecruits] = useState<FetchRecruitsResponse>();

  const [positionFilterValueList, setPositionFilterValueList] = useState<
    string[]
  >([]);
  const [recruitTypeFilterValueList, setRecruitTypeFilterValueList] = useState<
    string[]
  >([]);
  const [timeFilterValueList, setTimeFilterValueList] = useState([]);

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

  const handlePositionFilterApply = () => {
    setPositionFilterValueList([]);
    closePositionModal();
  };

  const handleRecruitTypeFilterApply = () => {
    setRecruitTypeFilterValueList([]);
    closeRecruitTypeModal();
  };

  const handleTimeFilterApply = () => {
    setTimeFilterValueList([]);
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
        <FilterChip label="포지션" rightIcon onPress={openPositionModal} />
        <FilterChip
          label="채용형태"
          style={{marginLeft: 8}}
          rightIcon
          onPress={openRecruitTypeModal}
        />
        <FilterChip
          label="수업시간"
          style={{marginLeft: 8}}
          rightIcon
          onPress={openTimeModal}
        />
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
      <FabContainer>
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
      </FabContainer>
      <BottomSheet
        visible={positionModalVisible}
        onDismiss={closePositionModal}
        title="포지션">
        {FILTER.FIELD.map((option, index) => (
          <BottomSheetOption
            key={index}
            label={option.label}
            selected={positionFilterValueList.includes(option.value)}
            leftIcon={
              <Icon
                source={
                  positionFilterValueList.includes(option.value)
                    ? selectedPositionOptionIcon[option.label]
                    : positionOptionIcon[option.label]
                }
              />
            }
            onPress={closePositionModal}
          />
        ))}
        <CTAButton
          style={{marginHorizontal: 16, marginTop: 32}}
          label="필터 적용"
          onPress={handlePositionFilterApply}
        />
      </BottomSheet>
      <BottomSheet
        visible={recruitTypeModalVisible}
        onDismiss={closeRecruitTypeModal}
        title="채용형태">
        {FILTER.RECRUIT_TYPE.map((option, index) => (
          <BottomSheetOption
            key={index}
            label={option.label}
            selected={recruitTypeFilterValueList.includes(option.value)}
            onPress={closeRecruitTypeModal}
          />
        ))}
        <CTAButton
          style={{marginHorizontal: 16, marginTop: 32}}
          label="필터 적용"
          onPress={handleRecruitTypeFilterApply}
        />
      </BottomSheet>
      <BottomSheet
        visible={timeModalVisible}
        onDismiss={closeTimeModal}
        title="수업시간">
        {FILTER.TIME.map((option, index) => (
          <BottomSheetOption
            key={index}
            label={option.label}
            onPress={closeTimeModal}
          />
        ))}
        <CTAButton
          style={{marginHorizontal: 16, marginTop: 32}}
          label="필터 적용"
          onPress={handleTimeFilterApply}
        />
      </BottomSheet>
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
  },
});

export default RecruitListScreen;
