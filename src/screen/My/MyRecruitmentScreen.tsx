import BottomSheet from '@/components/Common/BottomSheet';
import BottomSheetOption from '@/components/Common/BottomSheetOption';
import FilterChip from '@/components/Common/FilterChip';
import FilterChipContainer from '@/components/Common/FilterChipContainer';
import {useRecruitListQuery} from '@/hooks/recruit/useRecruitListQuery';
import useFilter from '@/hooks/useFilter';
import useModal from '@/hooks/useModal';
import FILTER from '@/utils/constants/filter';
import {iconPath} from '@/utils/iconPath';
import {formatDate} from '@/utils/util';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
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
  recruitId: number;
  status: string;
  title: string;
  createdAt: string;
  position: string;
  onPress: () => void;
}

const MyRecruitmentListItem: React.FC<MyRecruitmentListItemProps> = ({
  status,
  title,
  createdAt,
  position,
  onPress,
}) => {
  const kebabModal = useModal();

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
        onPress={kebabModal.open}>
        <Image source={iconPath.KEBAB} style={[common.size24]} />
      </Pressable>
      <BottomSheet
        visible={kebabModal.visible}
        onDismiss={kebabModal.close}
        title="더보기">
        <BottomSheetOption label="지원자 현황보기" />
        <BottomSheetOption label="공고 수정하기" />
        <BottomSheetOption label="공고 복사하기" />
      </BottomSheet>
    </Pressable>
  );
};

type Props = NativeStackScreenProps<LoggedInParamList, 'MyPost'>;

const MyRecruitmentScreen = ({navigation}: Props) => {
  const periodFilter = useFilter();
  const progressionFilter = useFilter();

  const periodModal = useModal();
  const progressionModal = useModal();

  const recruitListQuery = useRecruitListQuery({
    isWriter: 'Y',
    period: periodFilter.value,
    status: progressionFilter.value,
  });
  const recruits = recruitListQuery.data;

  const handlePeriodOptionPress = (option: string) => {
    periodFilter.setValue(option);
    periodModal.close();
  };

  const handleProgressionOptionPress = (option: string) => {
    progressionFilter.setValue(option);
    progressionModal.close();
  };

  const handleMyRecruitmentListItemPress = (recruitSeq: number) => {
    navigation.navigate('ApplicantStatus', {
      recruitSeq,
    });
  };

  return (
    <SafeAreaView edges={['left', 'right']} style={styles.container}>
      <FilterChipContainer>
        <FilterChip
          label={periodFilter.value || '기간'}
          onPress={periodModal.open}
          active={!!periodFilter.value}
          rightIcon
        />
        <FilterChip
          label={progressionFilter.value || '진행 여부'}
          style={{marginLeft: 8}}
          onPress={progressionModal.open}
          active={!!progressionFilter.value}
          rightIcon
        />
      </FilterChipContainer>
      <ScrollView
        contentContainerStyle={{marginHorizontal: 16, paddingBottom: 24}}
        showsVerticalScrollIndicator={false}>
        {recruits?.map((recruit, index) => (
          <MyRecruitmentListItem
            key={index}
            recruitId={recruit.seq}
            title={recruit.title}
            position={recruit.position}
            status={recruit.status}
            createdAt={formatDate(recruit.createdAt)}
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
            selected={option === periodFilter.value}
            onPress={() => handlePeriodOptionPress(option)}
          />
        ))}
      </BottomSheet>
      <BottomSheet
        visible={progressionModal.visible}
        onDismiss={progressionModal.close}
        title="진행 여부">
        {FILTER.PROGRESSION.map((option, index) => (
          <BottomSheetOption
            key={index}
            label={option}
            selected={option === progressionFilter.value}
            onPress={() => handleProgressionOptionPress(option)}
          />
        ))}
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
