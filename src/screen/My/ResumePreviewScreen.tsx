import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {WHITE} from '@styles/colors';
import common from '@styles/common';

function ResumePreviewScreen() {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={common.text_m}>test</Text>
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

export default ResumePreviewScreen;
