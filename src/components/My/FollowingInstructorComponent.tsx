import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import common from '@styles/common';
import {BLUE, GRAY, WHITE} from '@styles/colors';
import {iconPath} from '@util/iconPath';

const EMPLOYER = [
  {
    field: '필라테스',
    nickname: '닉네임',
    career: '3년',
    date: '2022.12.12',
    comment:
      '후기 내용입니다. 후기내용입니다. 후기 내용입니다. 후기내용입니다. 후기 내용입니다. 후기내용입니다. 후기 내용입니다. 후기내용입니다.',
  },
  {
    field: '요가',
    nickname: '닉네임',
    career: '3년',
    date: '2022.12.12',
    comment: '후기 내용입니다. 후기내용입니다.',
  },
];

function FollowingInstructorComponent() {
  return (
    <ScrollView>
      <View style={styles.reviewBox}>
        <View style={common.rowCenter}>
          <Image
            source={require('../../assets/images/thumbnail.png')}
            style={styles.thumbnail}
          />
          <View style={{flex: 1}}>
            <View style={common.rowCenter}>
              <Text style={[common.text_m, common.fwb, common.mr8]}>
                포지션
              </Text>
              <Text style={[common.text]}>경력</Text>
            </View>
            <View style={common.rowCenter}>
              <Text style={[common.text_l, common.fwb, common.mr8]}>
                닉네임
              </Text>
              <Text style={[common.text_s, {color: BLUE.DEFAULT}]}>
                인증강사
              </Text>
              <Image
                style={{marginLeft: 2, width: 14, height: 14}}
                source={iconPath.CERTIFICATION}
              />
            </View>
            <View style={[common.rowCenterBetween]}>
              <Text style={[common.text_s, {flex: 1}]}>지역</Text>
              <View style={[common.rowCenter, {}]}>
                <View>
                  <Image source={iconPath.MESSAGE} style={common.size24} />
                </View>
                <View>
                  <Image source={iconPath.FAVORITE_ON} style={common.size24} />
                </View>
                <Text
                  style={[common.text_m, common.fwb, {alignSelf: 'flex-end'}]}>
                  23
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/*<Pressable*/}
        {/*  style={styles.kebabIcon}*/}
        {/*  hitSlop={10}*/}
        {/*  onPress={() => Alert.alert('click', 'test')}>*/}
        {/*  <Image source={iconPath.KEBAB} style={[common.KEBAB]} />*/}
        {/*</Pressable>*/}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: WHITE},
  reviewBox: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: GRAY.DEFAULT,
  },
  thumbnail: {marginRight: 12, width: 80, height: 80},
  kebabIcon: {position: 'absolute', top: 16, right: 0},
});

export default FollowingInstructorComponent;
