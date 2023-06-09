import {fetchRecruitApplicationsMy} from '@/api/recruit';
import BottomSheet from '@/components/Common/BottomSheet';
import BottomSheetOption from '@/components/Common/BottomSheetOption';
import FilterChip from '@/components/Common/FilterChip';
import IconButton from '@/components/Common/IconButton';
import toast from '@/hooks/toast';
import useModal from '@/hooks/useModal';
import {FetchRecruitApplicationsMyResponse} from '@/types/api/recruit';
import {PeriodFilter, StatusFilter} from '@/types/common';
import {SCREEN_WIDTH} from '@/utils/constants/common';
import {iconPath} from '@/utils/iconPath';
import {formatDate} from '@/utils/util';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BLUE, WHITE} from '@styles/colors';
import common, {width} from '@styles/common';
import {useEffect, useState} from 'react';
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

const PERIOD_FILTER_OPTIONS: PeriodFilter[] = [
  '일주일',
  '1개월',
  '2개월',
  '3개월 이상',
];

const STATUS_FILTER_OPTIONS: StatusFilter[] = [
  '지원 완료',
  '지원 취소',
  '열람',
  '합격',
  '불합격',
];

const statusMap: any = {
  APPLY: '지원 완료',
  CANCEL: '지원 취소',
  OPEN: '열람',
  PASS: '합격',
  FAIL: '불합격',
};

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
        <Image
          style={styles.img}
          source={require('assets/images/sample_02.png')}
        />
        <View style={[styles.statusBox]}>
          <Text style={[styles.statusText]}>{statusMap[status]}</Text>
        </View>
      </View>
      <View>
        <Text style={[common.text]}>{position}</Text>
        <Text style={[common.text_m, common.fwb]} numberOfLines={1}>
          {title}
        </Text>
        <Text style={[common.text_s, common.fwb]}>{companyName}</Text>
        <Text style={common.text}>{timestamp} 지원</Text>
        <IconButton
          style={styles.resume}
          source={iconPath.RESUME}
          onPress={onResumeIconPress}
        />
      </View>
    </Pressable>
  );
};

type Props = NativeStackScreenProps<LoggedInParamList, 'ApplicationStatus'>;

const ApplicationStatusScreen = ({navigation}: Props) => {
  const [applications, setApplications] =
    useState<FetchRecruitApplicationsMyResponse>([]);

  const [periodFilterValue, setPeriodFilterValue] =
    useState<PeriodFilter | null>(null);

  const [statusFilterValue, setStatusFilterValue] =
    useState<StatusFilter | null>(null);

  const {
    modalVisible: periodModalVisible,
    openModal: openPeriodModal,
    closeModal: closePeriodModal,
  } = useModal();

  const {
    modalVisible: statusModalVisible,
    openModal: openStatusModal,
    closeModal: closeStatusModal,
  } = useModal();

  const handleListItemPress = (seq: number) => {
    navigation.navigate('JobPost', {
      recruitSeq: seq,
    });
  };

  const handlePeriodOptionPress = (option: PeriodFilter) => {
    setPeriodFilterValue(option);
    closePeriodModal();
  };

  const handleStatusOptionPress = (option: StatusFilter) => {
    setStatusFilterValue(option);
    closeStatusModal();
  };

  useEffect(() => {
    fetchRecruitApplicationsMy()
      .then(({data}) => {
        setApplications(data);
      })
      .catch(error => {
        toast.error({message: error.message});
      });
  }, []);

  return (
    <SafeAreaView edges={['left', 'right']} style={styles.container}>
      <ScrollView
        contentContainerStyle={{marginHorizontal: 16, marginVertical: 8}}
        horizontal>
        <FilterChip
          label={periodFilterValue || '기간'}
          style={{marginRight: 8}}
          rightIcon
          onPress={openPeriodModal}
        />
        <FilterChip
          label={statusFilterValue || '지원 상태'}
          rightIcon
          onPress={openStatusModal}
        />
      </ScrollView>
      <ScrollView
        contentContainerStyle={{margin: 16}}
        showsVerticalScrollIndicator={false}>
        <View
          style={{flexWrap: 'wrap', flexDirection: 'row', paddingVertical: 8}}>
          {applications.map((item, index) => (
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
        <BottomSheet
          visible={periodModalVisible}
          onDismiss={closePeriodModal}
          title="기간">
          <View>
            {PERIOD_FILTER_OPTIONS.map((option, index) => (
              <BottomSheetOption
                key={index}
                label={option}
                selected={periodFilterValue === option}
                onPress={() => handlePeriodOptionPress(option)}
              />
            ))}
          </View>
        </BottomSheet>
        <BottomSheet
          visible={statusModalVisible}
          onDismiss={closeStatusModal}
          title="지원 상태">
          <View>
            {STATUS_FILTER_OPTIONS.map((option, index) => (
              <BottomSheetOption
                key={index}
                label={option}
                selected={statusFilterValue === option}
                onPress={() => handleStatusOptionPress(option)}
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
  itemBox: {width: columns2, marginBottom: 16, marginHorizontal: 4},
  imgBox: {
    marginBottom: 8,
    height: 104,
    borderRadius: 8,
  },
  img: {width: '100%', height: 104, borderRadius: 8},
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
  resume: {position: 'absolute', top: 3, right: 0},
});

export default ApplicationStatusScreen;
