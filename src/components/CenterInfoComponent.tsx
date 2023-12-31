import { iconPath } from '@/lib/iconPath';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { GRAY } from '@styles/colors';
import common from '@styles/common';
import { Alert, Image, Pressable, Text, View } from 'react-native';
import { LoggedInParamList } from '../../AppInner';

interface CenterInfoProps {
  centerInfo: any;
}

const CenterInfoComponent: React.FC<CenterInfoProps> = ({ centerInfo }) => {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  // todo: 전화걸기 (시뮬레이션 환경에선 안됨)
  // import { Linking } from 'react-native';
  // () => Linking.openURL(`tel:01099003171`)
  // {Linking.openURL(`tel:${phoneNumber}`)}

  return (
    <Pressable onPress={() => navigation.navigate('CenterInfo', { memberSeq: centerInfo?.seq })}>
      {centerInfo?.profileImage && (
        <View style={common.mb16}>
          <Image
            source={{ uri: centerInfo?.profileImage.originFileUrl }}
            resizeMode={'cover'}
            style={common.imgBox}
          />
        </View>
      )}

      <Text style={common.title}>{centerInfo.company.companyName}</Text>
      <View style={common.rowCenterBetween}>
        <Text style={[common.text_s, { color: GRAY.DARK }]}>
          {centerInfo?.company.field +
            ' | ' +
            centerInfo?.company.address +
            ' · ' +
            centerInfo?.company.addressDetail}
        </Text>
        <View style={common.rowCenterBetween}>
          <Pressable style={common.mh4} onPress={() => Alert.alert('전화', '전화를 걸어주세용')}>
            <Image source={iconPath.PHONE} style={common.size24} />
          </Pressable>
          {/*<Pressable*/}
          {/*  style={common.mh4}*/}
          {/*  onPress={() => Alert.alert('쪽지', '쪽지를 보내주세용')}>*/}
          {/*  <Image source={iconPath.MESSAGE} style={common.size24} />*/}
          {/*</Pressable>*/}
          <Pressable style={common.mh4} onPress={() => Alert.alert('하트', '하트를 눌러주세용')}>
            <Image
              source={centerInfo?.isFollow === 'Y' ? iconPath.FAVORITE_ON : iconPath.FAVORITE}
              style={common.size24}
            />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};
export default CenterInfoComponent;
