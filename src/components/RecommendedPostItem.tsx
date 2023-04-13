import {Pressable, Text, View} from 'react-native';
import common from '@styles/common';
import BookmarkCounter from '@components/Counter/BookmarkCounter';
import CommentCounter from '@components/Counter/CommentCounter';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';

type listProps = {
  item: any;
};

function RecommendedPostItem({item}: listProps) {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  return (
    <Pressable
      onPress={() => navigation.navigate('CommunityPost', {postSeq: item.seq})}>
      <View>
        <Text style={[common.title, common.fs18]}>{item.title}</Text>
        <View style={[common.rowEnd, common.mb8]}>
          {item.writer.type === 'COMPANY' ? (
            <Text style={[common.text_m, common.fwb]}>
              {item.writer.company?.companyName}
            </Text>
          ) : (
            <Text style={[common.text_m, common.fwb]}>
              {item.writer.nickname ? item.writer.nickname : item.writer.name}
            </Text>
          )}
          <Text style={[common.text, common.mh4]}>
            {item.writer.type === 'INSTRUCTOR'
              ? '강사'
              : item.writer.type === 'COMPANY'
              ? '센터'
              : '일반'}
          </Text>
          <Text style={common.text}>{item.updatedAt}</Text>
        </View>
        <Text style={[common.mb8, common.text_m]}>{item.contents}</Text>
        <View style={common.rowCenterBetween}>
          <View style={common.rowCenter}>
            <BookmarkCounter counter={item.bookmarks.length} />
            <CommentCounter counter={item.comments.length} />
          </View>
          <View style={[common.filterBox, common.filterBoxActive]}>
            <Text style={[common.text_m]}>{item.category}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default RecommendedPostItem;
