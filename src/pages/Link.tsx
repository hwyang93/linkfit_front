import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {WHITE} from '../styles/colors';
import common from '../styles/common';
import RecruitCarousel from '../components/RecruitCarousel';
import {iconPath} from '../util/iconPath';

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
      id: 1,
      position: '업종',
      nickname: '닉네임',
      area: '서울 · 송파구 · 신천동',
      hit: 23,
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
        <View style={styles.box}>
          <Text style={[common.title]}>추천 강사</Text>
          <Text style={common.text_m}>
            능력있는 강사들을 지금 바로 만나보세요!
          </Text>
          {/* 강사 리스트 */}
          <View style={styles.listBox}>
            <View style={{marginRight: 16}}>
              <Image
                source={require('../assets/images/thumbnail.png')}
                style={{width: 80, height: 80}}
                resizeMode="cover"
              />
            </View>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[common.text_s, common.fwb, common.mr8]}>
                  필라테스
                </Text>
                <Text style={[common.text_s]}>3년</Text>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[common.text_m, common.fwb, common.mr8]}>
                  닉네임
                </Text>
                <Text style={[common.text_s, {color: '#3962f3'}]}>
                  인증강사
                </Text>
              </View>
              <Text style={[common.text_s]}>서울 · 송파구 · 신천동</Text>
            </View>
            <Image
              source={require('../assets/images/icon/more_vert.png')}
              style={{
                width: 4,
                height: 16,
                position: 'absolute',
                top: 16,
                right: 0,
              }}
            />
            <View style={styles.rightBox}>
              <Pressable>
                <Image
                  source={iconPath.MESSAGE}
                  style={{width: 24, height: 24, marginRight: 8}}
                />
              </Pressable>
              <Pressable>
                <Image
                  source={iconPath.FAVORITE}
                  style={{width: 24, height: 24, marginRight: 8}}
                />
              </Pressable>
              <Text style={[common.text_m, common.fwb]}>23</Text>
            </View>
          </View>
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
  listBox: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
  },
  rightBox: {
    position: 'absolute',
    bottom: 16,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Link;
