import { useRecruitApplicationList } from '@/hooks/recruit/use-recruit-application-list';
import useFilter from '@/hooks/use-filter';
import useModal from '@/hooks/use-modal';
import FILTER from '@/lib/constants/filter';
import { formatDate } from '@/lib/util';
import { RecruitStatus } from '@/types/api/recruit.type';
import ApplicantListItem from '@components/My/ApplicantListItem';
import { WHITE } from '@styles/colors';
import { ScrollView, StyleSheet, View } from 'react-native';
import BottomSheet from '../Common/BottomSheet';
import BottomSheetOption from '../Common/BottomSheetOption';
import FilterChip from '../Common/FilterChip';
import RowView from '../Common/RowView';

interface ApplicantFinishTabProps {
  recruitId: number;
}

const ApplicantFinishTab: React.FC<ApplicantFinishTabProps> = ({ recruitId }) => {
  const { data } = useRecruitApplicationList(recruitId);

  const finishedApplications = data?.recruitApply.filter((item) => {
    return item.status !== RecruitStatus.Applied;
  });

  const periodFilter = useFilter();

  const filterActive = !!periodFilter.value;

  const resetFilter = () => {
    periodFilter.reset();
  };

  const modal = useModal();

  return (
    <>
      <View
        style={{
          paddingVertical: 8,
          paddingHorizontal: 16,
          backgroundColor: WHITE,
        }}>
        <RowView style={{ marginTop: 8 }}>
          {filterActive && (
            <FilterChip
              label="초기화"
              style={{ marginRight: 8 }}
              variant="reset"
              onPress={resetFilter}
            />
          )}
          <FilterChip
            active={!!periodFilter.value}
            label={FILTER.PERIOD[periodFilter.value as keyof typeof FILTER.PERIOD] || '기간'}
            rightIcon
            onPress={modal.open}
          />
        </RowView>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {finishedApplications?.map((item, index) => (
          <ApplicantListItem
            key={index}
            applySeq={item.seq}
            createdAt={formatDate(item.createdAt)}
            recruitSeq={item.recruitSeq}
            resumeSeq={item.resumeSeq}
            resumeTitle={item.resume?.title}
            status={item.status}
          />
        ))}
        <View style={{ paddingBottom: 24 }} />
      </ScrollView>
      <BottomSheet visible={modal.visible} onDismiss={modal.close} title="기간">
        {Object.entries(FILTER.PERIOD).map(([value, label], index) => (
          <BottomSheetOption
            key={index}
            label={label}
            onPress={() => {
              periodFilter.setValue(value);
              modal.close();
            }}
            selected={periodFilter.value === value}
          />
        ))}
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  kebabIcon: { position: 'absolute', right: 16, top: 16 },
});

export default ApplicantFinishTab;
