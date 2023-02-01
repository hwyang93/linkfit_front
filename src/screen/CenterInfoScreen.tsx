import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';

import common from '@styles/common';
import {GRAY, WHITE} from '@styles/colors';
import LinkCollection from '@components/LinkCollection';
import OfferListItem from '@components/OfferListItem';

function CenterInfoScreen() {
  // todo: 채용중 박스 클릭 시 구인 공고 JobPostScreen 으로 이동

  const OFFERS = [
    {
      id: 1,
      title: '필라테스 강사님 모십니다.',
      type: '파트',
      date: '월,수,금',
      time: '시간협의',
    },
    {
      id: 2,
      title: '오랫동안 함께 하실 필라테스 강사님 이라샤이마세이.',
      type: '전임',
      date: '월,수,금',
      time: '시간협의',
    },
    {
      id: 3,
      title: '필라테스 강사님 모십니다.',
      type: '파트',
      date: '월,수,금',
      time: '시간협의',
    },
    {
      id: 4,
      title: '오랫동안 함께 하실 필라테스 강사님 이라샤이마세이.',
      type: '전임',
      date: '월,수,금',
      time: '시간협의',
    },
    {
      id: 5,
      title: '필라테스 강사님 모십니다.',
      type: '파트',
      date: '월,수,금',
      time: '시간협의',
    },
    {
      id: 6,
      title: '오랫동안 함께 하실 필라테스 강사님 이라샤이마세이.',
      type: '전임',
      date: '월,수,금',
      time: '시간협의',
    },
    {
      id: 7,
      title: '필라테스 강사님 모십니다.',
      type: '파트',
      date: '월,수,금',
      time: '시간협의',
    },
    {
      id: 8,
      title: '오랫동안 함께 하실 필라테스 강사님 이라샤이마세이.',
      type: '전임',
      date: '월,수,금',
      time: '시간협의',
    },
    {
      id: 9,
      title: '필라테스 강사님 모십니다.',
      type: '파트',
      date: '월,수,금',
      time: '시간협의',
    },
    {
      id: 10,
      title: '오랫동안 함께 하실 필라테스 강사님 이라샤이마세이.',
      type: '전임',
      date: '월,수,금',
      time: '시간협의',
    },
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={common.mb16}>
          <Image
            source={require('../assets/images/center_01.png')}
            resizeMode={'cover'}
            style={styles.imgBox}
          />
        </View>

        <View style={[common.rowBetween, common.mb16]}>
          <View style={common.rowCenter}>
            <Text style={[common.title_l, common.mr8]}>링크 필라테스</Text>
            <Text style={[common.text, {alignSelf: 'flex-start'}]}>
              필라테스
            </Text>
          </View>
          {/*링크 영역 */}
          <LinkCollection />
        </View>
        <View style={common.row}>
          <Text style={[common.text_s, styles.tag]}>#Tag</Text>
          <Text style={[common.text_s, styles.tag]}>#Tag</Text>
        </View>

        <View style={common.mt40}>
          <Text style={[common.text_m, common.fwb, common.mb8]}>채용 중</Text>

          {/* 채용중인 항목 리스트 */}
          <OfferListItem offer={OFFERS} button={true} />

          <View style={common.mt40}>
            <Text style={[common.text_m, common.fwb]}>센터 소개</Text>
            <Text style={common.text_s}>센터 소개글.</Text>
          </View>
          <View style={common.mt24}>
            <Text style={[common.text_m, common.fwb]}>센터 소개</Text>
            <Text style={common.text_s}>센터 소개글.</Text>
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
    backgroundColor: WHITE,
  },
  imgBox: {
    width: '100%',
    height: 160,
    borderRadius: 8,
  },
  tagArea: {},
  tag: {marginRight: 8, color: GRAY.DARK},
});
export default CenterInfoScreen;
