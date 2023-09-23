import BottomSheet from '@/components/Common/BottomSheet';
import BottomSheetOption from '@/components/Common/BottomSheetOption';
import FilterChip from '@/components/Common/FilterChip';
import FilterChipContainer from '@/components/Common/FilterChipContainer';
import IconButton from '@/components/Common/IconButton';
import { useMyRecruitApplicationListQuery } from '@/hooks/recruit/useMyRecruitApplicationListQuery';
import useFilter from '@/hooks/useFilter';
import useModal from '@/hooks/useModal';
import { SCREEN_WIDTH } from '@/utils/constants/common';
import FILTER from '@/utils/constants/filter';
import { iconPath } from '@/utils/iconPath';
import { formatDate } from '@/utils/util';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BLUE, WHITE } from '@styles/colors';
import common, { width } from '@styles/common';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoggedInParamList } from '../../../AppInner';

const statusMap = {
  APPLY: '지원 완료',
  CANCEL: '지원 취소',
  OPEN: '열람',
  PASS: '합격',
  FAIL: '불합격',
} as const;

const columns2 = (SCREEN_WIDTH - 48) / 2;

interface MyApplicationItemProps {
  status: string;
  position: string;
  title: string;
  companyName: string;
  timestamp: string;
  onResumeIconPress: () => void;
  onPress: () => void;
}

const MyApplicationListItem: React.FC<MyApplicationItemProps> = ({
  status,
  position,
  title,
  companyName,
  timestamp,
  onResumeIconPress,
  onPress,
}) => {
  return (
    <Pressable style={styles.itemBox} onPress={onPress}>
      <View style={styles.imgBox}>
        <Image style={styles.img} source={require('assets/images/sample_02.png')} />
        <View style={[styles.statusBox]}>
          <Text style={[styles.statusText]}>{statusMap[status as keyof typeof statusMap]}</Text>
        </View>
      </View>
      <View>
        <Text style={[common.text]}>{position}</Text>
        <Text style={[common.text_m, common.fwb]} numberOfLines={1}>
          {title}
        </Text>
        <Text style={[common.text_s, common.fwb]}>{companyName}</Text>
        <Text style={common.text}>{timestamp} 지원</Text>
        <IconButton style={styles.resume} source={iconPath.RESUME} onPress={onResumeIconPress} />
      </View>
    </Pressable>
  );
};

type Props = NativeStackScreenProps<LoggedInParamList, 'ApplicationStatus'>;

const ApplicationStatusScreen = ({ navigation }: Props) => {
  const periodFilter = useFilter();
  const statusFilter = useFilter();

  const periodModal = useModal();
  const statusModal = useModal();

  const filterActive = !!periodFilter.value || !!statusFilter.value;

  const resetFilter = () => {
    periodFilter.reset();
    statusFilter.reset();
  };

  const myRecruitApplicationListQuery = useMyRecruitApplicationListQuery({
    period: periodFilter.value,
    status: statusFilter.value,
  });
  const applications = myRecruitApplicationListQuery.data;

  const handleListItemPress = (seq: number) => {
    navigation.navigate('JobPost', {
      recruitSeq: seq,
    });
  };

  const handlePeriodOptionPress = (option: string) => {
    periodFilter.setValue(option);
    periodModal.close();
  };

  const handleStatusOptionPress = (option: string) => {
    statusFilter.setValue(option);
    statusModal.close();
  };

  console.log('@value', periodFilter.value);
  console.log('@label', FILTER.PERIOD[periodFilter.value as keyof typeof FILTER.PERIOD]);

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
          label={
            periodFilter.value
              ? FILTER.PERIOD[periodFilter.value as keyof typeof FILTER.PERIOD]
              : '기간'
          }
          active={!!periodFilter.value}
          style={{ marginRight: 8 }}
          rightIcon
          onPress={periodModal.open}
        />
        <FilterChip
          label={
            statusFilter.value
              ? FILTER.STATUS[statusFilter.value as keyof typeof FILTER.STATUS]
              : '지원 상태'
          }
          active={!!statusFilter.value}
          rightIcon
          onPress={statusModal.open}
        />
      </FilterChipContainer>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}>
        <View style={{ flexWrap: 'wrap', flexDirection: 'row', paddingVertical: 8 }}>
          {applications?.map((item, index) => (
            <MyApplicationListItem
              key={index}
              status={item.status}
              position={item.recruit.position}
              title={item.recruit.title}
              companyName={item.recruit.companyName}
              timestamp={formatDate(item.createdAt)}
              onPress={() => handleListItemPress(item.recruit.seq)}
              onResumeIconPress={() =>
                navigation.navigate('ResumePreview', {
                  resumeSeq: item.resumeSeq,
                  applySeq: item.seq,
                  recruitSeq: item.recruitSeq,
                })
              }
            />
          ))}
        </View>
        <BottomSheet visible={periodModal.visible} onDismiss={periodModal.close} title="기간">
          <View>
            {Object.entries(FILTER.PERIOD).map(([value, label], index) => (
              <BottomSheetOption
                key={index}
                label={label}
                selected={periodFilter.value === value}
                onPress={() => handlePeriodOptionPress(value)}
              />
            ))}
          </View>
        </BottomSheet>
        <BottomSheet visible={statusModal.visible} onDismiss={statusModal.close} title="지원 상태">
          <View>
            {Object.entries(FILTER.STATUS).map(([value, label], index) => (
              <BottomSheetOption
                key={index}
                label={label}
                selected={statusFilter.value === value}
                onPress={() => handleStatusOptionPress(value)}
              />
            ))}
          </View>
        </BottomSheet>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  itemBox: { width: columns2, marginBottom: 16, marginHorizontal: 4 },
  imgBox: {
    marginBottom: 8,
    height: 104,
    borderRadius: 8,
  },
  img: { width: '100%', height: 104, borderRadius: 8 },
  statusBox: {
    zIndex: 10,
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: '#d7e0fd',
  },
  statusText: {
    fontSize: +width * 10,
    color: BLUE.DEFAULT,
  },
  resume: { position: 'absolute', top: 3, right: 0 },
});

export default ApplicationStatusScreen;
