import BottomSheet from '@/components/Common/BottomSheet';
import Chip from '@/components/Common/Chip';
import CTAButton from '@/components/Common/CTAButton';
import { useRecruitApplicationList } from '@/hooks/recruit/use-recruit-application-list';
import { useUpdateRecruitApplyStatus } from '@/hooks/recruit/use-update-recruit-apply-status';
import { useResume } from '@/hooks/resume/use-resume';
import useAuth from '@/hooks/use-auth';
import useModal from '@/hooks/use-modal';
import { MEMBER_TYPE } from '@/lib/constants/enum';
import { ROUTE } from '@/lib/constants/route';
import { iconPath } from '@/lib/iconPath';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BLUE, GRAY, WHITE } from '@styles/colors';
import common from '@styles/common';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoggedInParamList } from '../../../AppInner';

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.RESUME.PREVIEW>;

export const ResumePreviewScreen = ({ route, navigation }: Props) => {
  const { user } = useAuth();

  const recruitApplicationQuery = useRecruitApplicationList(route.params.applySeq || 0, {
    enabled: !!route.params.applySeq,
  });
  console.log('recruitApplicationQuery', recruitApplicationQuery.data);

  const applyResult = recruitApplicationQuery.data?.recruit.status;

  const resumeQuery = useResume(route.params.resumeSeq);

  const resume = resumeQuery.data;

  const updateRecruitApplyStatusMutation = useUpdateRecruitApplyStatus();

  const passOrNotModal = useModal();

  const onUpdatePassOrNot = async (status: string) => {
    if (!route.params.applySeq || !route.params.recruitSeq) return;

    updateRecruitApplyStatusMutation.mutate(
      {
        seq: route.params.applySeq,
        body: { status: status },
      },
      {
        onSuccess: () =>
          navigation.navigate(ROUTE.MY.APPLICANT_STATUS, {
            recruitSeq: route.params.recruitSeq!,
          }),
      },
    );
  };

  const toReview = () => {
    // const params = {
    //   recruitSeq: application.recruitSeq,
    //   evaluationMemberSeq: memberInfo.seq,
    //   targetMemberSeq: application.memberSeq,
    // };
    // TODO: 기능 추가
    navigation.navigate(ROUTE.MY.REVIEW_EDIT, { reviewId: 1 });
  };

  if (!resume) return null;

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
            <CTAButton label="합격 여부 전달하기" onPress={passOrNotModal.open} />
          </View>
        )}
        {applyResult === 'PASS' && (
          <View style={common.mt20}>
            <CTAButton label="후기 작성하기" onPress={toReview} />
          </View>
        )}
        <BottomSheet visible={passOrNotModal.visible} onDismiss={passOrNotModal.close}>
          <CTAButton label="합격" />
          <CTAButton label="불합격" />
        </BottomSheet>
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
