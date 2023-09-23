import { useRecruitApplicationListQuery } from '@/hooks/recruit/useRecruitApplicationListQuery';
import useModal from '@/hooks/useModal';
import { RecruitStatus } from '@/types/api/recruit';
import { formatDate } from '@/utils/util';
import ApplicantListItem from '@components/My/ApplicantListItem';
import { WHITE } from '@styles/colors';
import { ScrollView, StyleSheet, View } from 'react-native';
import BottomSheet from '../Common/BottomSheet';
import BottomSheetOption from '../Common/BottomSheetOption';
import FilterChip from '../Common/FilterChip';

const FILTER = ['일주일', '1개월', '2개월', '3개월 이상'];

interface ApplicantWaitingTabProps {
  recruitId: number;
}

const ApplicantWaitingTab: React.FC<ApplicantWaitingTabProps> = ({ recruitId }) => {
  const { data } = useRecruitApplicationListQuery(recruitId);

  const waitingApplications = data?.recruitApply.filter((item) => {
    return item.status === RecruitStatus.Applied;
  });

  const modal = useModal();

  // const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  return (
    <>
      <View
        style={{
          paddingVertical: 8,
          paddingHorizontal: 16,
          backgroundColor: WHITE,
        }}>
        <FilterChip label="기간" style={{ marginTop: 8 }} rightIcon />
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {waitingApplications?.map((item, index) => (
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
        {FILTER.map((option, index) => (
          <BottomSheetOption key={index} label={option} />
        ))}
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: WHITE,
  },
  kebabIcon: { position: 'absolute', top: 16, right: 16 },
});

export default ApplicantWaitingTab;
