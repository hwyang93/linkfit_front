import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {WHITE} from '@styles/colors';

import Modal from '@components/ModalSheet';
import {SetStateAction, useCallback, useEffect, useState} from 'react';
import TopFilter from '@components/TopFilter';
import common from '@styles/common';
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {LoggedInParamList} from '../../../AppInner';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fetchReceivePositionSuggests} from '@api/member';

function ReceivedSuggestionScreen() {
  const isFocused = useIsFocused();
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState<any[]>([]);
  const [suggests, setSuggests] = useState<any[]>([]);

  const getPositionSuggests = useCallback(() => {
    fetchReceivePositionSuggests()
      .then(({data}: any) => {
        setSuggests(data);
      })
      .catch((e: any) => {
        Alert.alert(e.message);
      });
  }, []);

  useEffect(() => {
    if (isFocused) {
      getPositionSuggests();
    }
  }, [isFocused]);

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
      value: '답변 여부',
      job: () => {
        setModalTitle('답변 여부');
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
      value: '답변 대기중',
      job: () => {
        console.log('답변 대기중 눌렸나요');
      },
    },
    {
      value: '답변 수락',
      job: () => {},
    },
    {
      value: '답변 거절',
      job: () => {},
    },
    {
      value: '제안 마감',
      job: () => {},
    },
  ];

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      {/* 필터 영역 */}
      <TopFilter data={FILTER} />
      {/* 필터 영역 */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 컨텐츠 영역 */}
        <View style={common.mb24}>
          {suggests.map((suggest, index) => {
            return (
              <Pressable
                key={index}
                style={[common.basicBox, common.mv8]}
                onPress={() =>
                  navigation.navigate('ReceivedSuggestionDetail', {
                    suggestSeq: suggest.seq,
                  })
                }>
                <Text style={[common.text_s, common.fcg, common.mb12]}>
                  {suggest.createdAt}
                </Text>
                <Text style={[common.title, common.mb12]} numberOfLines={1}>
                  {suggest.title}
                </Text>
                <Text style={[common.text_m, common.fwb, common.mb12]}>
                  {suggest.writer.type === 'COMPANY'
                    ? suggest.writer.company.companyName
                    : suggest.writer.name}
                </Text>
                <Text style={[common.text_s, common.fcg]}>
                  {!suggest.closingDate ? '채용시 마감' : suggest.closingDate} |{' '}
                  {suggest.status}
                </Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
});

export default ReceivedSuggestionScreen;
