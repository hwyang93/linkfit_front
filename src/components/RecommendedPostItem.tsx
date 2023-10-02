import { MEMBER_TYPE } from '@/lib/constants/enum';
import { ROUTE } from '@/lib/constants/route';
import { formatDate } from '@/lib/util';
import { CommunityEntity } from '@/types/api/entities.type';
import BookmarkCounter from '@components/Counter/BookmarkCounter';
import CommentCounter from '@components/Counter/CommentCounter';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import common from '@styles/common';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { LoggedInParamList } from '../../AppInner';

interface RecommendedPostItemProps {
  item: CommunityEntity;
}

const RecommendedPostItem: React.FC<RecommendedPostItemProps> = ({ item }) => {
  const [postInfo, setPostInfo] = useState<CommunityEntity>(item);

  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  useEffect(() => {
    setPostInfo(item);
  }, [item]);

  return (
    <Pressable
      onPress={() => navigation.navigate(ROUTE.COMMUNITY.POST_DETAIL, { postId: postInfo.seq })}>
      <View>
        <Text style={[common.title, common.fs18]}>{postInfo.title}</Text>
        <View style={[common.rowEnd, common.mb8]}>
          {postInfo.writer.type === MEMBER_TYPE.COMPANY ? (
            <Text style={[common.text_m, common.fwb]}>{postInfo.writer.company?.companyName}</Text>
          ) : (
            <Text style={[common.text_m, common.fwb]}>
              {postInfo.writer.nickname ? postInfo.writer.nickname : postInfo.writer.name}
            </Text>
          )}
          <Text style={[common.text, common.mh4]}>
            {postInfo.writer.type === MEMBER_TYPE.INSTRUCTOR
              ? '강사'
              : postInfo.writer.type === MEMBER_TYPE.COMPANY
              ? '센터'
              : '일반'}
          </Text>
          <Text style={common.text}>{formatDate(postInfo.updatedAt)}</Text>
        </View>
        <Text style={[common.mb8, common.text_m]}>{postInfo.contents}</Text>
        <View style={common.rowCenterBetween}>
          <View style={common.rowCenter}>
            <BookmarkCounter
              postId={postInfo.seq}
              isBookmark={postInfo.isBookmark}
              counter={postInfo.bookmarkCount}
            />
            <CommentCounter counter={postInfo.comments.length} />
          </View>
          <View style={[common.filterBox, common.filterBoxActive]}>
            <Text style={common.text_m}>{postInfo.category}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default RecommendedPostItem;
