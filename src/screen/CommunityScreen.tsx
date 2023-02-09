import {StyleSheet, Text, View} from 'react-native';

import {WHITE} from '@styles/colors';

// todo : 필터 컴포넌트

function CommunityScreen() {
  return (
    <View style={styles.container}>
      <Text>커뮤니티 화면</Text>
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

export default CommunityScreen;
