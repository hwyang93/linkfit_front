import {iconPath} from '@/utils/iconPath';
import common from '@styles/common';
import {Image, Pressable, Text, View} from 'react-native';

const BookmarkCounter: React.FC<any> = ({onClick, isBookmark, counter}) => {
  return (
    <View style={common.rowCenter}>
      <Pressable onPress={onClick}>
        <Image
          source={isBookmark === 'Y' ? iconPath.BOOKMARK_ON : iconPath.BOOKMARK}
          style={[common.size24, common.mr4]}
        />
      </Pressable>
      <Text style={[common.text_m, common.fwb, common.mr8]}>{counter}</Text>
    </View>
  );
};

export default BookmarkCounter;
