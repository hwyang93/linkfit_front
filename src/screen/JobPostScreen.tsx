import {iconPath} from '@/utils/iconPath';
import {
  createRecruitApply,
  fetchRecruit,
  updateRecruitApplyCancel,
} from '@api/recruit';
import {fetchResumes} from '@api/resume';
import CenterInfoComponent from '@components/CenterInfoComponent';
import FloatingLinkButton from '@components/FloatingLinkButton';
import Modal from '@components/ModalSheet';
import toast from '@hooks/toast';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BLUE, GRAY, WHITE} from '@styles/colors';
import common from '@styles/common';
import {SetStateAction, useCallback, useEffect, useState} from 'react';
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LoggedInParamList} from '../../AppInner';

type Props = NativeStackScreenProps<LoggedInParamList, 'JobPost'>;

function JobPostScreen({route}: Props) {
  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);
  const [modalTitle, setModalTitle] = useState('');
  // const [modalData, setModalData] = useState<any[]>([]);
  const [modalType, setModalType] = useState<string>('');
  const {recruitSeq} = route.params;
  const [recruitInfo, setRecruitInfo] = useState<any>({
    dates: [{day: '', time: ''}],
    writer: {},
  });
  const [resumes, setResumes] = useState<any[]>([]);
  const [recruitDates, setRecruitDates] = useState<any[]>([]);

  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);

  const [step, setStep] = useState('');

  const onScrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setContentVerticalOffset(event.nativeEvent.contentOffset.y);
  };

  const getRecruitInfo = useCallback(() => {
    fetchRecruit(recruitSeq)
      .then(({data}: any) => {
        setRecruitInfo(data);
        data.dates.forEach((date: any) => {
          date.isSelected = false;
        });
        setRecruitDates(data.dates);
      })
      .catch((e: any) => {
        toast.error({message: e.message});
      });
  }, [recruitSeq]);

  const getResumeList = useCallback(() => {
    fetchResumes()
      .then(({data}: any) => {
        data.forEach((resume: any) => {
          resume.isSelected = false;
        });
        setResumes(data);
      })
      .catch((e: any) => {
        toast.error({message: e.message});
      });
  }, []);

  const onCreateApply = useCallback(() => {
    const dates = recruitDates.filter((date: any) => {
      if (date.isSelected) {
        return date.seq;
      }
    });
    const resumeSeq = resumes.find((resume: any) => {
      return resume.isSelected;
    }).seq;
    const data = {
      recruitDateSeq: dates,
      resumeSeq: resumeSeq,
      recruitSeq: recruitInfo.seq,
    };

    createRecruitApply(recruitInfo.seq, data)
      .then(() => {
        toast.success({message: '지원이 완료되었어요!'});
        setModalVisible(false);
        getRecruitInfo();
      })
      .catch((e: any) => {
        toast.error({message: e.message});
      });
  }, [getRecruitInfo, recruitDates, recruitInfo.seq, resumes]);

  const onCancelApply = useCallback(() => {
    const dates: number[] = [];
    recruitDates.forEach(date => {
      if (date.isSelected) {
        const applySeq = recruitInfo.applyInfo.find((item: any) => {
          return item.recruitDateSeq === date.seq;
        }).seq;

        return dates.push(applySeq);
      }
    });
    const data = {seqs: dates};

    updateRecruitApplyCancel(data)
      .then(() => {
        toast.success({message: '지원이 취소되었어요!'});
        setModalVisible(false);
        getRecruitInfo();
      })
      .catch((e: any) => {
        toast.error({message: e.message});
      });
  }, [getRecruitInfo, recruitDates, recruitInfo.applyInfo]);

  useEffect(() => {
    getRecruitInfo();
    getResumeList();
  }, [getRecruitInfo, getResumeList]);

  useEffect(() => {
    setResumes(() => {
      return resumes.map((resume: any) => {
        resume.isSelected = false;
        return resume;
      });
    });
    setRecruitDates(() => {
      return recruitDates.map((date: any) => {
        date.isSelected = false;
        return date;
      });
    });
  }, [modalVisible, recruitDates, resumes]);

  useEffect(() => {
    const selectResume = resumes.find((resume: any) => {
      return resume.isSelected;
    });
    const selectDate = recruitDates.filter((date: any) => {
      return date.isSelected;
    });
    if (!selectResume) {
      setStep('');
      return;
    }
    if (selectResume && selectDate.length > 0) {
      setStep('apply');
      return;
    }
    if (selectResume) {
      setStep('date');
      return;
    }
  }, [recruitDates, resumes]);

  const onSelectResume = useCallback(
    (seq: number) => {
      setResumes(() => {
        return resumes.map((resume: any) => {
          if (resume.seq === seq) {
            resume.isSelected = !resume.isSelected;
          } else {
            resume.isSelected = false;
          }
          return resume;
        });
      });
    },
    [resumes],
  );

  const onSelectRecruitDate = useCallback(
    (seq: number) => {
      setRecruitDates(() => {
        return recruitDates.map((date: any) => {
          if (date.seq === seq) {
            date.isSelected = !date.isSelected;
          }
          return date;
        });
      });
    },
    [recruitDates],
  );

  const apply = () => {
    setModalType('apply');
    setModalTitle('지원하기');
    openModal();
  };
  const cancel = () => {
    setModalType('cancel');
    setModalTitle('지원 취소할 날짜 및 시간을 선택하세요. ');
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
            {recruitInfo.writer.profileImage && (
              <View style={common.mb16}>
                <Image
                  source={{uri: recruitInfo.writer.profileImage.originFileUrl}}
                  resizeMode={'cover'}
                  style={styles.imgBox}
                />
              </View>
            )}

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
            {/*<Image*/}
            {/*  style={common.mapBox}*/}
            {/*  source={require('../assets/images/map_sample.png')}*/}
            {/*/>*/}
            <MapView
              style={common.mapBox}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: 53.339688,
                longitude: -6.236688,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <Marker
                coordinate={{
                  latitude: 53.339688,
                  longitude: -6.236688,
                }}
                pinColor="#2D63E2"
                title="하이"
                description="테스트"
              />
            </MapView>
          </View>
          {recruitInfo.writer.type === 'COMPANY' && (
            <View>
              <Text style={[common.mb8, common.text_m, common.fwb]}>
                센터 정보
              </Text>
              <CenterInfoComponent centerInfo={recruitInfo.writer} />
            </View>
          )}

          {/* 지원 취소하기 버튼 */}
          <View style={common.mt40}>
            <LinearGradient
              style={common.gradientBorderBox}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 1}}
              colors={['#74ebe4', '#3962f3']}>
              <Pressable onPress={cancel} style={common.borderInnerBox}>
                <Text style={[common.text_m, common.innerText]}>
                  지원 취소하기
                </Text>
              </Pressable>
            </LinearGradient>
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
        // modalData={modalData}
        type={'select'}
        content={
          <>
            {modalType === 'apply' && (
              <View style={{width: '100%'}}>
                {/* 등록된 이력서 없을 때 */}
                {resumes.length === 0 && (
                  <Pressable style={[common.basicBox, {alignItems: 'center'}]}>
                    <Image
                      source={iconPath.ADD_BUTTON}
                      style={[common.size24, common.mb8]}
                    />
                    <Text
                      style={[
                        common.text_m,
                        {
                          textDecorationLine: 'underline',
                          textDecorationColor: GRAY.DARK,
                        },
                      ]}>
                      이력서 등록하기
                    </Text>
                  </Pressable>
                )}

                {resumes.map(resume => {
                  return (
                    <Pressable
                      key={'resume' + resume.seq}
                      onPress={() => onSelectResume(resume.seq)}>
                      <View
                        style={[
                          common.basicBox,
                          common.mv4,
                          resume.isSelected && {
                            borderColor: BLUE.DEFAULT,
                            borderWidth: 2,
                          },
                        ]}>
                        {resume.isMaster === 'Y' && (
                          <View style={[common.resumeBadge]}>
                            <Text
                              style={[
                                common.text,
                                common.fs10,
                                {color: BLUE.DEFAULT, textAlign: 'center'},
                              ]}>
                              대표
                            </Text>
                          </View>
                        )}

                        <Text numberOfLines={1} style={common.title}>
                          {resume.title}
                        </Text>
                        <Text style={[common.text_s, common.fcg]}>
                          {resume.updatedAt}
                        </Text>
                        {resume.isSelected && (
                          <Image
                            style={[
                              common.size24,
                              {position: 'absolute', right: 16, top: '50%'},
                            ]}
                            source={iconPath.CHECK}
                          />
                        )}
                      </View>
                    </Pressable>
                  );
                })}
                {(step === 'date' || step === 'apply') && (
                  <>
                    <View style={[common.mt40, common.mb8]}>
                      <Text style={common.title_s}>
                        지원할 날짜 및 시간을 선택하세요.
                      </Text>
                    </View>
                    {recruitDates.map((item: any) => {
                      return (
                        <Pressable
                          key={'recruitDate' + item.seq}
                          disabled={item.isApplied}
                          onPress={() => onSelectRecruitDate(item.seq)}>
                          <View
                            style={[common.modalItemBox, {paddingVertical: 4}]}>
                            <View
                              style={[
                                common.modalSelectBox,
                                item.isSelected && {
                                  borderColor: BLUE.DEFAULT,
                                },
                                item.isApplied && {opacity: 0.5},
                              ]}>
                              <View style={[common.rowCenter]}>
                                <Image
                                  source={iconPath.CALENDAR}
                                  style={[common.size24, common.mr8]}
                                />
                                <Text style={common.modalText}>
                                  {item.day + '/' + item.time}
                                </Text>
                              </View>
                              {item.isSelected && (
                                <Image
                                  style={common.size24}
                                  source={iconPath.CHECK}
                                />
                              )}
                            </View>
                          </View>
                        </Pressable>
                      );
                    })}
                  </>
                )}
                {/*<View style={[common.mt40, common.mb8]}>*/}
                {/*  <Text style={common.title_s}>*/}
                {/*    지원할 날짜 및 시간을 선택하세요.*/}
                {/*  </Text>*/}
                {/*</View>*/}
                {/*{recruitDates.map((item: any) => {*/}
                {/*  return (*/}
                {/*    <Pressable*/}
                {/*      key={'recruitDate' + item.seq}*/}
                {/*      disabled={item.isApplied}*/}
                {/*      onPress={() => onSelectRecruitDate(item.seq)}>*/}
                {/*      <View style={[common.modalItemBox, {paddingVertical: 4}]}>*/}
                {/*        <View*/}
                {/*          style={[*/}
                {/*            common.modalSelectBox,*/}
                {/*            item.isSelected && {borderColor: BLUE.DEFAULT},*/}
                {/*            item.isApplied && {opacity: 0.5},*/}
                {/*          ]}>*/}
                {/*          <View style={[common.rowCenter]}>*/}
                {/*            <Image*/}
                {/*              source={iconPath.CALENDAR}*/}
                {/*              style={[common.size24, common.mr8]}*/}
                {/*            />*/}
                {/*            <Text style={common.modalText}>*/}
                {/*              {item.day + '/' + item.time}*/}
                {/*            </Text>*/}
                {/*          </View>*/}
                {/*          {item.isSelected && (*/}
                {/*            <Image*/}
                {/*              style={common.size24}*/}
                {/*              source={iconPath.CHECK}*/}
                {/*            />*/}
                {/*          )}*/}
                {/*        </View>*/}
                {/*      </View>*/}
                {/*    </Pressable>*/}
                {/*  );*/}
                {/*})}*/}
                {/* 지원하기 버튼 등록 된 이력서 없을 경우 disable */}
                <View style={common.mt40}>
                  <Pressable
                    disabled={!(step === 'apply')}
                    onPress={() => onCreateApply()}>
                    <LinearGradient
                      style={common.button}
                      start={{x: 0.1, y: 0.5}}
                      end={{x: 0.6, y: 1}}
                      colors={
                        step === 'apply'
                          ? ['#74ebe4', '#3962f3']
                          : ['#dcdcdc', '#dcdcdc']
                      }>
                      <Text style={common.buttonText}>지원하기</Text>
                    </LinearGradient>
                  </Pressable>
                </View>
              </View>
            )}
            {modalType === 'cancel' && (
              <View>
                {recruitDates.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={[common.modalItemBox, {paddingVertical: 4}]}>
                      <Pressable
                        onPress={() => onSelectRecruitDate(item.seq)}
                        disabled={item.disabled}
                        style={[
                          common.modalSelectBox,
                          item.isSelected && {borderColor: BLUE.DEFAULT},
                          !item.isApplied && {opacity: 0.5},
                        ]}>
                        <View style={[common.rowCenter]}>
                          <Image
                            source={iconPath.CALENDAR}
                            style={[common.size24, common.mr8]}
                          />
                          <Text style={common.modalText}>
                            {item.day + '/' + item.time}
                          </Text>
                        </View>
                        {item.isSelected && (
                          <Image
                            style={common.size24}
                            source={iconPath.CHECK}
                          />
                        )}
                      </Pressable>
                    </View>
                  );
                })}
                {/* 지원 취소하기 버튼 */}
                <View style={common.mt40}>
                  <LinearGradient
                    style={common.gradientBorderBox}
                    start={{x: 0, y: 1}}
                    end={{x: 1, y: 1}}
                    colors={['#74ebe4', '#3962f3']}>
                    <Pressable
                      style={common.borderInnerBox}
                      onPress={() => onCancelApply()}>
                      <Text style={[common.text_m, common.innerText]}>
                        지원 취소하기
                      </Text>
                    </Pressable>
                  </LinearGradient>
                </View>
              </View>
            )}
          </>
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: WHITE,
  },
  imgBox: {
    width: '100%',
    height: 160,
    borderRadius: 8,
  },
});

export default JobPostScreen;
