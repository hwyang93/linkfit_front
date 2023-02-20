import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {WHITE} from '@styles/colors';

import common from '@styles/common';

function ReceivedSuggestionDetailScreen() {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={[common.title_l, common.mt16, common.mb24]}>
          필라테스 전임 강사 제안
        </Text>
        <Text style={[common.text_m, common.fwb, common.mb8]}>제안 내용</Text>
        <Text style={[common.text_m, common.mb24]}>
          안녕하세요.링크 필라테스 입니다. 월, 수, 금 오전 수업을 담당해 주실
          전임 강사님을 구인 중입니다.
        </Text>
        <Text style={[common.text_m, common.fwb, common.mb8]}>구인 공고</Text>

        {/* 구인공고 영역 */}
        <View>
          <View style={[common.basicBox, common.mb24]}>
            <Text style={[common.title, common.mb12]} numberOfLines={1}>
              오래동안 함께 하실 필라테스 전임 강사님을 구합니다.
            </Text>
            <Text style={[common.text_s, common.fcg]}>
              전임 · 월,수,금 · 시간협의
            </Text>
          </View>
        </View>

        {/* 채용 기간 */}
        <Text style={[common.text_m, common.fwb, common.mb8]}>마감 기간</Text>
        <Text style={[common.text_m, common.mb24]}>채용시 마감</Text>

        {/* 센터 또는 강사 정보 */}
        <Text style={[common.text_m, common.fwb, common.mb8]}>
          제안한 센터 정보
        </Text>
      </View>
    </ScrollView>
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
