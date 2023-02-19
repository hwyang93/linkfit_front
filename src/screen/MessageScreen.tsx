import {Button, StyleSheet, Text, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';
import {WHITE} from '@styles/colors';
import common from '@styles/common';

function MessageScreen() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  return (
    <View style={styles.container}>
      <Text style={common.text_m}>쪽지 화면</Text>
      <Button
        title={'로그인화면'}
        onPress={() => navigation.navigate('SignIn')}
      />

      <Button
        title={'My 센터'}
        onPress={() => navigation.navigate('MyCenter')}
      />
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

export default MessageScreen;
