import common from '@styles/common';
import {Alert, Image, Pressable, Text, View} from 'react-native';
import {iconPath} from '@util/iconPath';

function BookmarkCounter(props: any) {
  console.log(props.counter);
  return (
    <View style={common.rowCenter}>
      <Pressable onPress={() => Alert.alert('test', 'test')}>
        <Image source={iconPath.BOOKMARK} style={[common.size24, common.mr4]} />
      </Pressable>
      <Text style={[common.text_m, common.fwb, common.mr8]}>
        {props.counter}
      </Text>
    </View>
  );
}

export default BookmarkCounter;
