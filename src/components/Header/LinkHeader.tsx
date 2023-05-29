import {iconPath} from '@/utils/iconPath';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Image, View} from 'react-native';
import {LoggedInParamList} from '../../../AppInner';
import IconButton from '../Common/IconButton';

interface Props {
  toCommunityMy?: boolean;
}

const LinkHeader: React.FC<Props> = ({toCommunityMy}) => {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  const handleMyIconPress = () => {
    toCommunityMy
      ? navigation.navigate('CommunityMy')
      : navigation.navigate('My');
  };

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View style={{flex: 0}}>
        <Image source={iconPath.LOGO} style={{width: 116, height: 32}} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <IconButton
          source={iconPath.BELL}
          style={{marginRight: 16}}
          onPress={() => navigation.navigate('MyNotification')}
        />
        <IconButton source={iconPath.MY} onPress={handleMyIconPress} />
      </View>
    </View>
  );
};

export default LinkHeader;
