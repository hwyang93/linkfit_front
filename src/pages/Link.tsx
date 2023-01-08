import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {WHITE} from '../styles/colors';
import common from '../styles/common';

function Link() {
  return (
    <ScrollView style={{backgroundColor: WHITE}}>
      <View style={styles.container}>
        <View>
          <Text style={common.text_m}>구인 / 강사</Text>
        </View>
        {/* 채용 슬라이더 영역 */}
        <View style={styles.box}>
          <Text style={[common.title, common.mt40]}>추천 채용</Text>
          <Text style={common.text_m}>
            내 주변의 채용중인 센터! 지금 바로 지원해 보세요.
          </Text>

          <View style={styles.slideWrap}>
            <View style={styles.slideBox}>
              <View style={styles.imgBox}>
                <Image
                  source={require('../assets/images/sample_01.png')}
                  resizeMode={'cover'}
                />
              </View>
              <View style={styles.infoBox}>
                <Text style={[common.text_m, common.fwb]}>포지션</Text>
                <Text style={[common.text_s, common.fwb]}>업체명</Text>
                <Text style={common.text_s}>지역</Text>
                <Image
                  source={require('../assets/images/icon/bookmark.png')}
                  style={styles.bookmark}
                />
              </View>
            </View>
          </View>
        </View>
        {/*  추천 강사 스크롤 영역 */}
        <View style={styles.box}>
          <Text style={[common.title, common.mt40]}>추천 강사</Text>
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
  slideBox: {marginRight: 8, width: 160, height: 172},
  imgBox: {marginBottom: 8, width: 160, height: 104, borderRadius: 8},
  infoBox: {position: 'relative'},
  bookmark: {position: 'absolute', top: 0, right: 0, width: 14, height: 18},
});

export default Link;
