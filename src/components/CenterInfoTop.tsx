import {Image, Text, View} from 'react-native';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';
import {GRAY} from '@styles/colors';
// import LinkCollection from '@components/LinkCollection';
import OfferListItem from '@components/OfferListItem';

type Props = {
  centerInfo: any;
  recruits: any[];
};
function CenterInfoTop({centerInfo, recruits}: Props) {
  return (
    <View>
      <View style={common.mb16}>
        <Image
          source={require('../assets/images/center_01.png')}
          resizeMode={'cover'}
          style={common.imgBox}
        />
      </View>
      <View style={[common.rowBetween, common.mb8]}>
        <View style={common.rowCenter}>
          <Text style={[common.title_l, common.mr8]}>
            {centerInfo.companyName}
          </Text>
          <Image source={iconPath.FAVORITE} style={common.size24} />
          <Text style={[common.text_m, common.fwb]}>23</Text>
        </View>
      </View>
      <View style={[common.rowCenter, common.mb16]}>
        <Text style={[common.text_m, common.fwb]}>{centerInfo.field}</Text>
        <Text style={[common.mh8, common.fcg]}>|</Text>
        <Text style={[common.text_s, {color: GRAY.DARK}]}>서울 · 송파구</Text>
      </View>
      <View style={common.mb16}>
        <Text style={[common.text_m, common.fwb]}>소개글</Text>
        <Text style={common.text_m}>{centerInfo.intro}</Text>
      </View>

      {/*<View style={[common.mt20, common.rowCenterBetween]}>*/}
      {/*  <Text style={[common.text_m, common.fwb]}>링크</Text>*/}
      {/*  /!*링크 영역 *!/*/}
      {/*  <LinkCollection />*/}
      {/*</View>*/}

      <View style={[common.mt20, common.mb16]}>
        <Text style={[common.text_m, common.fwb, common.mb8]}>채용 중</Text>
        {/* 채용중인 항목 리스트 */}
        <OfferListItem offer={recruits} button={true} />
      </View>
    </View>
  );
}

export default CenterInfoTop;
