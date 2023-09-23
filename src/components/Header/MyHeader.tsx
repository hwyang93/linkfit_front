import { iconPath } from '@/utils/iconPath';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import common from '@styles/common';
import { Image, Pressable, View } from 'react-native';
import { LoggedInParamList } from '../../../AppInner';

type HeaderProps = {
  link?: any;
};

const MyHeader = ({ link }: HeaderProps) => {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View style={{ flex: 0 }}>
        <Image source={iconPath.LOGO} style={{ width: 116, height: 32 }} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Pressable onPress={() => navigation.navigate(link)}>
          <Image source={iconPath.BELL} style={common.size24} />
        </Pressable>
      </View>
    </View>
  );
};

export default MyHeader;
