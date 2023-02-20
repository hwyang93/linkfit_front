import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {WHITE} from '@styles/colors';

import Modal from '@components/ModalSheet';
import {SetStateAction, useState} from 'react';
import TopFilter from '@components/TopFilter';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../../AppInner';

function ReceivedSuggestionScreen() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
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
  const DATA = [
    {
      id: 1,
      registrationDate: '2022.12.09',
      title: '필라테스 전임 강사 제안 드립니다.',
      companyName: '링크 필라테스',
      endDate: '~2022.12.09 마감',
      status: '답변 대기 중',
      job: () => {},
    },
    {
      id: 2,
      registrationDate: '2023.2.09',
      title: '필라테스 전임 강사 제안을 드려볼까 합니다.',
      companyName: '비와이테스',
      endDate: '~2023.2.20 마감',
      status: '답변 완료',
      job: () => {},
    },
  ];

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      {/* 필터 영역 */}
      <TopFilter data={FILTER} />
      {/* 필터 영역 */}

      {/* 컨텐츠 영역 */}
      <View>
        {DATA.map((item, index) => {
          return (
            <Pressable
              key={index}
              style={[common.basicBox, common.mv8]}
              onPress={() => navigation.navigate('ReceivedSuggestionDetail')}>
              <Text style={[common.text_s, common.fcg, common.mb12]}>
                {item.registrationDate}
              </Text>
              <Text style={[common.title, common.mb12]} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={[common.text_m, common.fwb, common.mb12]}>
                {item.companyName}
              </Text>
              <Text style={[common.text_s, common.fcg]}>
                {item.endDate} | {item.status}
              </Text>
              <Pressable
                style={styles.kebabIcon}
                hitSlop={10}
                onPress={() => Alert.alert('text', '케밥 클릭')}>
                <Image source={iconPath.KEBAB} style={[common.KEBAB]} />
              </Pressable>
            </Pressable>
          );
        })}
      </View>
      {/* 컨텐츠 영역 */}

      {/* 모달 */}
      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={modalTitle}
        modalData={modalData}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },

  kebabIcon: {position: 'absolute', top: 16, right: 16},
});

export default ReceivedSuggestionScreen;
