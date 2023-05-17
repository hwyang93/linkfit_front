import {useState, useEffect, SetStateAction} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import InstructorComponent from '@components/InstructorComponent';
import {fetchInstructors} from '@api/instructor';
import {SafeAreaView} from 'react-native-safe-area-context';
import {iconPath} from '@/utils/iconPath';
import TopFilter from '@components/TopFilter';
import toast from '@hooks/toast';

function InstructorListScreen() {
  const [instructors, setInstructors] = useState(() => []);
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

  useEffect(() => {
    fetchInstructors()
      .then(({data}: any) => {
        setInstructors(data);
      })
      .catch((e: {message: any}) => {
        toast.error({message: e.message});
      });
  }, []);

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
      <InstructorComponent
        list={instructors}
        title={'내 주변 강사'}
        text={'링크핏의 우수 강사를 확인하세요.'}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 16},
});

export default InstructorListScreen;
