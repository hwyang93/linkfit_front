import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';
import {BLUE, GRAY} from '@styles/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function ProfileBox({memberInfo}: any) {
  return (
    <View>
      <View style={styles.profileBox}>
        <View style={[common.mr16, styles.thumbnailBox]}>
          <Image source={iconPath.PILATES} style={styles.thumbnail} />
        </View>
        <View>
          <View style={common.rowCenter}>
            <Text style={[common.text_l, common.fwb, common.mr8]}>
              {memberInfo.nickname}
            </Text>
            {memberInfo.type === 'INSTRUCTOR' ? (
              <View style={common.rowCenter}>
                <Text style={[common.text_s, {color: BLUE.DEFAULT}]}>
                  인증강사
                </Text>
                <Image
                  style={{marginLeft: 2, width: 14, height: 14}}
                  source={iconPath.CERTIFICATION}
                />
              </View>
            ) : (
              ''
            )}
          </View>

          <View style={common.rowCenter}>
            <Text style={[common.text_m, common.fwb, common.mr8]}>
              {memberInfo.field}
            </Text>
            <Text style={[common.text, common.mr8, {alignSelf: 'flex-end'}]}>
              {memberInfo.career}
            </Text>
            <Text style={[common.text_s, {color: GRAY.DARK}]}>
              {memberInfo.address}
            </Text>
          </View>

          <View style={common.rowCenter}>
            <Pressable onPress={() => Alert.alert('click', 'test')}>
              <Image
                source={iconPath.FAVORITE_FILL}
                style={[common.size24, common.mr8]}
              />
            </Pressable>
            <Text style={[common.text_m, common.fwb, common.mr8]}>
              {memberInfo.followerCount}
            </Text>
          </View>
        </View>
        <Pressable
          style={styles.nextArrow}
          hitSlop={10}
          onPress={() => Alert.alert('click', 'test')}>
          <FontAwesome name={'chevron-right'} color="black" />
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
