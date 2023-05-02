import {Pressable, Text, View} from 'react-native';
import common from '@styles/common';
import BookmarkCounter from '@components/Counter/BookmarkCounter';
import CommentCounter from '@components/Counter/CommentCounter';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';
import {useCallback, useState} from 'react';
import {createCommunityBookmark, deleteCommunityBookmark} from '@api/community';
import toast from '@hooks/toast';

type listProps = {
  item: any;
};

function RecommendedPostItem({item}: listProps) {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const [postInfo, setPostInfo] = useState<any>(item);

  const onClickBookmark = useCallback(() => {
    if (postInfo.isBookmark === 'N') {
      createCommunityBookmark(postInfo.seq)
        .then(() => {
          toast.success({message: '북마크등록이 완료되었어요!'});
          setPostInfo({
            ...postInfo,
            isBookmark: 'Y',
            bookmarkCount: postInfo.bookmarkCount + 1,
          });
        })
        .catch((e: any) => {
          toast.error({message: e.message});
        });
    } else {
      deleteCommunityBookmark(postInfo.seq)
        .then(() => {
          toast.success({message: '북마크가 삭제되었어요!'});
          setPostInfo({
            ...postInfo,
            isBookmark: 'N',
            bookmarkCount: postInfo.bookmarkCount - 1,
          });
        })
        .catch((e: any) => {
          toast.error({message: e.message});
        });
    }
  }, [postInfo]);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('CommunityPost', {postSeq: postInfo.seq})
      }>
      <View>
        <Text style={[common.title, common.fs18]}>{postInfo.title}</Text>
        <View style={[common.rowEnd, common.mb8]}>
          {postInfo.writer.type === 'COMPANY' ? (
            <Text style={[common.text_m, common.fwb]}>
              {postInfo.writer.company?.companyName}
            </Text>
          ) : (
            <Text style={[common.text_m, common.fwb]}>
              {postInfo.writer.nickname
                ? postInfo.writer.nickname
                : postInfo.writer.name}
            </Text>
          )}
          <Text style={[common.text, common.mh4]}>
            {postInfo.writer.type === 'INSTRUCTOR'
              ? '강사'
              : postInfo.writer.type === 'COMPANY'
              ? '센터'
              : '일반'}
          </Text>
          <Text style={common.text}>{postInfo.updatedAt}</Text>
        </View>
        <Text style={[common.mb8, common.text_m]}>{postInfo.contents}</Text>
        <View style={common.rowCenterBetween}>
          <View style={common.rowCenter}>
            <BookmarkCounter
              seq={postInfo.seq}
              isBookmark={postInfo.isBookmark}
              counter={postInfo.bookmarkCount}
              onClick={onClickBookmark}
            />
            <CommentCounter counter={postInfo.comments.length} />
          </View>
          <View style={[common.filterBox, common.filterBoxActive]}>
            <Text style={[common.text_m]}>{postInfo.category}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default RecommendedPostItem;
