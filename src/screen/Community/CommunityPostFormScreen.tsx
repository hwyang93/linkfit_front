import {StyleSheet, Text, View} from 'react-native';
import {WHITE} from '@styles/colors';
import DismissKeyboardView from '@components/DismissKeyboardView';
import common from '@styles/common';

function CommunityPostFormScreen() {
  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <Text style={common.text_m}>test</Text>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
});

export default CommunityPostFormScreen;
