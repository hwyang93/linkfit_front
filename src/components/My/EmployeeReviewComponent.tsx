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

function EmployeeReviewComponent() {
  return (
    <ScrollView>
      {EMPLOYER.map((item, index) => (
        <View key={index} style={styles.reviewBox}>
          <View style={common.rowCenter}>
            <Image
              source={require('../../assets/images/thumbnail.png')}
              style={styles.thumbnail}
            />
            <View>
              <View style={common.rowCenter}>
                <Text style={[common.text_m, common.fwb, common.mr8]}>
                  {item.nickname}
                </Text>
                <Text style={[common.text_s, {color: BLUE.DEFAULT}]}>
                  인증강사
                </Text>
                <Image
                  style={{marginLeft: 2, width: 14, height: 14}}
                  source={iconPath.CERTIFICATION}
                />
              </View>
              <View style={common.row}>
                <Text style={[common.text_s, common.fwb, common.mr8]}>
                  {item.field}
                </Text>
                <Text style={[common.text]}>{item.career}</Text>
              </View>
            </View>
          </View>
          <Text style={[common.mt8, common.text]}>2022.12.12</Text>
          <Text style={common.text_m}>{item.comment}</Text>
          <Pressable
            style={styles.kebabIcon}
            hitSlop={10}
            onPress={() => Alert.alert('click', 'test')}>
            <Image source={iconPath.KEBAB} style={[common.KEBAB]} />
          </Pressable>
        </View>
      ))}
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
  thumbnail: {marginRight: 12, width: 48, height: 48},
  kebabIcon: {position: 'absolute', top: 16, right: 0},
});

export default EmployeeReviewComponent;
