import {Image, View} from 'react-native';
import {iconPath} from '@util/iconPath';

function MyHeader() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <View>
        <Image source={iconPath.LOGO} style={{width: 116, height: 32}} />
      </View>
    </View>
  );
}

export default MyHeader;
