import {iconPath} from '@/utils/iconPath';
import Modal from '@components/ModalSheet';
import {BLUE, GRAY, WHITE} from '@styles/colors';
import common from '@styles/common';
import {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useAppSelector} from '@/store';
import {fetchRecruitApplication, updateRecruitApplyStatus} from '@api/recruit';
import {fetchResume} from '@api/resume';
import toast from '@hooks/toast';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInParamList} from '../../../AppInner';

type Props = NativeStackScreenProps<LoggedInParamList, 'ResumePreview'>;

const ResumePreviewScreen = ({route, navigation}: Props) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState<any[]>([]);
  const [resume, setResume] = useState<any>({});
  const [applyResult, setApplyResult] = useState('');
  const [application, setApplication] = useState<any>({});

  const memberInfo = useAppSelector(state => state.user);

  const getResume = useCallback(() => {
    if (route.params.applySeq) {
      fetchRecruitApplication(route.params.applySeq)
        .then(({data}: any) => {
          setApplication(data);
          if (data.status === 'APPLY') {
            setApplyResult(data.status);
          }
          if (data.status === 'PASS') {
            setApplyResult(data.status);
          }
        })
        .catch(error => {
          toast.error({message: error.message});
          navigation.goBack();
        });
    }
    fetchResume(route.params.resumeSeq)
      .then(({data}: any) => {
        setResume(data);
      })
      .catch(error => {
        toast.error({message: error.message});
        navigation.goBack();
      });
  }, [route.params.applySeq, route.params.resumeSeq, navigation]);

  const onUpdatePassOrNot = useCallback(
    (status: string) => {
      updateRecruitApplyStatus(route.params.applySeq, {status: status})
        .then(() => {
          setLoading(true);
          toast.success('합격 여부 전달이 완료되었어요!');
          navigation.navigate('ApplicantStatus', {
            recruitSeq: route.params.recruitSeq,
          });
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          toast.error({message: error.message});
        });
    },
    [navigation, route.params.applySeq, route.params.recruitSeq],
  );

  useEffect(() => {
    getResume();
  }, [getResume]);

  const MODAL = [
    {
      value: '합격',
      job: () => {
        onUpdatePassOrNot('PASS');
      },
    },
    {
      value: '불합격',
      job: () => {
        onUpdatePassOrNot('FAIL');
      },
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
    const params = {
      recruitSeq: application.recruitSeq,
      evaluationMemberSeq: memberInfo.seq,
      targetMemberSeq: application.memberSeq,
    };
    navigation.navigate('ReviewForm', {reputationInfo: params});
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {applyResult !== 'APPLY' && applyResult !== 'PASS' ? (
          <>
            {resume.isMaster === 'Y' && (
              <View style={common.rowCenter}>
                <View style={[styles.box, common.mb8]}>
                  <Text
                    style={[common.text, common.fs10, {color: BLUE.DEFAULT}]}>
                    대표
                  </Text>
                </View>
              </View>
            )}
          </>
        ) : null}

        <View style={common.mb24}>
          <Text style={common.title_l}>{resume.title}</Text>
        </View>

        {/* 인적사항 */}
        <View style={common.mb24}>
          <View style={[common.rowCenter, common.mb8]}>
            <Text style={[common.title, common.mr8]}>{resume.name}</Text>
            {resume.writer?.type === 'INSTRUCTOR' && (
              <View style={common.rowCenter}>
                <Text style={[common.text_s, {color: BLUE.DEFAULT}]}>
                  인증강사
                </Text>

                <Image
                  style={{marginLeft: 2, width: 14, height: 14}}
                  source={iconPath.CERTIFICATION}
                />
              </View>
            )}
          </View>

          <View style={[common.rowCenter, common.mb8]}>
            <Text style={[common.text_m, common.fwb, common.mr8]}>
              {resume.writer?.field}
            </Text>
            <Text style={[common.text, {alignSelf: 'flex-end'}]}>
              {resume.writer?.career}
            </Text>
            <Text style={[common.text_m, common.mh8, common.fcg]}>|</Text>
            <Text style={[common.text_m, common.fwb]}>24세</Text>
            <Text style={[common.text_m, common.mh8, common.fcg]}>|</Text>
            <Text style={[common.text_m, common.fwb]}>
              {resume.writer?.gender}
            </Text>
          </View>
          {resume.writer?.regionAuth && (
            <Text style={[common.text_s, {color: GRAY.DARK}]}>
              {`${resume.writer?.regionAuth.region1depth} · ${resume.writer?.regionAuth.region2depth} · ${resume.writer?.regionAuth.region3depth}`}
            </Text>
          )}

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
          {resume.careers?.map((career: any) => {
            return (
              <View key={'career' + career.seq}>
                <Text
                  style={[
                    common.text_m,
                    common.mv2,
                  ]}>{`${career.field} ${career.workType}`}</Text>
                <Text style={[common.text_m, common.mv2, common.fcg]}>
                  {`${career.startDate} ~ ${career.endDate}`}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={common.mb24}>
          <Text style={[common.text_m, common.fwb, common.mr8]}>학력</Text>
          <View style={styles.line} />
          {resume.educations?.map((education: any) => {
            return (
              <View key={'education' + education.seq}>
                <Text style={[common.text_m, common.mv2]}>
                  {education.school}
                </Text>
                <Text style={[common.text_m, common.mv2, common.fcg]}>
                  {`${education.startDate} ~ ${education.endDate}`}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={common.mb24}>
          <Text style={[common.text_m, common.fwb, common.mr8]}>자격증</Text>
          <View style={styles.line} />
          {resume.licence && (
            <View>
              <Text style={[common.text_m, common.mv2]}>
                {resume.licence.licenceNumber}
              </Text>
              <Text style={[common.text_m, common.mv2, common.fcg]}>
                2022.01.30 취득
              </Text>
            </View>
          )}
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
          content={
            <View>
              {MODAL.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={[common.modalItemBox, {paddingVertical: 8}]}>
                    <Pressable onPress={item.job} style={{flex: 1}}>
                      <LinearGradient
                        style={[common.button]}
                        start={{x: 0.1, y: 0.5}}
                        end={{x: 0.6, y: 1}}
                        colors={['#74ebe4', '#3962f3']}>
                        {loading ? (
                          <ActivityIndicator color="white" />
                        ) : (
                          <Text style={common.buttonText}>{item.value}</Text>
                        )}
                      </LinearGradient>
                    </Pressable>
                  </View>
                );
              })}
            </View>
          }
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
