import {FetchPositionSuggestResponse} from '@/types/api/member';
import {fetchPositionSuggest, updatePositionSuggestStatus} from '@api/member';
import InstructorInfoComponent from '@components/InstructorInfoComponent';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LoggedInParamList} from '../../../AppInner';

const LOADING = false;

type Props = NativeStackScreenProps<
  LoggedInParamList,
  'ReceivedSuggestionDetail'
>;

const ReceivedSuggestionDetailScreen = ({route, navigation}: Props) => {
  const [suggestInfo, setSuggestInfo] =
    useState<FetchPositionSuggestResponse>();

  const getSuggestInfo = useCallback(() => {
    fetchPositionSuggest(route.params.suggestSeq)
      .then(({data}) => {
        setSuggestInfo(data);
      })
      .catch(error => {
        Alert.alert(error.message);
        navigation.goBack();
      });
  }, [route.params.suggestSeq, navigation]);

  const onUpdateSuggestStatus = useCallback(
    (status: string) => {
      const data = {status: status};
      updatePositionSuggestStatus(route.params.suggestSeq, data)
        .then(() => {
          Alert.alert('제안 답변이 완료되었습니다!');
          getSuggestInfo();
        })
        .catch(error => {
          Alert.alert(error.message);
        });
    },
    [getSuggestInfo, route.params.suggestSeq],
  );

  useEffect(() => {
    getSuggestInfo();
  }, [getSuggestInfo]);

  const toOffer = () => {
    // navigation.navigate('JobPost');
  };
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={[common.title_l, common.mt16, common.mb16]}>
            {suggestInfo?.title}
          </Text>
          <View style={[common.row, common.mb24]}>
            <Text style={[common.text_s, common.fcg]}>
              {!suggestInfo?.closingDate
                ? '채용시 마감'
                : `~${suggestInfo.closingDate} 마감`}
            </Text>
            <Text style={[common.text_s, common.fcg, common.mh8]}>|</Text>
            <Text style={[common.text_s, common.fcg]}>
              {suggestInfo?.status}
            </Text>
          </View>
          <Text style={[common.text_m, common.fwb, common.mb8]}>제안 내용</Text>
          <Text style={[common.text_m, common.mb24]}>
            {suggestInfo?.contents}
          </Text>
          {suggestInfo?.recruit && (
            <View>
              <Text style={[common.text_m, common.fwb, common.mb8]}>
                구인 공고
              </Text>

              {/* 구인공고 영역 */}
              <View style={common.mb24}>
                <Pressable style={[common.basicBox]} onPress={toOffer}>
                  <Text style={[common.title, common.mb12]} numberOfLines={1}>
                    {suggestInfo.recruit.title}
                  </Text>
                  <Text style={[common.text_s, common.fcg]}>
                    {suggestInfo.recruit.recruitType}
                  </Text>
                </Pressable>
              </View>
            </View>
          )}

          {/* 채용 기간 */}
          <Text style={[common.text_m, common.fwb, common.mb8]}>마감 기간</Text>
          <Text style={[common.text_m, common.mb24]}>
            {!suggestInfo?.closingDate
              ? '채용시 마감'
              : `~${suggestInfo.closingDate} 마감`}
          </Text>

          {suggestInfo?.writer.type === 'COMPANY' && (
            <View style={common.mb24}>
              <Pressable
                onPress={() =>
                  navigation.navigate('CenterInfo', {
                    memberSeq: suggestInfo.writer.memberSeq,
                  })
                }>
                <Text style={[common.text_m, common.fwb, common.mb8]}>
                  제안한 센터 정보
                </Text>
                <View>{/* <CenterInfoComponent centerInfo={}/> */}</View>
              </Pressable>
            </View>
          )}

          {suggestInfo?.writer.type === 'INSTRUCTOR' && (
            <View style={common.mb24}>
              <Text style={[common.text_m, common.fwb, common.mb8]}>
                제안한 강사 정보
              </Text>
              <View>
                <InstructorInfoComponent />
              </View>
            </View>
          )}

          {/* 수락하기 거절하기 버튼 */}
          {suggestInfo?.status === 'WAITING' && (
            <View>
              <View style={common.mb16}>
                <Pressable
                  onPress={() => {
                    onUpdateSuggestStatus('ACCEPT');
                  }}>
                  <LinearGradient
                    style={common.button}
                    start={{x: 0.1, y: 0.5}}
                    end={{x: 0.6, y: 1}}
                    colors={['#74ebe4', '#3962f3']}>
                    {LOADING ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text style={common.buttonText}>수락하기</Text>
                    )}
                  </LinearGradient>
                </Pressable>
              </View>

              <View>
                <Pressable
                  onPress={() => {
                    onUpdateSuggestStatus('REJECT');
                  }}>
                  <LinearGradient
                    style={common.button}
                    start={{x: 0.1, y: 0.5}}
                    end={{x: 0.6, y: 1}}
                    colors={['#74ebe4', '#3962f3']}>
                    {LOADING ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text style={common.buttonText}>거절하기</Text>
                    )}
                  </LinearGradient>
                </Pressable>
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

export default ReceivedSuggestionDetailScreen;
