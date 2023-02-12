import {StyleSheet, Text, View} from 'react-native';
import {WHITE} from '@styles/colors';
import common from '@styles/common';

function FollowingManageScreen() {
  return (
    <View style={styles.container}>
      <Text style={common.text_m}>test</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
});
export default FollowingManageScreen;
