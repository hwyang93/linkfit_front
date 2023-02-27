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

import common from '@styles/common';
import TopFilter from '@components/TopFilter';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../../AppInner';
import {SetStateAction, useCallback, useEffect, useState} from 'react';
import Modal from '@components/ModalSheet';
import {iconPath} from '@util/iconPath';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fetchRecruits} from '@api/recruit';

function MyRecruitmentScreen() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState<any[]>([]);
  const [recruits, setRecruits] = useState<any[]>([]);

  const getRecruits = useCallback(() => {
    const params = {isWriter: 'Y'};
    fetchRecruits(params)
      .then(({data}: any) => {
        setRecruits(data);
      })
      .catch((e: any) => {
        Alert.alert(e.message);
      });
  }, []);

  useEffect(() => {
    getRecruits();
  }, []);

  const FILTER = [
    {
      value: '기간',
      job: () => {
        setModalTitle('기간');
        setModalData(MODAL);
        openModal();
      },
    },
    {
      value: '지원 상태',
      job: () => {
        setModalTitle('진행 여부');
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
      value: '진행 중',
      job: () => {
        console.log('지원완료 눌렸나요');
      },
    },
    {
      value: '마감',
      job: () => {},
    },
  ];
  const MODAL3 = [
    {
      value: '공고 수정하기',
      job: () => {},
    },
    {
      value: '공고 복사하기',
      job: () => {},
    },
  ];
  const DATA = [
    {
      id: 1,
      date: '2022.12.09 작성',
      status: '진행 중',
      title: '공고 제목',
      field: '필라테스',
      job: () => {
        navigation.navigate('ApplicantStatus');
      },
      kebab: () => {
        clickKebab();
      },
    },
    {
      id: 2,
      date: '2022.1.09 작성',
      status: '진행 중',
      title: '공고 제목',
      field: '필라테스',
      job: () => {
        navigation.navigate('ApplicantStatus');
      },
      kebab: () => {
        clickKebab();
      },
    },
    {
      id: 3,
      date: '2022.2.09 작성',
      status: '진행 중',
      title: '오늘부터 우리는 같이 일하는 건가요',
      field: '요가',
      job: () => {
        navigation.navigate('ApplicantStatus');
      },
      kebab: () => {
        clickKebab();
      },
    },
  ];

  const openModal = () => {
    setModalVisible(true);
  };
  const clickKebab = () => {
    setModalTitle('더보기');
    setModalData(MODAL3);
    openModal();
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      {/* 필터 영역 */}
      <TopFilter data={FILTER} />
      {/* 필터 영역 */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 컨텐츠 영역 */}
        <View style={common.mb24}>
          {recruits.map((recruit, index) => {
            return (
              <Pressable
                key={index}
                style={[common.basicBox, common.mv8]}
                onPress={() => {
                  navigation.navigate('ApplicantStatus', {
                    recruitSeq: recruit.seq,
                  });
                }}>
                <View style={common.rowCenter}>
                  <Text style={[common.text_s, common.fcg]}>
                    {recruit.createdAt}
                  </Text>
                  <Text style={[common.mh8, common.fcg]}>|</Text>
                  <Text style={[common.text_s, common.fcg]}>
                    {recruit.status === 'ING' ? '진행중' : '마감'}
                  </Text>
                </View>
                <Text style={[common.title, common.mv12]} numberOfLines={1}>
                  {recruit.title}
                </Text>
                <Text style={[common.text_m, common.fwb]}>
                  {recruit.position}
                </Text>
                <Pressable
                  style={styles.kebabIcon}
                  hitSlop={10}
                  onPress={() => {}}>
                  <Image source={iconPath.KEBAB} style={[common.size24]} />
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
    </SafeAreaView>
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

export default MyRecruitmentScreen;
