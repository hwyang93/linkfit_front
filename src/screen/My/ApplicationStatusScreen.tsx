import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {BLUE, WHITE} from '@styles/colors';

import common, {width} from '@styles/common';
import TopFilter from '@components/TopFilter';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../../AppInner';
import {SetStateAction, useState} from 'react';
import Modal from '@components/ModalSheet';
import {iconPath} from '@util/iconPath';

const windowWidth = Dimensions.get('window').width;
const columns2 = (windowWidth - 48) / 2;

function ApplicationStatusScreen() {
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

  const openModal = () => {
    setModalVisible(true);
  };
  return (
    <View style={styles.container}>
      {/* 필터 영역 */}
      <TopFilter data={FILTER} />
      {/* 필터 영역 */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 컨첸츠 영역 */}
        <View
          style={{flexWrap: 'wrap', flexDirection: 'row', paddingVertical: 8}}>
          <Pressable
            style={styles.itemBox}
            onPress={() => navigation.navigate('JobPost')}>
            <View style={styles.imgBox}>
              <Image
                style={styles.img}
                source={require('assets/images/sample_02.png')}
              />
              <View style={[styles.statusBox]}>
                <Text style={[styles.statusText]}>열람</Text>
              </View>
            </View>
            <View>
              {/* 포지션 */}
              <Text style={[common.text]}>필라테스</Text>
              {/* 제목 */}
              <Text style={[common.text_m, common.fwb]} numberOfLines={1}>
                필라테스 강사님 모셔요 모셔요 오셔요.
              </Text>
              {/* 업체명 */}
              <Text style={[common.text_s, common.fwb]}>링크 필라테스</Text>
              {/* 지역 */}
              <Text style={common.text}>2022.12.29 지원</Text>
              <Pressable
                style={styles.resume}
                onPress={() => Alert.alert('click', 'Resume')}>
                <Image source={iconPath.RESUME} style={[common.size24]} />
              </Pressable>
            </View>
          </Pressable>

          <Pressable
            style={styles.itemBox}
            onPress={() => navigation.navigate('JobPost')}>
            <View style={styles.imgBox}>
              <Image
                style={styles.img}
                source={require('assets/images/sample_02.png')}
              />
              <View style={[styles.statusBox]}>
                <Text style={[styles.statusText]}>지원 취소</Text>
              </View>
            </View>
            <View>
              {/* 포지션 */}
              <Text style={[common.text]}>필라테스</Text>
              {/* 제목 */}
              <Text style={[common.text_m, common.fwb]} numberOfLines={1}>
                필라테스 강사님 모셔요 모셔요 오셔요.
              </Text>
              {/* 업체명 */}
              <Text style={[common.text_s, common.fwb]}>링크 필라테스</Text>
              {/* 지역 */}
              <Text style={common.text}>2022.12.29 지원</Text>
              <Pressable
                style={styles.resume}
                onPress={() => Alert.alert('click', 'Resume')}>
                <Image source={iconPath.RESUME} style={[common.size24]} />
              </Pressable>
            </View>
          </Pressable>

          <Pressable
            style={styles.itemBox}
            onPress={() => navigation.navigate('JobPost')}>
            <View style={styles.imgBox}>
              <Image
                style={styles.img}
                source={require('assets/images/sample_02.png')}
              />
              <View style={[styles.statusBox]}>
                <Text style={[styles.statusText]}>지원 완료</Text>
              </View>
            </View>
            <View>
              {/* 포지션 */}
              <Text style={[common.text]}>필라테스</Text>
              {/* 제목 */}
              <Text style={[common.text_m, common.fwb]} numberOfLines={1}>
                필라테스 강사님 모셔요 모셔요 오셔요.
              </Text>
              {/* 업체명 */}
              <Text style={[common.text_s, common.fwb]}>링크 필라테스</Text>
              {/* 지역 */}
              <Text style={common.text}>2022.12.29 지원</Text>
              <Pressable
                style={styles.resume}
                onPress={() => Alert.alert('click', 'Resume')}>
                <Image source={iconPath.RESUME} style={[common.size24]} />
              </Pressable>
            </View>
          </Pressable>
        </View>

        {/* 모달 */}
        <Modal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          title={modalTitle}
          modalData={modalData}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
  itemBox: {width: columns2, marginBottom: 16, marginHorizontal: 4},
  imgBox: {
    marginBottom: 8,
    height: 104,
    borderRadius: 8,
  },
  img: {width: '100%', height: 104, borderRadius: 8},
  statusBox: {
    zIndex: 10,
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: '#d7e0fd',
  },
  statusText: {
    fontSize: +width * 10,
    color: BLUE.DEFAULT,
  },
  resume: {position: 'absolute', top: 3, right: 0},
});

export default ApplicationStatusScreen;
