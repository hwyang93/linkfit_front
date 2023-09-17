import {useCommunityBookmarkListQuery} from '@/hooks/community/useCommunityBookmarkListQuery';
import {Member} from '@/types/common';
import {formatDate} from '@/utils/util';
import BookmarkCounter from '@components/Counter/BookmarkCounter';
import CommentCounter from '@components/Counter/CommentCounter';
import {GRAY, WHITE} from '@styles/colors';
import common from '@styles/common';
import {useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import EmptySet from '../EmptySet';

const CommunityMyPost: React.FC = () => {
  // const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  const CommunityBookmarkListQuery = useCommunityBookmarkListQuery();
  const bookmarks = CommunityBookmarkListQuery.data;

  const [textLine, setTextLine] = useState(2);
  const textExpansion = () => {
    if (textLine === 2) {
      setTextLine(0);
    } else {
      setTextLine(2);
    }
  };

  // TODO: 북마크 토글 기능 추가
  const onBookmarkPress = (id: number) => {
    console.log('북마크 업데이트', id);
  };

  return (
    <View style={styles.container}>
      {bookmarks?.length === 0 && <EmptySet text="북마크한 글이 없어요." />}
      {bookmarks?.length !== 0 && (
        <FlatList
          data={bookmarks}
          contentContainerStyle={{paddingBottom: 32}}
          renderItem={({item}) => (
            <View style={styles.postBox}>
              <View>
                <Text style={[common.title, common.fs18, common.mb8]}>
                  {item.community.title}
                </Text>
                <View style={[common.rowCenter, common.mb12]}>
                  {item.community.writer.type === Member.Company ? (
                    <Text style={[common.text_m, common.fwb]}>
                      {item.community.writer.company?.companyName}
                    </Text>
                  ) : (
                    <Text style={[common.text_m, common.fwb]}>
                      {item.community.writer.nickname
                        ? item.community.writer.nickname
                        : item.community.writer.name}
                    </Text>
                  )}

                  <Text
                    style={[common.text, common.mh4, {alignSelf: 'flex-end'}]}>
                    {item.community.writer.type === Member.Company
                      ? '센터'
                      : item.community.writer.type === Member.Instructor
                      ? '강사'
                      : '일반인'}
                  </Text>
                  <Text style={[common.text, {alignSelf: 'flex-end'}]}>
                    {formatDate(item.community.updatedAt)}
                  </Text>
                </View>

                <Pressable style={common.mb10} onPress={textExpansion}>
                  <Text style={common.text_m} numberOfLines={textLine}>
                    {item.community.contents}
                  </Text>
                </Pressable>

                <View style={common.rowCenterBetween}>
                  <View style={common.rowCenter}>
                    <BookmarkCounter
                      counter={item.community.bookmarks.length}
                      onPress={() => onBookmarkPress(item.seq)}
                    />
                    <CommentCounter counter={item.community.comments.length} />
                  </View>
                  <View style={common.channelBox}>
                    <Text style={common.channelText}>
                      {item.community.category}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 16, backgroundColor: WHITE},
  postBox: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: GRAY.DEFAULT,
  },
  kebabIcon: {position: 'absolute', top: 16, right: 0},
});

export default CommunityMyPost;
