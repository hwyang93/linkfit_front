import {Alert, Image, Pressable, View} from 'react-native';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';

function LinkCollection() {
  return (
    <View style={[common.rowCenterBetween]}>
      <View style={[common.rowCenter, {justifyContent: 'space-around'}]}>
        <Pressable
          style={common.mh4}
          onPress={() => Alert.alert('알림', '클릭테스트에용')}>
          <Image source={iconPath.LINK_URL} style={[common.size24]} />
        </Pressable>
        <Pressable
          style={common.mh4}
          onPress={() => Alert.alert('알림', '클릭테스트에용')}>
          <Image source={iconPath.LINK_URL} style={[common.size24]} />
        </Pressable>
        <Pressable
          style={common.mh4}
          onPress={() => Alert.alert('알림', '클릭테스트에용')}>
          <Image source={iconPath.LINK_URL} style={[common.size24]} />
        </Pressable>
      </View>
    </View>
  );
}

export default LinkCollection;
