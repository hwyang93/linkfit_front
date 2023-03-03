import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {WHITE} from '@styles/colors';
import ApplicantListItem from '@components/My/ApplicantListItem';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../../AppInner';
import {SetStateAction, useEffect, useState} from 'react';
import Modal from '@components/ModalSheet';
import TopFilter from '@components/TopFilter';

function ApplicantWaitingComponent({list}: any) {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);

  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState<any[]>([]);

  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    setApplications(list);
  }, [list]);
  const FILTER = [
    {
      value: '기간',
      job: () => {
        setModalTitle('기간');
        setModalData(MODAL);
        openModal();
      },
    },
  ];

  const MODAL = [
    {
      value: '일주일',
      job: () => {
        console.log('일주일 눌렸나요');
      },
    },
    {
      value: '1개월',
      job: () => {},
    },
    {
      value: '2개월',
      job: () => {},
    },
    {
      value: '3개월 이상',
      job: () => {},
    },
  ];
  const openModal = () => {
    setModalVisible(true);
  };
  return (
    <>
      <View style={{flex: 0, paddingHorizontal: 16, backgroundColor: WHITE}}>
        <TopFilter data={FILTER} />
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ApplicantListItem list={applications} />
        <View style={{paddingBottom: 24}} />
      </ScrollView>

      {/* 모달 */}
      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={modalTitle}
        modalData={modalData}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: WHITE,
  },
  kebabIcon: {position: 'absolute', top: 16, right: 16},
});

export default ApplicantWaitingComponent;
