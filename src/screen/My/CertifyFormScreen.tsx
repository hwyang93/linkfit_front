import {StyleSheet, Text, View} from 'react-native';
import {WHITE} from '@styles/colors';

function CertifyFormScreen() {
  return (
    <View style={styles.container}>
      <Text>test</Text>
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
export default CertifyFormScreen;
