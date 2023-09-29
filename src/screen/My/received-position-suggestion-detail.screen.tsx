import CTAButton from '@/components/Common/CTAButton';
import { useReceivedPositionSuggestion } from '@/hooks/member/use-received-position-suggestion';
import { useUpdatePositionSuggestion } from '@/hooks/member/use-update-position-suggestion';
import { RecruitStatus } from '@/types/api/recruit.type';
import { Member } from '@/types/common';
import { REPLY_STATUS_KO } from '@/utils/constants/enum';
import { ROUTE } from '@/utils/constants/route';
import InstructorInfoComponent from '@components/InstructorInfoComponent';
import toast from '@hooks/toast';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WHITE } from '@styles/colors';
import common from '@styles/common';
import { isAxiosError } from 'axios';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoggedInParamList } from '../../../AppInner';

type Props = NativeStackScreenProps<
  LoggedInParamList,
  typeof ROUTE.MY.RECEIVED_POSITION_SUGGESTION_DETAIL
>;

export const ReceivedPositionSuggestionDetailScreen = ({ route, navigation }: Props) => {
  const { data } = useReceivedPositionSuggestion(route.params.suggestSeq);
  const suggestInfo = data;

  const updatePositionSuggestionMutation = useUpdatePositionSuggestion();

  const onUpdateSuggestStatus = (status: string) => {
    const data = { status: status };
    updatePositionSuggestionMutation.mutate(
      {
        suggestionId: route.params.suggestSeq,
        body: data,
      },
      {
        onSuccess: () => toast.success({ message: '제안 답변이 완료되었습니다!' }),
        onError: (error) => isAxiosError(error) && toast.error({ message: error.message }),
      },
    );
  };

  const toOffer = () => {
    // navigation.navigate('JobPost');
  };

  if (!suggestInfo) return null;

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={[common.title_l, common.mt16, common.mb16]}>{suggestInfo.title}</Text>
          <View style={[common.row, common.mb24]}>
            <Text style={[common.text_s, common.fcg]}>
              {!suggestInfo.closingDate ? '채용시 마감' : `~${suggestInfo.closingDate} 마감`}
            </Text>
            <Text style={[common.text_s, common.fcg, common.mh8]}>|</Text>
            <Text style={[common.text_s, common.fcg]}>{REPLY_STATUS_KO[suggestInfo.status]}</Text>
          </View>
          <Text style={[common.text_m, common.fwb, common.mb8]}>제안 내용</Text>
          <Text style={[common.text_m, common.mb24]}>{suggestInfo.contents}</Text>
          {suggestInfo.recruit && (
            <View>
              <Text style={[common.text_m, common.fwb, common.mb8]}>구인 공고</Text>

              {/* 구인공고 영역 */}
              <View style={common.mb24}>
                <Pressable style={[common.basicBox]} onPress={toOffer}>
                  <Text style={[common.title, common.mb12]} numberOfLines={1}>
                    {suggestInfo.recruit.title}
                  </Text>
                  <Text style={[common.text_s, common.fcg]}>{suggestInfo.recruit.recruitType}</Text>
                </Pressable>
              </View>
            </View>
          )}

          {/* 채용 기간 */}
          <Text style={[common.text_m, common.fwb, common.mb8]}>마감 기간</Text>
          <Text style={[common.text_m, common.mb24]}>
            {!suggestInfo.closingDate ? '채용시 마감' : `~${suggestInfo.closingDate} 마감`}
          </Text>

          {suggestInfo.writer.type === Member.Company && (
            <View style={common.mb24}>
              <Pressable
                onPress={() =>
                  navigation.navigate('CenterInfo', {
                    memberSeq: suggestInfo.writer.memberSeq,
                  })
                }>
                <Text style={[common.text_m, common.fwb, common.mb8]}>제안한 센터 정보</Text>
                <View>{/* <CenterInfoComponent centerInfo={}/> */}</View>
              </Pressable>
            </View>
          )}
          {suggestInfo?.writer.type === Member.Instructor && (
            <View style={common.mb24}>
              <Text style={[common.text_m, common.fwb, common.mb8]}>제안한 강사 정보</Text>
              <View>
                <InstructorInfoComponent />
              </View>
            </View>
          )}
          {suggestInfo?.status === RecruitStatus.Waiting && (
            <View>
              <View style={common.mb16}>
                <CTAButton
                  label="수락하기"
                  loading={updatePositionSuggestionMutation.isLoading}
                  onPress={() => onUpdateSuggestStatus('ACCEPT')}
                />
              </View>
              <View>
                <CTAButton
                  label="거절하기"
                  loading={updatePositionSuggestionMutation.isLoading}
                  onPress={() => onUpdateSuggestStatus('REJECT')}
                />
              </View>
            </View>
          )}
        </View>
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
});
