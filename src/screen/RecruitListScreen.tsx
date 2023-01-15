import {Image, StyleSheet, Text, View} from 'react-native';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';

function RecruitListScreen() {
  return (
    <View style={styles.container}>
      <Text style={[common.title]}>구인 공고</Text>
      <Text style={common.text_m}>내 주변의 구인 공고를 만나보세요!</Text>

      <View style={styles.slideWrap}>
        <View style={styles.slideBox}>
          <View style={styles.imgBox}>
            <Image
              source={require('../assets/images/sample_01.png')}
              style={styles.img}
            />
          </View>
          <View style={styles.infoBox}>
            {/* 포지션 */}
            <Text style={[common.text_m, common.fwb]}>포지션</Text>
            <Text style={[common.text_m, common.fwb]}>제목</Text>
            {/* 업체명 */}
            <Text style={[common.text_s, common.fwb]}>업종</Text>
            {/* 지역 */}
            <Text style={common.text_s}>지역</Text>
            <Image
              source={iconPath.BOOKMARK}
              style={[common.BOOKMARK, styles.bookmark]}
            />
          </View>
        </View>

        <View style={styles.slideBox}>
          <View style={styles.imgBox}>
            <Image
              source={require('../assets/images/sample_01.png')}
              style={styles.img}
            />
          </View>
          <View style={styles.infoBox}>
            {/* 포지션 */}
            <Text style={[common.text_m, common.fwb]}>포지션</Text>
            <Text style={[common.text_m, common.fwb]}>제목</Text>
            {/* 업체명 */}
            <Text style={[common.text_s, common.fwb]}>업종</Text>
            {/* 지역 */}
            <Text style={common.text_s}>지역</Text>
            <Image
              source={iconPath.BOOKMARK}
              style={[common.BOOKMARK, styles.bookmark]}
            />
          </View>
        </View>

        <View style={styles.slideBox}>
          <View style={styles.imgBox}>
            <Image
              source={require('../assets/images/sample_01.png')}
              style={styles.img}
            />
          </View>
          <View style={styles.infoBox}>
            {/* 포지션 */}
            <Text style={[common.text_m, common.fwb]}>포지션</Text>
            <Text style={[common.text_m, common.fwb]}>제목</Text>
            {/* 업체명 */}
            <Text style={[common.text_s, common.fwb]}>업종</Text>
            {/* 지역 */}
            <Text style={common.text_s}>지역</Text>
            <Image
              source={iconPath.BOOKMARK}
              style={[common.BOOKMARK, styles.bookmark]}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  slideWrap: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 16,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  slideBox: {width: '49%', marginBottom: 16},
  imgBox: {
    marginBottom: 8,
    width: '100%',
    height: 104,
    borderRadius: 8,
  },
  img: {width: '100%', borderRadius: 8},
  infoBox: {position: 'relative', width: '100%'},
  bookmark: {position: 'absolute', top: 5, right: 0},
});
export default RecruitListScreen;
