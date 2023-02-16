import {StyleSheet, Text, View} from 'react-native';
import common from '@styles/common';

type listProps = {
  item: {
    id: number;
    title: string;
    companyName: string;
    nickname: string;
    type: string;
    date: string;
  };
};

function PostCarouselItem({item}: listProps) {
  return (
    <View style={styles.postBox}>
      <Text numberOfLines={1} style={common.text_m}>
        {item.title}
      </Text>
      <View style={[common.rowEnd, common.mt40]}>
        {item.nickname ? (
          <Text style={[common.text_s, common.fwb]}>{item.nickname}</Text>
        ) : (
          <Text style={[common.text_s, common.fwb]}>{item.companyName}</Text>
        )}
        <Text style={[common.text, common.mh4]}>{item.type}</Text>
        <Text style={common.text}>{item.date}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  postBox: {
    padding: 16,
    marginRight: 12,
    width: 208,
    backgroundColor: '#e8edff',
    borderRadius: 8,
  },
});

export default PostCarouselItem;
