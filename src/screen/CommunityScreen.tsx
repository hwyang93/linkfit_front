import {Button, Text, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';

function CommunityScreen() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  return (
    <View>
      <Text>커뮤니티 화면</Text>
      <Button title={'button'} onPress={() => navigation.navigate('SignIn')} />
    </View>
  );
}

export default CommunityScreen;
