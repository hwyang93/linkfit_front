import {
  ActivityIndicator,
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
import LinearGradient from 'react-native-linear-gradient';
import {useState} from 'react';
import BlockButton from '@components/BlockButton';

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

function BlockInstructorComponent() {
  const [loading, setLoading] = useState<boolean>(false);

  const onBlock = () => {};
  return (
    <ScrollView>
      <View style={styles.reviewBox}>
        <View style={common.rowCenter}>
          <Image
            source={require('@images/thumbnail.png')}
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
              <Text style={[common.text_s, common.fcg, {flex: 1}]}>지역</Text>
              {/* 차단 버튼 */}
              <View style={common.mt20}>
                <BlockButton
                  title={'차단중'}
                  job={onBlock}
                  bottom={0}
                  right={0}
                />
              </View>
            </View>
          </View>
        </View>
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
  blockButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    // width: 89,
  },
});

export default BlockInstructorComponent;
