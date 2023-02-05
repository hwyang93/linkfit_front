import {Alert, Image, Pressable, View} from 'react-native';
import {iconPath} from '@util/iconPath';
import common from '@styles/common';

function LinkHeader() {
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
        <Pressable
          style={{marginRight: 16}}
          onPress={() => Alert.alert('click', 'bell test')}>
          <Image source={iconPath.BELL} style={common.BELL} />
        </Pressable>
        <Pressable onPress={() => Alert.alert('click', 'my test')}>
          <Image source={iconPath.MY} style={common.MY} />
        </Pressable>
      </View>
    </View>
  );
}

export default LinkHeader;
