import { LoggedInParamList } from '@/../AppInner';
import { ROUTE } from '@/utils/constants/route';
import { iconPath } from '@/utils/iconPath';
import Modal from '@components/ModalSheet';
import TopFilter from '@components/TopFilter';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WHITE } from '@styles/colors';
import common from '@styles/common';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.MY.CENTER_RECRUITMENT>;

export const CenterRecruitmentScreen = ({}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState<any[]>([]);

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
      value: '진행 여부',
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
      value: '지원자 현황보기',
      job: () => {},
    },
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
        // navigation.navigate('ApplicantStatus');
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
        // navigation.navigate('ApplicantStatus');
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
        // navigation.navigate('ApplicantStatus');
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
          {DATA.map((item, index) => {
            return (
              <Pressable key={index} style={[common.basicBox, common.mv8]} onPress={item.job}>
                <View style={common.rowCenter}>
                  <Text style={[common.text_s, common.fcg]}>{item.date}</Text>
                  <Text style={[common.mh8, common.fcg]}>|</Text>
                  <Text style={[common.text_s, common.fcg]}>{item.status}</Text>
                </View>
                <Text style={[common.title, common.mv12]} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={[common.text_m, common.fwb]}>{item.field}</Text>
                <Pressable style={styles.kebabIcon} hitSlop={10} onPress={item.kebab}>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
  kebabIcon: { position: 'absolute', top: 16, right: 16 },
});

export default CenterRecruitmentScreen;
