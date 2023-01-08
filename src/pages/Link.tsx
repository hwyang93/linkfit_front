import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {WHITE} from '../styles/colors';
import common from '../styles/common';
import RecruitCarousel from '../components/RecruitCarousel';

function Link() {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const LINKS = [
    {
      num: 1,
      position: '요가',
      company: '신바람요가',
      area: '신림',
      src: 'sample_01',
    },
    {
      num: 2,
      position: '필라테스',
      company: '어느날테스',
      area: '강남',
      src: 'sample_01',
    },
    {
      num: 3,
      position: '필라요가',
      company: '요를레이',
      area: '역삼',
      src: 'sample_01',
    },
    {
      num: 4,
      position: '요가파이어',
      company: '달심',
      area: '인도',
      src: 'sample_01',
    },
  ];
  return (
    <ScrollView style={{backgroundColor: WHITE}}>
      <View style={styles.container}>
        <View>
          <Text style={common.text_m}>구인 / 강사</Text>
        </View>
        {/* 채용 슬라이더 영역 */}
        <View style={styles.box}>
          <Text style={[common.title]}>추천 채용</Text>
          <Text style={common.text_m}>
            내 주변의 채용중인 센터! 지금 바로 지원해 보세요.
          </Text>

          <View style={styles.slideWrap}>
            <RecruitCarousel
              gap={16}
              offset={0}
              links={LINKS}
              pageWidth={screenWidth - (16 + 36) * 2}
            />
            {/*<View style={styles.slideBox}>*/}
            {/*  <View style={styles.imgBox}>*/}
            {/*    <Image*/}
            {/*      source={require('../assets/images/sample_01.png')}*/}
            {/*      resizeMode={'cover'}*/}
            {/*    />*/}
            {/*  </View>*/}
            {/*  <View style={styles.infoBox}>*/}
            {/*    <Text style={[common.text_m, common.fwb]}>포지션</Text>*/}
            {/*    <Text style={[common.text_s, common.fwb]}>업체명</Text>*/}
            {/*    <Text style={common.text_s}>지역</Text>*/}
            {/*    <Image*/}
            {/*      source={require('../assets/images/icon/bookmark.png')}*/}
            {/*      style={styles.bookmark}*/}
            {/*    />*/}
            {/*  </View>*/}
            {/*</View>*/}
          </View>
        </View>
        {/*  추천 강사 스크롤 영역 */}
        <View style={styles.box}>
          <Text style={[common.title]}>추천 강사</Text>
          <Text style={common.text_m}>
            능력있는 강사들을 지금 바로 만나보세요!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  box: {marginTop: 40},
  slideWrap: {marginTop: 16},
  // slideBox: {marginRight: 8, width: 160, height: 172},
  // imgBox: {marginBottom: 8, width: 160, height: 104, borderRadius: 8},
  // infoBox: {position: 'relative'},
  // bookmark: {position: 'absolute', top: 0, right: 0, width: 14, height: 18},
});

export default Link;
