import {Image, Text, View} from 'react-native';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';
import {GRAY} from '@styles/colors';
import LinkCollection from '@components/LinkCollection';
import OfferListItem from '@components/OfferListItem';

function CenterInfoTop() {
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
    <View>
      <View>
        <Image
          source={require('../assets/images/center_01.png')}
          resizeMode={'cover'}
          style={common.imgBox}
        />
      </View>

      <View style={[common.rowBetween, common.mt16]}>
        <View style={common.rowCenter}>
          <Text style={[common.title_l, common.mr8]}>링크 필라테스</Text>
          <Image source={iconPath.FAVORITE} style={common.size24} />
          <Text style={[common.text_m, common.fwb]}>23</Text>
        </View>
      </View>

      <View style={[common.rowCenter, common.mt10]}>
        <Text style={[common.text_m, common.fwb]}>필라테스</Text>
        <Text style={[common.text_s, {color: GRAY.DARK}]}>
          {' '}
          | 서울 · 송파구
        </Text>
      </View>

      <View style={common.mt16}>
        <Text style={[common.text_m, common.fwb]}>소개글</Text>
        <Text style={common.text_m}>
          강남구 역삼동에 위치한 필라테스 센터입니다.
        </Text>
      </View>

      <View style={[common.mt20, common.rowCenterBetween]}>
        <Text style={[common.text_m, common.fwb]}>링크</Text>
        {/*링크 영역 */}
        <LinkCollection />
      </View>

      <View style={[common.mt20, common.mb16]}>
        <Text style={[common.text_m, common.fwb, common.mb8]}>채용 중</Text>

        {/* 채용중인 항목 리스트 */}
        <OfferListItem offer={OFFERS} button={true} />
      </View>
    </View>
  );
}

export default CenterInfoTop;
