import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';
import {BLUE, GRAY} from '@styles/colors';

function InstructorInfoComponent() {
  return (
    <View>
      <Pressable style={styles.profileBox} onPress={() => {}}>
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
            <Text style={[common.text, {alignSelf: 'flex-end'}]}>3년</Text>
            <Text style={[common.text, common.mh8]}>|</Text>
            <Text style={[common.text, {color: GRAY.DARK}]}>서울 · 송파구</Text>
          </View>

          <View style={common.rowCenter}>
            <Pressable onPress={() => Alert.alert('click', 'test')}>
              <Image
                source={iconPath.FAVORITE_FILL}
                style={[common.size24, common.mr8]}
              />
            </Pressable>
            <Text style={[common.text_m, common.fwb, common.mr8]}>23</Text>
            <Text style={common.text}>3시간 전 접속</Text>
          </View>
        </View>
        <Pressable
          style={styles.kebabIcon}
          hitSlop={10}
          onPress={() => Alert.alert('text', '케밥 클릭')}>
          <Image source={iconPath.KEBAB} style={[common.KEBAB]} />
        </Pressable>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
    width: 64,
    height: 64,
    borderRadius: 200,
    backgroundColor: GRAY.LIGHT,
  },
  thumbnail: {width: '50%', height: '50%'},
  kebabIcon: {position: 'absolute', top: 0, right: 16},
});

export default InstructorInfoComponent;
