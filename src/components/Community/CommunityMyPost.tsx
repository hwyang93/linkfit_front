import { useCommunityPostDeleteMutation } from '@/hooks/community/useCommunityPostDeleteMutation';
import { useCommunityPostListQuery } from '@/hooks/community/useCommunityPostListQuery';
import useModal from '@/hooks/useModal';
import { ROUTE } from '@/navigations/routes';
import common from '@/styles/common';
import THEME from '@/styles/theme';
import { iconPath } from '@/utils/iconPath';
import { formatDate } from '@/utils/util';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { GRAY, WHITE } from '@styles/colors';
import { useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { LoggedInParamList } from '../../../AppInner';
import BottomSheet from '../Common/BottomSheet';
import BottomSheetOption from '../Common/BottomSheetOption';
import EmptySet from '../EmptySet';

interface PostListItemProps {
  postId: number;
  title: string;
  contents: string;
  updatedAt: string;
}

const PostListItem: React.FC<PostListItemProps> = ({ postId, title, contents, updatedAt }) => {
  const [textLine, setTextLine] = useState(2);
  const modal = useModal();

  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  const communityPostDeleteMutation = useCommunityPostDeleteMutation();

  const isPost = title ? true : false;
  const isComment = !isPost;

  const toggleTextExpansion = () => {
    textLine === 2 ? setTextLine(0) : setTextLine(2);
  };

  const onEdit = () => {
    if (isPost) {
      console.log(postId);
      navigation.navigate(ROUTE.COMMUNITY.POST_EDIT, {
        postId: postId,
      });
    }

    if (isComment) {
      navigation.navigate(ROUTE.COMMUNITY.COMMENT_EDIT, {
        commentId: postId,
      });
    }

    modal.close();
  };

  const onDelete = () => {
    communityPostDeleteMutation.mutate(postId, {
      onSuccess: modal.close,
    });
  };

  const onPress = () => {
    if (isPost)
      navigation.navigate(ROUTE.COMMUNITY.POST_DETAIL, {
        postSeq: postId,
      });

    // TODO: 댓글 클릭 시 이동 기능 추가
  };

  return (
    <Pressable style={styles.postBox} onPress={onPress}>
      <View style={[common.row, common.mb12, { alignItems: 'flex-end' }]}>
        <Text style={[common.text_m, common.fwb]}>{title}</Text>
        <Text style={[common.text, { marginLeft: 4 }]}>{formatDate(updatedAt)}</Text>
        <Text style={[common.text, { fontSize: 12, color: THEME.PRIMARY, marginLeft: 4 }]}>
          {title ? '게시글' : '댓글'}
        </Text>
      </View>
      <Pressable onPress={toggleTextExpansion}>
        <Text style={common.text_m} numberOfLines={textLine}>
          {contents}
        </Text>
      </Pressable>
      <Pressable style={styles.kebabIcon} hitSlop={10} onPress={modal.open}>
        <Image source={iconPath.KEBAB} style={[common.size24]} />
      </Pressable>
      <BottomSheet visible={modal.visible} onDismiss={modal.close} title="더보기">
        <BottomSheetOption label="수정하기" onPress={onEdit} />
        <BottomSheetOption label="삭제하기" onPress={onDelete} />
      </BottomSheet>
    </Pressable>
  );
};

const CommunityMyPost: React.FC = () => {
  const communityPostsQuery = useCommunityPostListQuery({
    isWriter: 'Y',
  });
  const myPosts = communityPostsQuery.data;

  return (
    <View style={styles.container}>
      {myPosts?.length !== 0 && (
        <FlatList
          data={myPosts}
          contentContainerStyle={{ paddingBottom: 32 }}
          renderItem={({ item }) => (
            <PostListItem
              postId={item.seq}
              title={item.title}
              contents={item.contents}
              updatedAt={item.updatedAt}
            />
          )}
        />
      )}
      {myPosts?.length === 0 && <EmptySet text="작성한 내역이 없어요." />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: WHITE,
  },
  postBox: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: GRAY.DEFAULT,
  },
  kebabIcon: { position: 'absolute', top: 16, right: 0 },
});

export default CommunityMyPost;
