import {
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

function ResumePreviewScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={common.row}>
        <View style={[styles.box, common.mb8]}>
          <Text style={[common.text, common.fs10, {color: BLUE.DEFAULT}]}>
            대표
          </Text>
        </View>
      </View>

      <View style={common.mb24}>
        <Text style={common.title_l}>이력서 제목</Text>
      </View>

      {/* 인적사항 */}
      <View style={common.mb24}>
        <View style={[common.rowCenter]}>
          <Text style={[common.title, common.mr8]}>이름</Text>
          <View style={common.rowCenter}>
            <Text style={[common.text_s, {color: BLUE.DEFAULT}]}>인증강사</Text>
            <Image
              style={{marginLeft: 2, width: 14, height: 14}}
              source={iconPath.CERTIFICATION}
            />
          </View>
        </View>

        <View style={[common.rowCenter]}>
          <Text style={[common.text_m, common.fwb, common.mr8]}>필라테스</Text>
          <Text style={[common.text, {alignSelf: 'flex-end'}]}>2년 6개월</Text>
          <Text style={[common.text_m, common.mh8, styles.divider]}>|</Text>
          <Text style={[common.text_m, common.fwb]}>24세</Text>
          <Text style={[common.text_m, common.mh8, styles.divider]}>|</Text>
          <Text style={[common.text_m, common.fwb]}>남</Text>
        </View>

        <Text style={[common.text_s, {color: GRAY.DARK}]}>
          서울 · 강남구 · 역삼동
        </Text>

        <Pressable style={styles.kebabIcon} hitSlop={10} onPress={() => {}}>
          <Image source={iconPath.KEBAB} style={[common.KEBAB]} />
        </Pressable>
        <Pressable style={styles.phoneIcon} hitSlop={10} onPress={() => {}}>
          <Image source={iconPath.PHONE} style={[common.size24]} />
        </Pressable>
      </View>

      <View style={common.mb24}>
        <Text style={[common.title, common.mr8]}>경력</Text>
        <Text style={[common.text_m, common.mv4]}>
          필라테스 전임 2022.10.11 ~ 2023.01.10
        </Text>
        <Text style={[common.text_m, common.mv4]}>
          필라테스 전임 2022.10.11 ~ 2023.01.10
        </Text>
        <Text style={[common.text_m, common.mv4]}>
          필라테스 전임 2022.10.11 ~ 2023.01.10
        </Text>
      </View>

      <View style={common.mb24}>
        <Text style={[common.title, common.mr8]}>학력</Text>
        <Text style={[common.text_m, common.mv4]}>
          링크 고등학교 2011.03 ~ 2014.02
        </Text>
        <Text style={[common.text_m, common.mv4]}>
          링크 대학교 2014.02 ~ 2018.02
        </Text>
      </View>

      <View style={common.mb24}>
        <Text style={[common.title, common.mr8]}>자격증</Text>
        <Text style={[common.text_m, common.mv4]}>
          자격증 명 2022.01.30 취득
        </Text>
      </View>

      <View style={common.mb24}>
        <Text style={[common.title, common.mr8]}>소개글</Text>
        <Text style={[common.text_m, common.mv4]}>
          저는 어려서부터 남들 다하는 외식 몇 번 한 적이 잦았고. 일터에 나가신
          어머니 집에 없으면 언제나 알프레도가 해주던 저녁.
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
  box: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: '#d7e0fd',
  },
  kebabIcon: {position: 'absolute', top: 0, right: 16},
  phoneIcon: {position: 'absolute', bottom: 0, right: 8},
  divider: {color: GRAY.DARK},
});

export default ResumePreviewScreen;
