import { formatDate } from '@/lib/util';
import THEME from '@/styles/theme';
import common from '@styles/common';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

const ReplyComponent: React.FC<any> = ({ commentInfo }) => {
  const [textLine, setTextLine] = useState(2);
  const textExpansion = () => {
    if (textLine === 2) {
      setTextLine(0);
    } else {
      setTextLine(2);
    }
  };
  return (
    <View>
      <View style={common.mt8}>
        <Text style={{ fontSize: 12, color: THEME.GREY02 }}>
          {formatDate(commentInfo.updatedAt)}
        </Text>
      </View>
      <View style={common.mt8}>
        <Pressable onPress={textExpansion}>
          <Text numberOfLines={textLine} style={common.text_m}>
            {commentInfo.contents}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ReplyComponent;
