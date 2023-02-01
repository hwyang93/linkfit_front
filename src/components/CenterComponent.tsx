import {Alert, Image, Pressable, Text, View} from 'react-native';
import common from '@styles/common';
import {GRAY} from '@styles/colors';
import {iconPath} from '@util/iconPath';

type infoProps = {
  title: string;
  type: string;
  location: string;
  tel: number;
};

function CenterComponent() {
  // todo: 전화걸기 (시뮬레이션 환경에선 안됨)
  // import { Linking } from 'react-native';
  // () => Linking.openURL(`tel:01099003171`)
  // {Linking.openURL(`tel:${phoneNumber}`)}
  return (
    <View>
      <Text style={common.title}>링크 필라테스</Text>
      <View style={common.rowCenterBetween}>
        <Text style={[common.text_s, {color: GRAY.DARK}]}>
          필라테스 | 서울 · 송파구
        </Text>
        <View style={common.rowCenterBetween}>
          <Pressable
            style={common.mh4}
            onPress={() => Alert.alert('전화', '전화를 걸어주세용')}>
            <Image source={iconPath.PHONE} style={common.size24} />
          </Pressable>
          <Pressable
            style={common.mh4}
            onPress={() => Alert.alert('쪽지', '쪽지를 보내주세용')}>
            <Image source={iconPath.MESSAGE} style={common.size24} />
          </Pressable>
          <Pressable
            style={common.mh4}
            onPress={() => Alert.alert('하트', '하트를 눌러주세용')}>
            <Image source={iconPath.FAVORITE} style={common.size24} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
export default CenterComponent;
