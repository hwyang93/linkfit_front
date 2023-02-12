import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {WHITE} from '@styles/colors';

function CertifyInstructorScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>test</Text>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
});
export default CertifyInstructorScreen;
