import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {WHITE} from '../styles/colors';
import common from '../styles/common';
import RecruitCarousel from '../components/RecruitCarousel';
import InstructorComponent from '../components/InstructorComponent';

function Link() {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const LINKS = [
    {
      num: 1,
      position: '요가',
      company: '신바람요가',
      area: '신림',
      src: require('../assets/images/sample_01.png'),
    },
    {
      num: 2,
      position: '필라테스',
      company: '어느날테스',
      area: '강남',
      src: require('../assets/images/sample_01.png'),
    },
    {
      num: 3,
      position: '필라요가',
      company: '요를레이',
      area: '역삼',
      src: require('../assets/images/sample_01.png'),
    },
    {
      num: 4,
      position: '요가파이어',
      company: '달심',
      area: '인도',
      src: require('../assets/images/sample_01.png'),
    },
  ];
  const INSTRUCTORS = [
    {
      position: '필라테스',
      career: '3년',
      nickname: '사오정',
      area: '서울 · 송파구 · 신천동',
      hit: 23,
    },
    {
      position: '요가',
      career: '32년',
      nickname: '그램마',
      area: '서울 · 송파구 · 지옥동',
      hit: 444,
    },
    {
      position: '태권',
      career: '1년',
      nickname: '박병장',
      area: '서울 · 종로구 · 신길동',
      hit: 36,
    },
  ];

  return (
    <ScrollView nestedScrollEnabled={true} style={{backgroundColor: WHITE}}>
      <View style={styles.container}>
        <View>
          <Text style={common.text_m}>구인 / 강사</Text>
        </View>
        {/* 채용 슬라이더 영역 */}
        <View style={common.mt40}>
          <Text style={[common.title]}>추천 채용</Text>
          <Text style={common.text_m}>
            내 주변의 채용중인 센터! 지금 바로 지원해 보세요.
          </Text>

          <View style={common.mt16}>
            <RecruitCarousel
              gap={16}
              offset={0}
              links={LINKS}
              pageWidth={screenWidth - (16 + 36) * 2}
            />
          </View>
        </View>
        {/*  추천 강사 영역 */}
        <View style={common.mt40}>
          <Text style={[common.title]}>추천 강사</Text>
          <Text style={common.text_m}>
            능력있는 강사들을 지금 바로 만나보세요!
          </Text>
          {/* 강사 리스트 */}
          <InstructorComponent list={INSTRUCTORS} />
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
});

export default Link;
