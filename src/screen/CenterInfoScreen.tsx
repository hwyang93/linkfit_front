import {Image, StyleSheet, Text, View} from 'react-native';
import common from '@styles/common';
import {GRAY, WHITE} from '@styles/colors';
import LinkCollection from '@components/LinkCollection';

function CenterInfoScreen() {
  // todo: 채용중 박스 클릭 시 구인 공고 JobPostScreen 으로 이동

  return (
    <View style={styles.container}>
      <View style={common.mb16}>
        <Image
          source={require('../assets/images/center_01.png')}
          resizeMode={'cover'}
          style={styles.imgBox}
        />
      </View>
      <View style={[common.rowBetween, common.mb16]}>
        <View style={common.rowCenter}>
          <Text style={[common.title_l, common.mr8]}>링크 필라테스</Text>
          <Text style={[common.text, {alignSelf: 'flex-start'}]}>필라테스</Text>
        </View>
        {/*링크 영역 */}
        <LinkCollection />
      </View>
      <View style={common.row}>
        <Text style={[common.text_s, styles.tag]}>#Tag</Text>
        <Text style={[common.text_s, styles.tag]}>#Tag</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: WHITE,
  },
  imgBox: {
    width: '100%',
    height: 160,
    borderRadius: 8,
  },
  tagArea: {},
  tag: {marginRight: 8, color: GRAY.DARK},
});
export default CenterInfoScreen;
