import BottomSheet from '@/components/Common/BottomSheet';
import CTAButton from '@/components/Common/CTAButton';
import FilterChipList from '@/components/FilterChipList';
import useModal from '@/hooks/useModal';
import {FetchRecruitsResponse} from '@/types/api/recruit';
import {iconPath} from '@/utils/iconPath';
import {fetchRecruits} from '@api/recruit';
import FloatingLinkButton from '@components/FloatingLinkButton';
import FloatingWriteButton from '@components/FloatingWriteButton';
import RecruitComponent from '@components/RecruitComponent';
import toast from '@hooks/toast';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BLUE} from '@styles/colors';
import common from '@styles/common';
import {isAxiosError} from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LoggedInParamList} from '../../AppInner';

type FilterType = 'fields' | 'recruitType' | 'times';

type ModalData = {
  title: string;
  options: string[];
  icon: ImageSourcePropType[];
  iconPressed: ImageSourcePropType[];
};

interface FilterModalRowProps {
  selected?: boolean;
  iconSource?: ImageSourcePropType;
  text: string;
  onPress: (value: string) => void;
}

const FilterModalRow: React.FC<FilterModalRowProps> = ({
  selected = false,
  iconSource,
  text,
  onPress,
}) => {
  return (
    <View style={common.modalItemBox}>
      <Pressable
        style={[common.rowBetween, {width: '100%'}]}
        onPress={() => onPress(text)}>
        <View style={[common.rowCenter]}>
          {iconSource && (
            <Image style={[common.size24, common.mr10]} source={iconSource} />
          )}
          <Text style={[common.modalText, selected && {color: BLUE.DEFAULT}]}>
            {text}
          </Text>
        </View>
        {selected && <Image style={common.size24} source={iconPath.CHECK} />}
      </Pressable>
    </View>
  );
};

interface FilterModalContentProps {
  type: FilterType;
  modalData: ModalData;
  initialFilterValue: string[];
  onApplyFilterButtonPress: (type: FilterType, value: string[]) => void;
}

const FilterModalContent: React.FC<FilterModalContentProps> = ({
  type,
  modalData,
  initialFilterValue,
  onApplyFilterButtonPress,
}) => {
  const [filterValue, setFilterValue] = useState(initialFilterValue);

  const handleRowPress = (text: string) => {
    if (filterValue.includes(text)) {
      setFilterValue([]);
    } else {
      setFilterValue([text]);
    }
  };

  return (
    <View style={{marginHorizontal: 16}}>
      {modalData.options.map((item, index) => (
        <FilterModalRow
          key={index}
          text={item}
          selected={filterValue.includes(item)}
          onPress={handleRowPress}
          iconSource={
            filterValue.includes(item)
              ? modalData.iconPressed[index]
              : modalData.icon[index]
          }
        />
      ))}
      <CTAButton
        label="필터 적용"
        style={{marginTop: 40}}
        onPress={() => onApplyFilterButtonPress(type, filterValue)}
      />
    </View>
  );
};

type Props = NativeStackScreenProps<LoggedInParamList, 'RecruitList'>;

const RecruitListScreen = ({navigation}: Props) => {
  const [recruits, setRecruits] = useState<FetchRecruitsResponse>();
  const [modalType, setModalType] = useState<FilterType>('fields');
  const [filterValue, setFilterValue] = useState<Record<FilterType, string[]>>({
    fields: [],
    recruitType: [],
    times: [],
  });

  const {modalVisible, openModal, closeModal} = useModal();

  const getRecruits = useCallback(() => {
    const params = filterValue;
    fetchRecruits(params)
      .then(({data}) => {
        setRecruits(data);
      })
      .catch(error => {
        if (isAxiosError(error)) {
          toast.error({message: error.message});
        }
      });
  }, [filterValue]);

  const MODAL_DATA = {
    fields: {
      title: '포지션',
      options: ['전체', '필라테스', '요가'],
      icon: [iconPath.LINK, iconPath.PILATES, iconPath.YOGA],
      iconPressed: [iconPath.LINK_ON, iconPath.PILATES_ON, iconPath.YOGA_ON],
    },
    recruitType: {
      title: '채용형태',
      options: ['전임', '파트타임', '대강', '실장'],
      icon: [],
      iconPressed: [],
    },
    times: {
      title: '수업시간',
      options: ['오전', '오후', '전일', '협의'],
      icon: [],
      iconPressed: [],
    },
  };

  const FILTER_CHIP_DATA = [
    {
      value: 'fields',
      label: filterValue.fields[0] ? filterValue.fields[0] : '포지션',
    },
    {
      value: 'recruitType',
      label: filterValue.recruitType[0]
        ? filterValue.recruitType[0]
        : '채용형태',
    },
    {
      value: 'times',
      label: filterValue.times[0] ? filterValue.times[0] : '수업시간',
    },
  ];

  const handleChipPress = (value: string) => {
    setModalType(value as FilterType);
    openModal();
  };

  const handleApplyFilterButtonPress = (type: FilterType, value: string[]) => {
    setFilterValue(prev => ({
      ...prev,
      [type]: value,
    }));
    closeModal();
  };

  const handleFloatingWriteButtonPress = () => {
    navigation.navigate('JobOfferForm');
  };

  useEffect(() => {
    getRecruits();
  }, [getRecruits]);

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      {/* 구인공고 */}
      {/* 필터 영역 */}
      <FilterChipList
        chipData={FILTER_CHIP_DATA}
        onChipPress={handleChipPress}
      />
      <View style={{marginHorizontal: 16}}>
        {recruits && (
          <RecruitComponent
            list={recruits}
            title={'구인 공고'}
            text={'내 주변의 구인 공고를 만나보세요!'}
          />
        )}
      </View>
      {/* Floating Button */}
      <FloatingWriteButton
        bottom={88}
        icon={iconPath.PENCIL_W}
        job={handleFloatingWriteButtonPress}
      />
      {/* 페이지 이동 버튼 */}
      <FloatingLinkButton
        link={'RecruitMap'}
        title={'지도보기'}
        icon={iconPath.MAP}
      />
      <BottomSheet
        visible={modalVisible}
        onDismiss={closeModal}
        title={MODAL_DATA[modalType].title}
        content={
          <ScrollView
            style={{width: '100%'}}
            showsVerticalScrollIndicator={false}>
            <FilterModalContent
              type={modalType}
              modalData={MODAL_DATA[modalType]}
              initialFilterValue={filterValue[modalType]}
              onApplyFilterButtonPress={handleApplyFilterButtonPress}
            />
          </ScrollView>
        }
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default RecruitListScreen;
