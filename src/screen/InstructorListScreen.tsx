import {LoggedInParamList} from '@/../AppInner';
import {FetchInstructorsResponse} from '@/types/api/instructor';
import {fetchInstructors} from '@api/instructor';
import InstructorComponent from '@components/InstructorComponent';
import TopFilter from '@components/TopFilter';
import toast from '@hooks/toast';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {isAxiosError} from 'axios';
import {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// const MODAL = [
//   {
//     icon: iconPath.LINK,
//     iconOn: iconPath.LINK_ON,
//     value: '전체',
//     selected: false,
//   },
//   {
//     icon: iconPath.PILATES,
//     iconOn: iconPath.PILATES_ON,
//     value: '필라테스',
//     selected: false,
//   },
//   {
//     icon: iconPath.YOGA,
//     iconOn: iconPath.YOGA_ON,
//     value: '요가',
//     selected: false,
//   },
// ];

const FILTER = [
  {
    key: 'position',
    value: '포지션',
  },
];

type Props = NativeStackScreenProps<LoggedInParamList, 'InstructorList'>;

const InstructorListScreen = ({}: Props) => {
  const [instructors, setInstructors] = useState<FetchInstructorsResponse>();

  const getInstructorsData = useCallback(async () => {
    try {
      const response = await fetchInstructors({
        noPaging: false,
        curPage: 1,
        perPage: 10,
      });
      setInstructors(response.data);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error({message: error.message});
      }
    }
  }, []);

  useEffect(() => {
    getInstructorsData();
  }, [getInstructorsData]);

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <View
        style={{
          paddingHorizontal: 16,
          paddingLeft: 0,
        }}>
        <TopFilter data={FILTER} />
      </View>
      {instructors && (
        <InstructorComponent
          list={instructors}
          title={'내 주변 강사'}
          text={'링크핏의 우수 강사를 확인하세요.'}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 16},
});

export default InstructorListScreen;
