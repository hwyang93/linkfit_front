import {StyleSheet, Text, View} from 'react-native';
import {GRAY, WHITE} from '@styles/colors';

import Modal from '@components/ModalSheet';
import {SetStateAction, useState} from 'react';
import TopFilter from '@components/TopFilter';

function ReceivedSuggestionScreen() {
  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);

  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState<any[]>([]);

  const FILTER = [
    {
      value: '기간',
      job: () => {
        console.log('눌렸나요');
        setModalTitle('기간');
        setModalData(MODAL);
        openModal();
      },
    },
    {
      value: '지원 상태',
      job: () => {
        setModalTitle('지원상태');
        setModalData(MODAL2);
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
  const MODAL2 = [
    {
      value: '지원완료',
      job: () => {
        console.log('지원완료 눌렸나요');
      },
    },
    {
      value: '지원취소',
      job: () => {},
    },
    {
      value: '열람',
      job: () => {},
    },
    {
      value: '미열람',
      job: () => {},
    },
    {
      value: '합격',
      job: () => {},
    },
    {
      value: '불합격',
      job: () => {},
    },
  ];

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* 필터 영역 */}
      <TopFilter data={FILTER} />
      {/* 필터 영역 */}

      {/* 컨텐츠 영역 */}
      <View>
        <View>
          <Text />
        </View>
      </View>
      {/* 컨텐츠 영역 */}

      {/* 모달 */}
      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={modalTitle}
        modalData={modalData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
  filterBox: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingLeft: 12,
    paddingRight: 30,
    marginRight: 8,
    borderWidth: 1,
    borderColor: GRAY.LIGHT,
    borderRadius: 16,
  },
  filterText: {
    color: GRAY.DARK,
  },
  filterIcon: {
    position: 'absolute',
    top: 11,
    right: 12,
    width: 10,
    height: 6,
  },
});

export default ReceivedSuggestionScreen;
