import {Pressable, Text, View} from 'react-native';
import common from '@styles/common';
import {useState} from 'react';

type ReplyProps = {
  item: {
    date: string;
    comment: string;
  };
};

function ReplyComponent({item}: ReplyProps) {
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
        <Text style={common.text_s}>{item.date}</Text>
      </View>
      <View style={common.mt8}>
        <Pressable onPress={textExpansion}>
          <Text numberOfLines={textLine} style={common.text_m}>
            {item.comment}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default ReplyComponent;