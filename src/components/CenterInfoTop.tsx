import { RecruitEntity } from '@/types/api/entities.type';
import { iconPath } from '@/utils/iconPath';
import OfferListItem from '@components/OfferListItem';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { GRAY } from '@styles/colors';
import common from '@styles/common';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { LoggedInParamList } from '../../AppInner';

interface CenterInfoTopProps {
  centerInfo: any;
  recruits: RecruitEntity[];
  fromMy?: boolean;
}

const CenterInfoTop: React.FC<CenterInfoTopProps> = ({ centerInfo, recruits, fromMy }) => {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  return (
    <View>
      {centerInfo.member?.profileImage && (
        <View style={common.mb16}>
          <Image
            source={{ uri: centerInfo.member.profileImage.originFileUrl }}
            resizeMode={'cover'}
            style={common.imgBox}
          />
        </View>
      )}

      <View style={[common.rowBetween, common.mb8]}>
        <View style={common.rowCenter}>
          <Text style={[common.title_l, common.mr8]}>{centerInfo.companyName}</Text>
          <Image
            source={centerInfo.isFollow === 'Y' ? iconPath.FAVORITE_ON : iconPath.FAVORITE}
            style={common.size24}
          />
          <Text style={[common.text_m, common.fwb]}>{centerInfo.followerCount}</Text>
        </View>
        {fromMy ? (
          <Pressable style={styles.pencil} onPress={() => navigation.navigate('CenterProfileEdit')}>
            <Image source={iconPath.PENCIL_B} style={[common.size24]} />
          </Pressable>
        ) : null}
      </View>
      <View style={[common.rowCenter, common.mb16]}>
        <Text style={[common.text_m, common.fwb]}>{centerInfo.field}</Text>
        <Text style={[common.mh8, common.fcg]}>|</Text>
        <Text style={[common.text_s, { color: GRAY.DARK }]}>
          {centerInfo.address + ' · ' + centerInfo.addressDetail}
        </Text>
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
};

const styles = StyleSheet.create({
  pencil: { position: 'absolute', top: 0, right: 0 },
});

export default CenterInfoTop;
