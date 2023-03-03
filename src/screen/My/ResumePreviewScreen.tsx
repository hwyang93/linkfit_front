import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {BLUE, GRAY, WHITE} from '@styles/colors';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {SetStateAction, useCallback, useEffect, useState} from 'react';
import Modal from '@components/ModalSheet';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../../AppInner';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {fetchResume} from '@api/resume';
import {fetchRecruitApplication, updateRecruitApplyStatus} from '@api/recruit';

type Props = NativeStackScreenProps<LoggedInParamList, 'ResumePreview'>;

function ResumePreviewScreen({route, navigation}: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState<any[]>([]);
  const [resume, setResume] = useState<any>({});
  const [applyResult, setApplyResult] = useState('');

  const getResume = useCallback(() => {
    if (route.params.applySeq) {
      fetchRecruitApplication(route.params.applySeq)
        .then(({data}: any) => {
          if (data.status === 'APPLY') {
            setApplyResult(data.status);
          }
          if (data.status === 'PASS') {
            setApplyResult(data.status);
          }
        })
        .catch((e: any) => {
          Alert.alert(e.message);
          navigation.goBack();
        });
    }
    fetchResume(route.params.resumeSeq)
      .then(({data}: any) => {
        setResume(data);
      })
      .catch((e: any) => {
        Alert.alert(e.message);
        navigation.goBack();
      });
  }, [route.params.applySeq, route.params.resumeSeq, navigation]);

  const onUpdatePassOrNot = useCallback(
    (status: string) => {
      updateRecruitApplyStatus(route.params.applySeq, {status: status})
        .then(({data}: any) => {
          console.log(data);
          Alert.alert('합격 여부 전달이 완료되었어요!');
          navigation.goBack();
        })
        .catch((e: any) => {
          Alert.alert(e.message);
        });
    },
    [navigation, route.params.applySeq],
  );

  useEffect(() => {
    getResume();
  }, []);

  const MODAL = [
    {
      value: '합격',
      job: onUpdatePassOrNot('PASS'),
    },
    {
      value: '불합격',
      job: onUpdatePassOrNot('FAIL'),
    },
  ];

  const passModal = () => {
    setModalTitle('합격 여부를 전달하세요.');
    setModalData(MODAL);
    openModal();
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const toReview = () => {
    // 리뷰 작성 화면으로 가기
    // navigation.navigate('ReviewForm')
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {resume.isMaster === 'Y' && (
          <View style={common.row}>
            <View style={[styles.box, common.mb8]}>
              <Text style={[common.text, common.fs10, {color: BLUE.DEFAULT}]}>
                대표
              </Text>
            </View>
          </View>
        )}

        <View style={common.mb24}>
          <Text style={common.title_l}>{resume.title}</Text>
        </View>

        {/* 인적사항 */}
        <View style={common.mb24}>
          <View style={[common.rowCenter, common.mb8]}>
            <Text style={[common.title, common.mr8]}>{resume.name}</Text>
            {/*{resume.writer.type === 'INSTRUCTOR' && (*/}
            {/*)}*/}
            <View style={common.rowCenter}>
              <Text style={[common.text_s, {color: BLUE.DEFAULT}]}>
                인증강사
              </Text>
              <Image
                style={{marginLeft: 2, width: 14, height: 14}}
                source={iconPath.CERTIFICATION}
              />
            </View>
          </View>

          <View style={[common.rowCenter, common.mb8]}>
            <Text style={[common.text_m, common.fwb, common.mr8]}>
              필라테스
            </Text>
            <Text style={[common.text, {alignSelf: 'flex-end'}]}>
              2년 6개월
            </Text>
            <Text style={[common.text_m, common.mh8, common.fcg]}>|</Text>
            <Text style={[common.text_m, common.fwb]}>24세</Text>
            <Text style={[common.text_m, common.mh8, common.fcg]}>|</Text>
            <Text style={[common.text_m, common.fwb]}>
              {/*{resume.writer.gender}*/}
            </Text>
          </View>
          <Text style={[common.text_s, {color: GRAY.DARK}]}>
            서울 · 강남구 · 역삼동
          </Text>

          <Pressable style={styles.kebabIcon} hitSlop={10} onPress={() => {}}>
            <Image source={iconPath.KEBAB} style={[common.size24]} />
          </Pressable>
          <Pressable style={styles.phoneIcon} hitSlop={10} onPress={() => {}}>
            <Image source={iconPath.PHONE} style={[common.size24]} />
          </Pressable>
        </View>

        <View style={common.mb20}>
          <Text style={[common.text_m, common.fwb, common.mr8]}>소개글</Text>
          <View style={styles.line} />
          <Text style={[common.text_m, common.mv2]}>{resume.intro}</Text>
        </View>

        <View style={common.mb24}>
          <Text style={[common.text_m, common.fwb, common.mr8]}>경력</Text>
          <View style={styles.line} />
          <Text style={[common.text_m, common.mv2]}>필라테스 전임</Text>
          <Text style={[common.text_m, common.mv2, common.fcg]}>
            2022.10.11 ~ 2023.01.10
          </Text>
        </View>

        <View style={common.mb24}>
          <Text style={[common.text_m, common.fwb, common.mr8]}>학력</Text>
          <View style={styles.line} />
          <Text style={[common.text_m, common.mv2]}>링크 고등학교</Text>
          <Text style={[common.text_m, common.mv2, common.fcg]}>
            2011.03 ~ 2014.02
          </Text>
        </View>

        <View style={common.mb24}>
          <Text style={[common.text_m, common.fwb, common.mr8]}>자격증</Text>
          <View style={styles.line} />
          <Text style={[common.text_m, common.mv2]}>자격증 명</Text>
          <Text style={[common.text_m, common.mv2, common.fcg]}>
            2022.01.30 취득
          </Text>
        </View>

        {/* 합격 여부 전달하기 버튼 */}
        {applyResult === 'APPLY' && (
          <View style={common.mt20}>
            <Pressable onPress={passModal}>
              <LinearGradient
                style={common.button}
                start={{x: 0.1, y: 0.5}}
                end={{x: 0.6, y: 1}}
                colors={['#74ebe4', '#3962f3']}>
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={common.buttonText}>합격 여부 전달하기</Text>
                )}
              </LinearGradient>
            </Pressable>
          </View>
        )}

        {/* todo: 합격 일 경우 후기 작성하기 버튼 표시 */}
        {applyResult === 'PASS' && (
          <View style={common.mt20}>
            <Pressable onPress={toReview}>
              <LinearGradient
                style={common.button}
                start={{x: 0.1, y: 0.5}}
                end={{x: 0.6, y: 1}}
                colors={['#74ebe4', '#3962f3']}>
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={common.buttonText}>후기 작성하기</Text>
                )}
              </LinearGradient>
            </Pressable>
          </View>
        )}

        {/* 모달 */}
        <Modal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          title={modalTitle}
          modalData={modalData}
          type={'button'}
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
  box: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: '#d7e0fd',
  },
  kebabIcon: {position: 'absolute', top: 0, right: 16},
  phoneIcon: {position: 'absolute', bottom: 0, right: 8},
  line: {
    marginTop: 8,
    marginBottom: 12,
    height: 1,
    backgroundColor: GRAY.DARK,
  },
});

export default ResumePreviewScreen;
