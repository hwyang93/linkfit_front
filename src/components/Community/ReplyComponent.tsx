import {Text, View} from 'react-native';
import common from '@styles/common';

type ReplyProps = {
  item: {
    date: string;
    comment: string;
  };
};

function ReplyComponent({item}: ReplyProps) {
  return (
    <View>
      <View style={common.mt8}>
        <Text style={common.text_s}>{item.date}</Text>
      </View>
      <View style={common.mt8}>
        <Text style={common.text_m}>{item.comment}</Text>
      </View>
    </View>
  );
}

export default ReplyComponent;
