import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';
import {GRAY} from '@styles/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';

function ProfileBox({memberInfo}: any) {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  return (
    <View>
      <Pressable style={styles.profileBox} onPress={() => {}}>
        <View>
          <View style={common.rowCenter}>
            <Text style={[common.text_l, common.fwb, common.mr8]}>
              링크 필라테스
            </Text>
            <View style={common.rowCenter}>
              <Pressable onPress={() => Alert.alert('click', 'test')}>
                <Image
                  source={iconPath.FAVORITE_FILL}
                  style={[common.size24, common.mr4]}
                />
              </Pressable>
              <Text style={[common.text_m, common.fwb, common.mr8]}>23</Text>
            </View>
          </View>
          <View style={common.rowCenter}>
            <Text style={[common.text_m, common.fwb, common.mr8]}>
              필라테스
            </Text>
            <Text style={[common.text, {color: GRAY.DARK}]}>서울 · 송파구</Text>
          </View>
        </View>
        <View style={styles.nextArrow}>
          <FontAwesome name={'chevron-right'} color="black" />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  profileBox: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 16,
  },

  thumbnail: {width: '50%', height: '50%'},
  nextArrow: {
    position: 'absolute',
    top: '50%',
    right: 0,
  },
});

export default ProfileBox;
