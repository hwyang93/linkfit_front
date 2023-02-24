import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {WHITE} from '@styles/colors';

import common from '@styles/common';
import CenterInfoComponent from '@components/CenterInfoComponent';
import InstructorInfoComponent from '@components/InstructorInfoComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../../AppInner';

function ReceivedSuggestionDetailScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  const toOffer = () => {
    // navigation.navigate('JobPost');
  };
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={[common.title_l, common.mt16, common.mb16]}>
            필라테스 전임 강사 제안
          </Text>
          <View style={[common.row, common.mb24]}>
            <Text style={[common.text_s, common.fcg]}>~2022.12.09 마감</Text>
            <Text style={[common.text_s, common.fcg, common.mh8]}>|</Text>
            <Text style={[common.text_s, common.fcg]}>답변 대기 중</Text>
          </View>
          <Text style={[common.text_m, common.fwb, common.mb8]}>제안 내용</Text>
          <Text style={[common.text_m, common.mb24]}>
            안녕하세요.링크 필라테스 입니다. 월, 수, 금 오전 수업을 담당해 주실
            전임 강사님을 구인 중입니다.
          </Text>
          <Text style={[common.text_m, common.fwb, common.mb8]}>구인 공고</Text>

          {/* 구인공고 영역 */}
          <View style={common.mb24}>
            <Pressable style={[common.basicBox]} onPress={toOffer}>
              <Text style={[common.title, common.mb12]} numberOfLines={1}>
                오래동안 함께 하실 필라테스 전임 강사님을 구합니다.
              </Text>
              <Text style={[common.text_s, common.fcg]}>
                전임 · 월,수,금 · 시간협의
              </Text>
            </Pressable>
          </View>

          {/* 채용 기간 */}
          <Text style={[common.text_m, common.fwb, common.mb8]}>마감 기간</Text>
          <Text style={[common.text_m, common.mb24]}>채용시 마감</Text>

          {/* 센터 또는 강사 정보 조건부 렌더링 */}
          <View style={common.mb24}>
            <Pressable onPress={() => navigation.navigate('CenterInfo')}>
              <Text style={[common.text_m, common.fwb, common.mb8]}>
                제안한 센터 정보
              </Text>
              <View>
                <CenterInfoComponent />
              </View>
            </Pressable>
          </View>

          <View style={common.mb24}>
            <Text style={[common.text_m, common.fwb, common.mb8]}>
              제안한 강사 정보
            </Text>
            <View>
              <InstructorInfoComponent />
            </View>
          </View>

          {/* 수락하기 거절하기 버튼 */}
          <View style={common.mb16}>
            <Pressable onPress={() => {}}>
              <LinearGradient
                style={common.button}
                start={{x: 0.1, y: 0.5}}
                end={{x: 0.6, y: 1}}
                colors={['#74ebe4', '#3962f3']}>
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={common.buttonText}>수락하기</Text>
                )}
              </LinearGradient>
            </Pressable>
          </View>

          <View>
            <Pressable onPress={() => {}}>
              <LinearGradient
                style={common.button}
                start={{x: 0.1, y: 0.5}}
                end={{x: 0.6, y: 1}}
                colors={['#74ebe4', '#3962f3']}>
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={common.buttonText}>거절하기</Text>
                )}
              </LinearGradient>
            </Pressable>
          </View>
        </View>
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
});

export default ReceivedSuggestionDetailScreen;
