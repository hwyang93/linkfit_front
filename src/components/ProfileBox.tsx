import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';
import {BLUE, GRAY} from '@styles/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function ProfileBox() {
  return (
    <View>
      <View style={styles.profileBox}>
        <View style={[common.mr16, styles.thumbnailBox]}>
          <Image source={iconPath.PILATES} style={styles.thumbnail} />
        </View>
        <View>
          <View style={common.rowCenter}>
            <Text style={[common.text_l, common.fwb, common.mr8]}>닉네임</Text>
            <View style={common.rowCenter}>
              <Text style={[common.text_s, {color: BLUE.DEFAULT}]}>
                인증강사
              </Text>
              <Image
                style={{marginLeft: 2, width: 14, height: 14}}
                source={iconPath.CERTIFICATION}
              />
            </View>
          </View>

          <View style={common.rowCenter}>
            <Text style={[common.text_m, common.fwb, common.mr8]}>
              필라테스
            </Text>
            <Text style={[common.text, common.mr8, {alignSelf: 'flex-end'}]}>
              3년
            </Text>
            <Text style={[common.text_s, {color: GRAY.DARK}]}>서울 송파구</Text>
          </View>

          <View style={common.rowCenter}>
            <Pressable onPress={() => Alert.alert('click', 'test')}>
              <Image
                source={iconPath.FAVORITE_FILL}
                style={[common.size24, common.mr8]}
              />
            </Pressable>
            <Text style={[common.text_m, common.fwb, common.mr8]}>23</Text>
          </View>
        </View>
        <Pressable
          style={styles.nextArrow}
          hitSlop={10}
          onPress={() => Alert.alert('click', 'test')}>
          <FontAwesome name={'chevron-right'} />
        </Pressable>
      </View>
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
  thumbnailBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: GRAY.LIGHT,
  },
  thumbnail: {width: '50%', height: '50%'},
  nextArrow: {
    position: 'absolute',
    top: '50%',
    right: 0,
  },
});

export default ProfileBox;
