import { iconPath } from '@/utils/iconPath';
import common from '@styles/common';
import { Image, Text, View } from 'react-native';

const CommentCounter: React.FC<any> = ({ counter }) => {
  return (
    <View style={common.rowCenter}>
      <Image source={iconPath.COMMENT} style={[common.size24, common.mr4]} />
      <Text style={[common.text_m, common.fwb, common.mr8]}>{counter}</Text>
    </View>
  );
};

export default CommentCounter;
