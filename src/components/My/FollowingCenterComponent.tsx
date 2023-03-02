import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GRAY} from '@styles/colors';
import CenterInfoComponent from '@components/CenterInfoComponent';
import hairlineWidth = StyleSheet.hairlineWidth;
import common from '@styles/common';
import {iconPath} from '@util/iconPath';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../../AppInner';

function FollowingCenterComponent() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const CENTER = [
    {
      image: '',
      title: '',
      field: '',
      location: '',
      phoneNumber: '',
      message: '',
      favorite: '',
    },
  ];
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.listBox}>
        <Pressable onPress={() => navigation.navigate('CenterInfo')}>
          <View style={common.mb16}>
            <Image
              source={require('@images/center_01.png')}
              resizeMode={'cover'}
              style={common.imgBox}
            />
          </View>
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
        </Pressable>
      </View>

      {/*<View style={styles.followingBox}>*/}
      {/*  <View>*/}
      {/*    <CenterInfoComponent />*/}
      {/*  </View>*/}
      {/*</View>*/}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  listBox: {
    paddingVertical: 16,
    borderBottomWidth: hairlineWidth,
    borderColor: GRAY.DEFAULT,
  },
  thumbnail: {marginBottom: 16, width: '100%', height: 160, borderRadius: 8},
  kebabIcon: {position: 'absolute', top: 16, right: 0},
});

export default FollowingCenterComponent;
