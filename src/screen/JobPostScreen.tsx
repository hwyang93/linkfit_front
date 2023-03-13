import {
  ActivityIndicator,
  Alert,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GRAY, WHITE} from '@styles/colors';
import common from '@styles/common';
import {SafeAreaView} from 'react-native-safe-area-context';
import CenterInfoComponent from '@components/CenterInfoComponent';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInParamList} from '../../AppInner';
import {SetStateAction, useEffect, useState} from 'react';
import {fetchRecruit} from '@api/recruit';
import FloatingLinkButton from '@components/FloatingLinkButton';
import Modal from '@components/ModalSheet';
import LinearGradient from 'react-native-linear-gradient';

type Props = NativeStackScreenProps<LoggedInParamList, 'JobPost'>;

function JobPostScreen({route, navigation}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState<any[]>([]);
  const {recruitSeq} = route.params;
  const [recruitInfo, setRecruitInfo] = useState<any>({
    dates: [{day: '', time: ''}],
  });

  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);

  const onScrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setContentVerticalOffset(event.nativeEvent.contentOffset.y);
  };

  useEffect(() => {
    fetchRecruit(recruitSeq)
      .then(({data}: any) => {
        setRecruitInfo(data);
      })
      .catch((e: any) => {
        Alert.alert(e.message);
      });
  }, [recruitSeq]);

  const MODAL = [
    {
      value: '2023.12.31 / 14:00 ~ 18:00',
      disabled: false,
      selected: false,
      job: () => {},
    },
    {
      value: '2023.12.31 / 14:00 ~ 18:00',
      disabled: true,
      selected: false,
      job: () => {},
    },
    {
      value: '2023.12.31 / 14:00 ~ 18:00',
      disabled: false,
      selected: true,
      job: () => {},
    },
  ];
  const CANCEL_MODAL = [
    {
      value: '2023.12.31 / 14:00 ~ 18:00',
      disabled: false,
      selected: false,
      job: () => {},
    },
    {
      value: '2023.12.31 / 14:00 ~ 18:00',
      disabled: true,
      selected: false,
      job: () => {},
    },
    {
      value: '2023.12.31 / 14:00 ~ 18:00',
      disabled: false,
      selected: true,
      job: () => {},
    },
  ];

  const apply = () => {
    setModalTitle('지원할 날짜 및 시간을 선택하세요.');
    setModalData(MODAL);
    openModal();
  };
  const cancel = () => {
    setModalTitle('지원 취소할 날짜 및 시간을 선택하세요. ');
    setModalData(CANCEL_MODAL);
    openModal();
  };

  const openModal = () => {
    setModalVisible(true);
  };

  // todo: 지원을 안했으면 지원하기 버튼 표시 || 지원을 했으면 지원완료 메시지 표시
  return (
    <>
      <SafeAreaView
        edges={['bottom', 'left', 'right']}
        style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={0}
          onScroll={onScrollHandler}>
          {/* 구인공고 탑 메인 */}
          <View style={common.mb40}>
            <View style={common.mb16}>
              <Image
                source={require('../assets/images/job_01.png')}
                resizeMode={'cover'}
                style={styles.imgBox}
              />
            </View>
            <Text style={[common.mb16, common.title_l]}>
              {recruitInfo.title}
            </Text>
            <Text style={[common.mb16, common.text_s, {color: GRAY.DARK}]}>
              {recruitInfo.companyName} | 서울 · 송파구
            </Text>
            {recruitInfo.applyInfo?.length > 0 && (
              <Text style={[common.text_s, {color: GRAY.DARK}]}>
                {recruitInfo.applyInfo[0].updatedAt} 지원 완료
              </Text>
            )}
          </View>
          {/* 구인공고 탑 메인 */}

          {/* 공고 내용 */}
          <View style={common.mb24}>
            <Text style={[common.mb8, common.text_m, common.fwb]}>
              채용형태
            </Text>
            <Text style={common.text_m}>{recruitInfo.recruitType}</Text>
          </View>
          {recruitInfo.recruitType === '대강' ? (
            <View style={common.mb24}>
              <Text style={[common.mb8, common.text_m, common.fwb]}>
                수업날짜 및 시간
              </Text>
              {recruitInfo.dates.map((item: any) => {
                return (
                  <Text key={item.day + ' ' + item.time} style={common.text_m}>
                    {item.day} {item.time}
                  </Text>
                );
              })}
            </View>
          ) : (
            <View>
              <View style={common.mb24}>
                <Text style={[common.mb8, common.text_m, common.fwb]}>
                  수업날짜
                </Text>
                <Text style={common.text_m}>{recruitInfo.dates[0].day}</Text>
              </View>
              <View style={common.mb24}>
                <Text style={[common.mb8, common.text_m, common.fwb]}>
                  수업시간
                </Text>
                <Text style={common.text_m}>{recruitInfo.dates[0].time}</Text>
              </View>
            </View>
          )}

          <View style={common.mb24}>
            <Text style={[common.mb8, common.text_m, common.fwb]}>
              수업내용
            </Text>
            <Text style={common.text_m}>{recruitInfo.content}</Text>
          </View>
          <View style={common.mb24}>
            <Text style={[common.mb8, common.text_m, common.fwb]}>경력</Text>
            <Text style={common.text_m}>{recruitInfo.career}</Text>
          </View>
          <View style={common.mb24}>
            <Text style={[common.mb8, common.text_m, common.fwb]}>학력</Text>
            <Text style={common.text_m}>{recruitInfo.education}</Text>
          </View>
          <View style={common.mb24}>
            <Text style={[common.mb8, common.text_m, common.fwb]}>급여</Text>
            <Text style={common.text_m}>{recruitInfo.pay}</Text>
          </View>
          <View style={common.mb8}>
            <Text style={[common.mb8, common.text_m, common.fwb]}>
              센터 위치
            </Text>
            <Text style={common.text_m}>{recruitInfo.address}</Text>
          </View>

          <View style={common.mb24}>
            <Image
              style={common.mapBox}
              source={require('../assets/images/map_sample.png')}
            />
          </View>

          <View>
            <Text style={[common.mb8, common.text_m, common.fwb]}>
              센터 정보
            </Text>
            <CenterInfoComponent link={'CenterInfo'} />
          </View>

          {/* 지원 취소하기 버튼 */}
          <View style={common.mt40}>
            <Pressable onPress={cancel}>
              <LinearGradient
                style={common.button}
                start={{x: 0.1, y: 0.5}}
                end={{x: 0.6, y: 1}}
                colors={['#74ebe4', '#3962f3']}>
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={common.buttonText}>지원 취소하기</Text>
                )}
              </LinearGradient>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
      {contentVerticalOffset <= 500 && (
        <FloatingLinkButton
          title={'지원하기'}
          type={'gradient'}
          right={16}
          bottom={32}
          job={apply}
        />
      )}
      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={modalTitle}
        modalData={modalData}
        type={'select'}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: WHITE,
  },
  imgBox: {
    width: '100%',
    height: 160,
    borderRadius: 8,
  },
});

export default JobPostScreen;
