import BottomSheet from '@/components/Common/BottomSheet';
import BoxButton from '@/components/Common/BoxButton';
import CTAButton from '@/components/Common/CTAButton';
import useModal from '@/hooks/useModal';
import THEME from '@/styles/theme';
import {RecruitDateEntity} from '@/types/api/entities';
import {FetchRecruitResponse} from '@/types/api/recruit';
import {FetchResumesResponse} from '@/types/api/resume';
import {iconPath} from '@/utils/iconPath';
import {formatDate} from '@/utils/util';
import {
  createRecruitApply,
  fetchRecruit,
  updateRecruitApplyCancel,
} from '@api/recruit';
import {fetchResumes} from '@api/resume';
import CenterInfoComponent from '@components/CenterInfoComponent';
import FABContainer from '@components/Common/FABContainer';
import toast from '@hooks/toast';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BLUE, GRAY, WHITE} from '@styles/colors';
import common from '@styles/common';
import {useCallback, useEffect, useState} from 'react';
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
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LoggedInParamList} from '../../AppInner';

const RegisterResumeButton: React.FC = () => {
  return (
    <Pressable style={[common.basicBox, {alignItems: 'center'}]}>
      <Image source={iconPath.ADD_BUTTON} style={[common.size24, common.mb8]} />
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
  );
};

interface ResumeListItemProps {
  isMaster: boolean;
  selected: boolean;
  title: string;
  updatedAt: string;
  onPress: () => void;
}

const ResumeListItem: React.FC<ResumeListItemProps> = ({
  isMaster,
  selected,
  title,
  updatedAt,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          common.mv4,
          {
            borderRadius: 8,
            borderWidth: 1,
            borderColor: selected ? BLUE.DEFAULT : THEME.WHITE,
          },
        ]}>
        <View
          style={[
            common.basicBox,
            selected && {
              borderColor: BLUE.DEFAULT,
              borderWidth: 1,
            },
          ]}>
          {isMaster && (
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
            {title}
          </Text>
          <Text style={[common.text_s, common.fcg]}>{updatedAt}</Text>
          {selected && (
            <Image
              style={[
                common.size24,
                {position: 'absolute', right: 16, top: '50%'},
              ]}
              source={iconPath.CHECK}
            />
          )}
        </View>
      </View>
    </Pressable>
  );
};

interface ResumeDateListItemProps {
  selected: boolean;
  disabled: boolean;
  day: string;
  time: string;
  onPress: () => void;
}

const ResumeDateListItem: React.FC<ResumeDateListItemProps> = ({
  disabled,
  selected,
  day,
  time,
  onPress,
}) => {
  return (
    <Pressable disabled={disabled} onPress={onPress}>
      <View style={[common.modalItemBox, {paddingVertical: 4}]}>
        <View
          style={[
            common.modalSelectBox,
            selected && {
              borderColor: BLUE.DEFAULT,
            },
            disabled && {opacity: 0.5},
          ]}>
          <View style={[common.rowCenter]}>
            <Image
              source={iconPath.CALENDAR}
              style={[common.size24, common.mr8]}
            />
            <Text style={common.modalText}>{`${day} / ${time}`}</Text>
          </View>
          {selected && <Image style={common.size24} source={iconPath.CHECK} />}
        </View>
      </View>
    </Pressable>
  );
};

type Props = NativeStackScreenProps<LoggedInParamList, 'JobPost'>;

const JobPostScreen = ({route}: Props) => {
  const applyModal = useModal();
  const cancelModal = useModal();

  const {recruitSeq} = route.params;

  const [recruitInfo, setRecruitInfo] = useState<FetchRecruitResponse>();

  const [resumes, setResumes] = useState<FetchResumesResponse>([]);

  const [selectedResumeSeq, setSelectedResumeSeq] = useState<number | null>(
    null,
  );
  const [selectedRecruitDates, setSelectedRecruitDates] = useState<number[]>(
    [],
  );

  const [recruitDates, setRecruitDates] = useState<RecruitDateEntity[]>([]);

  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);

  const onScrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setContentVerticalOffset(event.nativeEvent.contentOffset.y);
  };

  const shouldCancelButtonDisabled = !recruitInfo?.dates.some(
    date => date.isApplied,
  );

  const selectedDatesSeqList = recruitDates
    .filter(date => {
      return date.isSelected;
    })
    .map(item => item.seq);

  const getRecruitInfo = useCallback(() => {
    fetchRecruit(recruitSeq)
      .then(({data}) => {
        setRecruitInfo(data);
        setRecruitDates(data.dates);
      })
      .catch(error => {
        toast.error({message: error.message});
      });
  }, [recruitSeq]);

  const getResumeList = useCallback(() => {
    fetchResumes()
      .then(({data}) => {
        setResumes(data);
      })
      .catch(error => {
        toast.error({message: error.message});
      });
  }, []);

  const onApplyButtonPress = () => {
    if (!recruitInfo || !selectedResumeSeq) {
      return;
    }

    const data = {
      recruitDateSeq: selectedDatesSeqList,
      recruitSeq: recruitInfo.seq,
      resumeSeq: selectedResumeSeq,
    };

    createRecruitApply(recruitInfo.seq, data)
      .then(() => {
        toast.success({message: '지원이 완료되었어요!'});
        applyModal.close();
        getRecruitInfo();
      })
      .catch(error => {
        toast.error({message: error.message});
      });
  };

  const handleCancelButtonPress = () => {
    const data = {seqs: selectedDatesSeqList};

    updateRecruitApplyCancel(data)
      .then(() => {
        toast.success({message: '지원이 취소되었어요!'});
        cancelModal.close();
        getRecruitInfo();
      })
      .catch(error => {
        toast.error({message: error.message});
      });
  };

  const handleResumeListItemPress = (seq: number) => {
    setSelectedResumeSeq(seq);
  };

  const handleResumeDateListItemPress = (seq: number) => {
    setRecruitDates(() => {
      return recruitDates.map(date => {
        if (date.seq === seq) {
          date.isSelected = !date.isSelected;
        }
        return date;
      });
    });

    selectedRecruitDates.includes(seq)
      ? setSelectedRecruitDates(prev => prev.filter(item => item !== seq))
      : setSelectedRecruitDates(prev => [...prev, seq]);
  };

  console.log('selectedRecruitDates', selectedRecruitDates);

  const handleCancelModalClose = () => {
    cancelModal.close();
    setSelectedRecruitDates([]);
  };

  const handleApplyModalClose = () => {
    applyModal.close();
    setSelectedRecruitDates([]);
    setSelectedResumeSeq(null);
  };

  useEffect(() => {
    getRecruitInfo();
    getResumeList();
  }, [getRecruitInfo, getResumeList]);

  // TODO: 지원을 안했으면 지원하기 버튼 표시 || 지원을 했으면 지원완료 메시지 표시

  return (
    <>
      {recruitInfo && (
        <>
          <SafeAreaView edges={['left', 'right']} style={styles.container}>
            <ScrollView
              contentContainerStyle={{paddingBottom: 40}}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={0}
              onScroll={onScrollHandler}>
              <View style={common.mb40}>
                {recruitInfo.writer?.profileImage && (
                  <View style={common.mb16}>
                    <Image
                      source={{
                        uri: recruitInfo.writer.profileImage.originFileUrl,
                      }}
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
                {recruitInfo.applyInfo && recruitInfo.applyInfo.length > 0 && (
                  <Text style={[common.text_s, {color: GRAY.DARK}]}>
                    {formatDate(recruitInfo.applyInfo[0].updatedAt)} 지원 완료
                  </Text>
                )}
              </View>
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
                  {recruitInfo.dates.map(item => (
                    <Text
                      key={item.day + ' ' + item.time}
                      style={common.text_m}>
                      {item.day} {item.time}
                    </Text>
                  ))}
                </View>
              ) : (
                <View>
                  <View style={common.mb24}>
                    <Text style={[common.mb8, common.text_m, common.fwb]}>
                      수업날짜
                    </Text>
                    <Text style={common.text_m}>
                      {recruitInfo.dates[0].day}
                    </Text>
                  </View>
                  <View style={common.mb24}>
                    <Text style={[common.mb8, common.text_m, common.fwb]}>
                      수업시간
                    </Text>
                    <Text style={common.text_m}>
                      {recruitInfo.dates[0].time}
                    </Text>
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
                <Text style={[common.mb8, common.text_m, common.fwb]}>
                  경력
                </Text>
                <Text style={common.text_m}>{recruitInfo.career}</Text>
              </View>
              <View style={common.mb24}>
                <Text style={[common.mb8, common.text_m, common.fwb]}>
                  학력
                </Text>
                <Text style={common.text_m}>{recruitInfo.education}</Text>
              </View>
              <View style={common.mb24}>
                <Text style={[common.mb8, common.text_m, common.fwb]}>
                  급여
                </Text>
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
              {recruitInfo.writer?.type === 'COMPANY' && (
                <View>
                  <Text style={[common.mb8, common.text_m, common.fwb]}>
                    센터 정보
                  </Text>
                  <CenterInfoComponent centerInfo={recruitInfo.writer} />
                </View>
              )}
              <View style={common.mt40}>
                {recruitInfo.applyInfo && recruitInfo.applyInfo.length > 0 && (
                  <CTAButton
                    label="지원 취소하기"
                    variant="stroked"
                    disabled={shouldCancelButtonDisabled}
                    onPress={cancelModal.open}
                  />
                )}
              </View>
            </ScrollView>
          </SafeAreaView>
          {contentVerticalOffset <= 500 && (
            <FABContainer>
              <BoxButton label="지원하기" onPress={applyModal.open} />
            </FABContainer>
          )}
          <BottomSheet
            visible={cancelModal.visible}
            onDismiss={handleCancelModalClose}
            title="지원 취소할 날짜 및 시간을 선택하세요.">
            <View style={{paddingHorizontal: 16}}>
              {recruitDates.map((item, index) => (
                <ResumeDateListItem
                  key={index}
                  selected={selectedRecruitDates.includes(item.seq)}
                  disabled={!item.isApplied}
                  onPress={() => handleResumeDateListItemPress(item.seq)}
                  day={item.day}
                  time={item.time}
                />
              ))}
              <View style={common.mt40}>
                <CTAButton
                  label="지원 취소하기"
                  variant="stroked"
                  disabled={selectedRecruitDates.length === 0}
                  onPress={handleCancelButtonPress}
                />
              </View>
            </View>
          </BottomSheet>
          <BottomSheet
            visible={applyModal.visible}
            onDismiss={handleApplyModalClose}
            title="지원하기">
            <View style={{width: '100%', paddingHorizontal: 16}}>
              {resumes.length === 0 && <RegisterResumeButton />}
              {resumes.map((item, index) => (
                <ResumeListItem
                  key={index}
                  selected={selectedResumeSeq === item.seq}
                  isMaster={item.isMaster === 'Y'}
                  title={item.title}
                  updatedAt={formatDate(item.updatedAt)}
                  onPress={() => handleResumeListItemPress(item.seq)}
                />
              ))}
              {selectedResumeSeq && (
                <>
                  <View style={[common.mt40, common.mb8]}>
                    <Text style={common.title_s}>
                      지원할 날짜 및 시간을 선택하세요.
                    </Text>
                  </View>
                  {recruitDates.map((item, index) => (
                    <ResumeDateListItem
                      key={index}
                      selected={item.isSelected}
                      disabled={item.isApplied}
                      onPress={() => handleResumeDateListItemPress(item.seq)}
                      day={item.day}
                      time={item.time}
                    />
                  ))}
                </>
              )}
              <View style={common.mt40}>
                <CTAButton
                  label="지원하기"
                  disabled={
                    !selectedResumeSeq || selectedRecruitDates.length === 0
                  }
                  onPress={onApplyButtonPress}
                />
              </View>
            </View>
          </BottomSheet>
        </>
      )}
    </>
  );
};

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
