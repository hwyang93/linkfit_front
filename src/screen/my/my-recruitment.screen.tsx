import BottomSheet from '@/components/Common/BottomSheet';
import BottomSheetOption from '@/components/Common/BottomSheetOption';
import FilterChip from '@/components/Common/FilterChip';
import FilterChipContainer from '@/components/Common/FilterChipContainer';
import { useRecruitList } from '@/hooks/recruit/use-recruit-list';
import { useAppNavigation } from '@/hooks/use-app-navigation';
import useFilter from '@/hooks/use-filter';
import useModal from '@/hooks/use-modal';
import FILTER from '@/lib/constants/filter';
import { ROUTE } from '@/lib/constants/route';
import { iconPath } from '@/lib/iconPath';
import { formatDate } from '@/lib/util';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WHITE } from '@styles/colors';
import common from '@styles/common';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoggedInParamList } from '../../../AppInner';

interface MyRecruitmentListItemProps {
  recruitId: number;
  status: string;
  title: string;
  createdAt: string;
  position: string;
  onPress: () => void;
}

const MyRecruitmentListItem: React.FC<MyRecruitmentListItemProps> = ({
  recruitId,
  status,
  title,
  createdAt,
  position,
  onPress,
}) => {
  const kebabModal = useModal();

  const navigation = useAppNavigation();

  const onEditButtonPress = () => {
    navigation.navigate(ROUTE.RECRUIT.EDIT, { recruitId });
    kebabModal.close();
  };

  return (
    <Pressable style={[common.basicBox, common.mv8]} onPress={onPress}>
      <View style={common.rowCenter}>
        <Text style={[common.text_s, common.fcg]}>{createdAt}</Text>
        <Text style={[common.mh8, common.fcg]}>|</Text>
        <Text style={[common.text_s, common.fcg]}>{status === 'ING' ? '진행중' : '마감'}</Text>
      </View>
      <Text style={[common.title, common.mv8]} numberOfLines={1}>
        {title}
      </Text>
      <Text style={[common.text_m, common.fwb]}>{position}</Text>
      <Pressable style={styles.kebabIcon} hitSlop={10} onPress={kebabModal.open}>
        <Image source={iconPath.KEBAB} style={common.size24} />
      </Pressable>
      <BottomSheet visible={kebabModal.visible} onDismiss={kebabModal.close} title="더보기">
        <BottomSheetOption label="지원자 현황보기" />
        <BottomSheetOption label="공고 수정하기" onPress={onEditButtonPress} />
        {/* <BottomSheetOption label="공고 복사하기" /> */}
      </BottomSheet>
    </Pressable>
  );
};

// TODO: route 이름 매칭
type Props = NativeStackScreenProps<LoggedInParamList, 'MyPost'>;

export const MyRecruitmentScreen = ({ navigation }: Props) => {
  const periodFilter = useFilter();

  const progressionFilter = useFilter();

  const periodModal = useModal();
  const progressionModal = useModal();

  const recruitListQuery = useRecruitList({
    isWriter: 'Y',
    period: periodFilter.value,
    status: progressionFilter.value,
  });
  const recruits = recruitListQuery.data;

  const filterActive = !!periodFilter.value || !!progressionFilter.value;

  const resetFilter = () => {
    periodFilter.reset();
    progressionFilter.reset();
  };

  const handlePeriodOptionPress = (option: string) => {
    periodFilter.setValue(option);
    periodModal.close();
  };

  const handleProgressionOptionPress = (option: string) => {
    progressionFilter.setValue(option);
    progressionModal.close();
  };

  const handleMyRecruitmentListItemPress = (recruitSeq: number) => {
    navigation.navigate(ROUTE.MY.APPLICANT_STATUS, {
      recruitSeq,
    });
  };

  const periodFilterChipLabel = periodFilter.value
    ? FILTER.PERIOD[periodFilter.value as keyof typeof FILTER.PERIOD]
    : '기간';

  const progressionFilterChipLabel = progressionFilter.value
    ? FILTER.PROGRESSION[progressionFilter.value as keyof typeof FILTER.PROGRESSION]
    : '진행 여부';

  return (
    <SafeAreaView edges={['left', 'right']} style={styles.container}>
      <FilterChipContainer>
        {filterActive && (
          <FilterChip
            label="초기화"
            variant="reset"
            style={{ marginRight: 8 }}
            onPress={resetFilter}
          />
        )}
        <FilterChip
          label={periodFilterChipLabel}
          onPress={periodModal.open}
          active={!!periodFilter.value}
          rightIcon
        />
        <FilterChip
          label={progressionFilterChipLabel}
          style={{ marginLeft: 8 }}
          onPress={progressionModal.open}
          active={!!progressionFilter.value}
          rightIcon
        />
      </FilterChipContainer>
      <ScrollView
        contentContainerStyle={{ marginHorizontal: 16, paddingBottom: 24 }}
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
      <BottomSheet visible={periodModal.visible} onDismiss={periodModal.close} title="기간">
        {Object.entries(FILTER.PERIOD).map(([value, label], index) => (
          <BottomSheetOption
            key={index}
            label={label}
            selected={value === periodFilter.value}
            onPress={() => handlePeriodOptionPress(value)}
          />
        ))}
      </BottomSheet>
      <BottomSheet
        visible={progressionModal.visible}
        onDismiss={progressionModal.close}
        title="진행 여부">
        {Object.entries(FILTER.PROGRESSION).map(([value, label], index) => (
          <BottomSheetOption
            key={index}
            label={label}
            selected={value === progressionFilter.value}
            onPress={() => handleProgressionOptionPress(value)}
          />
        ))}
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    flex: 1,
  },
  kebabIcon: { position: 'absolute', right: 16, top: 16 },
});
