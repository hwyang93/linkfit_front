import common from '@styles/common';
import {Image, Pressable, Text, View} from 'react-native';
import {iconPath} from '@util/iconPath';

function BookmarkCounter(props: any) {
  return (
    <View style={common.rowCenter}>
      <Pressable onPress={props.onClick}>
        <Image
          source={
            props.isBookmark === 'Y' ? iconPath.BOOKMARK_ON : iconPath.BOOKMARK
          }
          style={[common.size24, common.mr4]}
        />
      </Pressable>
      <Text style={[common.text_m, common.fwb, common.mr8]}>
        {props.counter}
      </Text>
    </View>
  );
}

export default BookmarkCounter;
