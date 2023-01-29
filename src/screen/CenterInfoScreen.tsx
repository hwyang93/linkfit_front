import {Image, StyleSheet, Text, View} from 'react-native';
import common from '@styles/common';
import {WHITE} from '@styles/colors';

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
      <Text style={common.title_l}>링크 필라테스</Text>
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
});
export default CenterInfoScreen;
