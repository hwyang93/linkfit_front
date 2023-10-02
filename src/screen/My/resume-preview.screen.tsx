import Chip from '@/components/Common/Chip';
import CTAButton from '@/components/Common/CTAButton';
import { useRecruitApplicationList } from '@/hooks/recruit/use-recruit-application-list';
import { useResume } from '@/hooks/resume/use-resume';
import { MEMBER_TYPE } from '@/lib/constants/enum';
import { ROUTE } from '@/lib/constants/route';
import { iconPath } from '@/lib/iconPath';
import { useAppSelector } from '@/store';
import { updateRecruitApplyStatus } from '@api/recruit';
import Modal from '@components/ModalSheet';
import toast from '@hooks/toast';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BLUE, GRAY, WHITE } from '@styles/colors';
import common from '@styles/common';
import { useCallback, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoggedInParamList } from '../../../AppInner';

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.MY.RESUME_PREVIEW>;

export const ResumePreviewScreen = ({ route, navigation }: Props) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState<any[]>([]);
  const [resume, setResume] = useState<any>({});
  const [applyResult, setApplyResult] = useState('');
  const [application, setApplication] = useState<any>({});

  const memberInfo = useAppSelector((state) => state.user);

  const recruitApplicationQuery = useRecruitApplicationList(route.params.applySeq);

  const resumeQuery = useResume(route.params.resumeSeq);

  const onUpdatePassOrNot = useCallback(
    (status: string) => {
      updateRecruitApplyStatus(route.params.applySeq, { status: status })
        .then(() => {
          setLoading(true);
          toast.success({ message: '합격 여부 전달이 완료되었어요!' });
          navigation.navigate('ApplicantStatus', {
            recruitSeq: route.params.recruitSeq,
          });
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          toast.error({ message: error.message });
        });
    },
    [navigation, route.params.applySeq, route.params.recruitSeq],
  );

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
    // TODO: 기능 추가
    navigation.navigate(ROUTE.MY.REVIEW_EDIT, { reviewId: 1 });
  };

  return (
    <SafeAreaView edges={['left', 'right']} style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ margin: 16, paddingBottom: 32 }}>
        {applyResult !== 'APPLY' && applyResult !== 'PASS' && resume.isMaster === 'Y' && (
          <Chip label="대표" />
        )}
        <View style={common.mb24}>
          <Text style={common.title_l}>{resume.title}</Text>
        </View>
        <View style={common.mb24}>
          <View style={[common.rowCenter, common.mb8]}>
            <Text style={[common.title, common.mr8]}>{resume.name}</Text>
            {resume.writer?.type === MEMBER_TYPE.INSTRUCTOR && (
              <View style={common.rowCenter}>
                <Text style={[common.text_s, { color: BLUE.DEFAULT }]}>인증강사</Text>
                <Image
                  style={{ marginLeft: 2, width: 14, height: 14 }}
                  source={iconPath.CERTIFICATION}
                />
              </View>
            )}
          </View>

          <View style={[common.rowCenter, common.mb8]}>
            <Text style={[common.text_m, common.fwb, common.mr8]}>{resume.writer?.field}</Text>
            <Text style={[common.text, { alignSelf: 'flex-end' }]}>{resume.writer?.career}</Text>
            <Text style={[common.text_m, common.mh8, common.fcg]}>|</Text>
            <Text style={[common.text_m, common.fwb]}>24세</Text>
            <Text style={[common.text_m, common.mh8, common.fcg]}>|</Text>
            <Text style={[common.text_m, common.fwb]}>{resume.writer?.gender}</Text>
          </View>
          {resume.writer?.regionAuth && (
            <Text style={[common.text_s, { color: GRAY.DARK }]}>
              {`${resume.writer?.regionAuth.region1depth} · ${resume.writer?.regionAuth.region2depth} · ${resume.writer?.regionAuth.region3depth}`}
            </Text>
          )}

          <Pressable style={styles.phoneIcon} hitSlop={10} onPress={() => {}}>
            <Image source={iconPath.PHONE} style={common.size24} />
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
                  style={[common.text_m, common.mv2]}>{`${career.field} ${career.workType}`}</Text>
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
                <Text style={[common.text_m, common.mv2]}>{education.school}</Text>
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
              <Text style={[common.text_m, common.mv2]}>{resume.licence.licenceNumber}</Text>
              <Text style={[common.text_m, common.mv2, common.fcg]}>2022.01.30 취득</Text>
            </View>
          )}
        </View>
        {applyResult === 'APPLY' && (
          <View style={common.mt20}>
            <CTAButton label="합격 여부 전달하기" loading={loading} onPress={passModal} />
          </View>
        )}
        {applyResult === 'PASS' && (
          <View style={common.mt20}>
            <CTAButton label="후기 작성하기" loading={loading} onPress={toReview} />
          </View>
        )}
        <Modal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          title={modalTitle}
          modalData={modalData}
          type={'button'}
          content={
            <View>
              {MODAL.map((item, index) => (
                <View key={index} style={[common.modalItemBox, { paddingVertical: 8 }]}>
                  <CTAButton label={item.value} loading={loading} onPress={item.job} />
                </View>
              ))}
            </View>
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#d7e0fd',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  container: {
    backgroundColor: WHITE,
    flex: 1,
  },
  kebabIcon: { position: 'absolute', right: 16, top: 0 },
  line: {
    backgroundColor: GRAY.DARK,
    height: 1,
    marginBottom: 12,
    marginTop: 8,
  },
  phoneIcon: { bottom: 0, position: 'absolute', right: 8 },
});