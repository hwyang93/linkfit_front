import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {WHITE} from '@styles/colors';
import common from '@styles/common';

function JobPostScreen() {
  // todo: 스크롤 뷰로 작업
  return (
    <ScrollView style={styles.container}>
      <View style={common.mb16}>
        <Image
          source={require('../assets/images/job_01.png')}
          resizeMode={'cover'}
          style={styles.imgBox}
        />
      </View>
      <Text style={common.title_l}>필라테스 강사님 모십니다.</Text>
    </ScrollView>
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

export default JobPostScreen;
