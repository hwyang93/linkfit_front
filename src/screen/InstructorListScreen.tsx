import {FetchInstructorsResponse} from '@/types/api/instructor';
import {iconPath} from '@/utils/iconPath';
import {fetchInstructors} from '@api/instructor';
import InstructorComponent from '@components/InstructorComponent';
import TopFilter from '@components/TopFilter';
import toast from '@hooks/toast';
import {isAxiosError} from 'axios';
import {SetStateAction, useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function InstructorListScreen() {
  const [instructors, setInstructors] = useState<FetchInstructorsResponse>();
  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('');

  const [FILTER, setFILTER] = useState([
    {
      key: 'position',
      value: '포지션',
      job: () => {
        setSelectedFilter('position');
        setModalTitle('포지션');
        setModalData(MODAL);
        openModal();
      },
    },
  ]);
  const [MODAL, setMODAL] = useState([
    {
      icon: iconPath.LINK,
      iconOn: iconPath.LINK_ON,
      value: '전체',
      selected: false,
    },
    {
      icon: iconPath.PILATES,
      iconOn: iconPath.PILATES_ON,
      value: '필라테스',
      selected: false,
    },
    {
      icon: iconPath.YOGA,
      iconOn: iconPath.YOGA_ON,
      value: '요가',
      selected: false,
    },
  ]);
  const getInstructorsData = useCallback(async () => {
    try {
      const response = await fetchInstructors({
        noPaging: false,
        curPage: 1,
        perPage: 10,
      });
      console.log('@', response.pagingInfo);
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

  const openModal = () => {
    setModalVisible(true);
  };
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <View
        style={{
          paddingHorizontal: 16,
          paddingLeft: 0,
        }}>
        {/* 필터 영역 */}
        <TopFilter data={FILTER} />
        {/* 필터 영역 */}
      </View>
      {/*강사 리스트 컴포넌트 */}
      {instructors && (
        <InstructorComponent
          list={instructors}
          title={'내 주변 강사'}
          text={'링크핏의 우수 강사를 확인하세요.'}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 16},
});

export default InstructorListScreen;
