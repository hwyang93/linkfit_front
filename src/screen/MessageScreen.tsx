import {Button, StyleSheet, Text, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';
import {WHITE} from '@styles/colors';

function MessageScreen() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  return (
    <View style={styles.container}>
      <Text>쪽지 화면</Text>
      <Button title={'button'} onPress={() => navigation.navigate('SignIn')} />
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
