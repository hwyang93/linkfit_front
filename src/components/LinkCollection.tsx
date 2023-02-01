import {Alert, Image, Pressable, StyleSheet, View} from 'react-native';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';

function LinkCollection() {
  return (
    <View style={[styles.linkBox]}>
      <View style={[common.rowCenter, {justifyContent: 'space-around'}]}>
        {}
        <Pressable
          style={common.mh4}
          onPress={() => Alert.alert('알림', '클릭테스트에용')}>
          <Image source={iconPath.LINK_URL} style={[common.LINK_URL]} />
        </Pressable>
        <Pressable
          style={common.mh4}
          onPress={() => Alert.alert('알림', '클릭테스트에용')}>
          <Image source={iconPath.LINK_URL} style={[common.LINK_URL]} />
        </Pressable>
        <Pressable
          style={common.mh4}
          onPress={() => Alert.alert('알림', '클릭테스트에용')}>
          <Image source={iconPath.LINK_URL} style={[common.LINK_URL]} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  linkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default LinkCollection;
