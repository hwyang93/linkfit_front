import BottomSheet from '@/components/Common/BottomSheet';
import BottomSheetOption from '@/components/Common/BottomSheetOption';
import FilterChip from '@/components/Common/FilterChip';
import FilterChipContainer from '@/components/Common/FilterChipContainer';
import useModal from '@/hooks/useModal';
import {FetchRecruitsResponse} from '@/types/api/recruit';
import {YesNoFlag} from '@/types/common';
import FILTER from '@/utils/constants/filter';
import {iconPath} from '@/utils/iconPath';
import {formatDate} from '@/utils/util';
import {fetchRecruits} from '@api/recruit';
import toast from '@hooks/toast';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import {useCallback, useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LoggedInParamList} from '../../../AppInner';

interface MyRecruitmentListItemProps {
  status: string;
  title: string;
  createdAt: string;
  position: string;
  onPress: () => void;
  onKebabIconPress: () => void;
}

const MyRecruitmentListItem: React.FC<MyRecruitmentListItemProps> = ({
  status,
  title,
  createdAt,
  position,
  onPress,
  onKebabIconPress,
}) => {
  return (
    <Pressable style={[common.basicBox, common.mv8]} onPress={onPress}>
      <View style={common.rowCenter}>
        <Text style={[common.text_s, common.fcg]}>{createdAt}</Text>
        <Text style={[common.mh8, common.fcg]}>|</Text>
        <Text style={[common.text_s, common.fcg]}>
          {status === 'ING' ? '진행중' : '마감'}
        </Text>
      </View>
      <Text style={[common.title, common.mv8]} numberOfLines={1}>
        {title}
      </Text>
      <Text style={[common.text_m, common.fwb]}>{position}</Text>
      <Pressable
        style={styles.kebabIcon}
        hitSlop={10}
        onPress={onKebabIconPress}>
        <Image source={iconPath.KEBAB} style={[common.size24]} />
      </Pressable>
    </Pressable>
  );
};

type Props = NativeStackScreenProps<LoggedInParamList, 'MyPost'>;

const MyRecruitmentScreen = ({navigation}: Props) => {
  const [recruits, setRecruits] = useState<FetchRecruitsResponse>([]);

  const [periodFilter, setPeriodFilter] = useState<string | null>(null);
  const [progressionFilter, setProgressionFilter] = useState<string | null>(
    null,
  );

  const periodModal = useModal();
  const progressionModal = useModal();
  const kebabModal = useModal();

  const getRecruits = useCallback(() => {
    const params = {isWriter: 'Y' as YesNoFlag};
    fetchRecruits(params)
      .then(({data}) => {
        setRecruits(data);
      })
      .catch(error => {
        toast.error({message: error.message});
      });
  }, []);

  const handlePeriodOptionPress = (option: string) => {
    setPeriodFilter(option);
    periodModal.close();
  };

  const handleProgressionOptionPress = (option: string) => {
    setProgressionFilter(option);
    progressionModal.close();
  };

  useEffect(() => {
    getRecruits();
  }, [getRecruits]);

  const handleMyRecruitmentListItemPress = (recruitSeq: number) => {
    navigation.navigate('ApplicantStatus', {
      recruitSeq,
    });
  };

  return (
    <SafeAreaView edges={['left', 'right']} style={styles.container}>
      <FilterChipContainer>
        <FilterChip label={periodFilter || '기간'} onPress={periodModal.open} />
        <FilterChip
          label={progressionFilter || '진행 상태'}
          style={{marginLeft: 8}}
          onPress={progressionModal.open}
        />
      </FilterChipContainer>
      <ScrollView
        contentContainerStyle={{marginHorizontal: 16, paddingBottom: 24}}
        showsVerticalScrollIndicator={false}>
        {recruits.map((recruit, index) => (
          <MyRecruitmentListItem
            key={index}
            title={recruit.title}
            position={recruit.position}
            status={recruit.status}
            createdAt={formatDate(recruit.createdAt)}
            onKebabIconPress={kebabModal.open}
            onPress={() => handleMyRecruitmentListItemPress(recruit.seq)}
          />
        ))}
      </ScrollView>
      <BottomSheet
        visible={periodModal.visible}
        onDismiss={periodModal.close}
        title="기간">
        {FILTER.PERIOD.map((option, index) => (
          <BottomSheetOption
            key={index}
            label={option}
            onPress={() => handlePeriodOptionPress(option)}
          />
        ))}
      </BottomSheet>
      <BottomSheet
        visible={progressionModal.visible}
        onDismiss={progressionModal.close}
        title="진행 상태">
        {FILTER.PROGRESSION.map((option, index) => (
          <BottomSheetOption
            key={index}
            label={option}
            onPress={() => handleProgressionOptionPress(option)}
          />
        ))}
      </BottomSheet>
      <BottomSheet
        visible={kebabModal.visible}
        onDismiss={kebabModal.close}
        title="더보기">
        <BottomSheetOption label="공고 수정하기" />
        <BottomSheetOption label="공고 복사하기" />
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  kebabIcon: {position: 'absolute', top: 16, right: 16},
});

export default MyRecruitmentScreen;
