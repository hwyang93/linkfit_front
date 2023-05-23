import {BLUE, WHITE} from '@styles/colors';
import common from '@styles/common';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';

const AccountScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View>
        <Pressable
          style={common.mv20}
          onPress={() => Alert.alert('테스트', '비밀번호 재설정 되지 않아용')}>
          <Text style={[common.text_m, styles.linkText]}>비밀번호 재설정</Text>
        </Pressable>
        <Pressable
          style={common.mv20}
          onPress={() => Alert.alert('테스트', '회원 탈퇴가 되지 않아용')}>
          <Text style={[common.text_m, styles.linkText]}>회원 탈퇴</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: WHITE},
  linkText: {
    color: BLUE.DEFAULT,
    textDecorationLine: 'underline',
    textDecorationColor: BLUE.DEFAULT,
  },
});

export default AccountScreen;
