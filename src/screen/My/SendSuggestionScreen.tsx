import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {BLUE, GRAY, WHITE} from '@styles/colors';
import Modal from '@components/ModalSheet';
import {SetStateAction, useState} from 'react';
import TopFilter from '@components/TopFilter';
import common from '@styles/common';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../../AppInner';
import {SafeAreaView} from 'react-native-safe-area-context';
import {iconPath} from '@util/iconPath';

function SendSuggestionScreen() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);

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
      job: () => {},
    },
    {
      value: '답변 완료',
      job: () => {},
    },
    {
      value: '제안 마감',
      job: () => {},
    },
  ];
  const MODAL3 = [
    {
      value: '제안 수정하기',
      job: () => {},
    },
    {
      value: '제안 취소하기',
      job: () => {},
    },
  ];
  const DATA = [
    {
      id: 1,
      registrationDate: '2022.12.09 제안',
      image: require('@images/thumbnail.png'),
      title: '제안 제목',
      nickname: '닉네임',
      field: '필라테스',
      career: '3년',
      location: '서울 · 송파구',
      endDate: '~2022.12.09 마감',
      status: '답변 완료',
      answer: '수락',
      job: () => {
        clickKebab();
      },
    },
    {
      id: 2,
      registrationDate: '2022.12.09 제안',
      image: require('@images/thumbnail.png'),
      title: '제안 제목',
      nickname: '닉네임',
      field: '필라테스',
      career: '3년',
      location: '서울 · 송파구',
      endDate: '~2022.12.09 마감',
      status: '답변 완료',
      answer: '거절',
      job: () => {
        clickKebab();
      },
    },
    {
      id: 3,
      registrationDate: '2022.12.09 제안',
      image: require('@images/thumbnail.png'),
      title: '제안 제목',
      nickname: '닉네임',
      field: '필라테스',
      career: '3년',
      location: '서울 · 송파구',
      endDate: '~2022.12.09 마감',
      status: '답변 대기중',
      answer: null,
      job: () => {
        clickKebab();
      },
    },
    {
      id: 4,
      registrationDate: '2022.12.09 제안',
      image: require('@images/thumbnail.png'),
      title: '제안 제목',
      nickname: '닉네임',
      field: '필라테스',
      career: '3년',
      location: '서울 · 송파구',
      endDate: '~2022.12.09 마감',
      status: '제안 마감',
      answer: null,
      job: () => {
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
        {DATA.map((item, index) => {
          return (
            <Pressable
              key={index}
              style={[common.basicBox, common.mv8]}
              onPress={() => navigation.navigate('SendSuggestionDetail')}>
              <Text style={[common.text_s, common.fcg, common.mb12]}>
                {item.registrationDate}
              </Text>
              <Text style={[common.title, common.mb12]} numberOfLines={1}>
                {item.title}
              </Text>

              <View style={[common.row, common.mb12]}>
                <Image
                  source={item.image}
                  style={[common.thumbnail, common.mr16]}
                />
                <View>
                  <View style={common.rowCenter}>
                    <Text style={[common.text_l, common.fwb, common.mr8]}>
                      {item.nickname}
                    </Text>
                    <View style={[common.rowCenter, {alignSelf: 'flex-start'}]}>
                      <Text style={[common.text_s, {color: BLUE.DEFAULT}]}>
                        인증강사
                      </Text>
                      <Image
                        style={{marginLeft: 2, width: 14, height: 14}}
                        source={iconPath.CERTIFICATION}
                      />
                    </View>
                  </View>
                  <View style={common.rowCenter}>
                    <Text style={[common.text_m, common.fwb, common.mr4]}>
                      {item.field}
                    </Text>
                    <Text style={[common.text, {alignSelf: 'flex-end'}]}>
                      {item.career}
                    </Text>
                    <Text style={[common.text_s, common.fcg, common.mh8]}>
                      |
                    </Text>
                    <Text style={[common.text_s, {color: GRAY.DARK}]}>
                      {item.location}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={common.rowCenter}>
                <Text style={[common.text_s, common.fcg]}>{item.endDate}</Text>
                <Text style={[common.text_s, common.fcg, common.mh8]}>|</Text>
                <Text style={[common.text_s, common.fcg]}>{item.status}</Text>
                {item.answer && (
                  <>
                    <Text style={[common.text_s, common.fcg, common.mh8]}>
                      |
                    </Text>
                    <Text style={[common.text_s, common.fcb]}>
                      {item.answer}
                    </Text>
                  </>
                )}
              </View>

              <Pressable
                style={styles.kebabIcon}
                hitSlop={10}
                onPress={item.job}>
                <Image source={iconPath.KEBAB} style={[common.size24]} />
              </Pressable>
            </Pressable>
          );
        })}

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

export default SendSuggestionScreen;
