import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';
import BookmarkCounter from '@components/Counter/BookmarkCounter';
import CommentCounter from '@components/Counter/CommentCounter';

type listProps = {
  item: {
    seq: number;
    title: string;
    type: string;
    companyName?: string;
    nickname?: string;
    content: string;
    date: string;
  };
};

function RecommendedPostItem({item}: listProps) {
  return (
    <View>
      <Text style={[common.title, common.fs18]}>{item.title}</Text>
      <View style={[common.rowEnd, common.mb8]}>
        {item.nickname ? (
          <Text style={[common.text_m, common.fwb]}>{item.nickname}</Text>
        ) : (
          <Text style={[common.text_m, common.fwb]}>{item.companyName}</Text>
        )}
        <Text style={[common.text, common.mh4]}>{item.type}</Text>
        <Text style={common.text}>{item.date}</Text>
      </View>
      <Text style={[common.mb8, common.text_m]}>{item.content}</Text>
      <View style={common.rowCenterBetween}>
        <View style={common.rowCenter}>
          <BookmarkCounter counter={23} />
          <CommentCounter counter={12} />
        </View>
        <View style={[styles.labelBox]}>
          <Text style={[common.text_m]}>채널명</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  labelBox: {
    paddingHorizontal: 12,
    paddingVertical: 2,
    backgroundColor: '#d7e0fd',
    borderRadius: 16,
  },
});

export default RecommendedPostItem;
