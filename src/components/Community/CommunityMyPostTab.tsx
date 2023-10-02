import { useCommunityPostDeleteMutation } from '@/hooks/community/use-community-post-delete-mutation';
import { useCommunityPostListQuery } from '@/hooks/community/use-community-post-list-query';
import { useAppNavigation } from '@/hooks/use-app-navigation';
import useModal from '@/hooks/use-modal';
import { ROUTE } from '@/lib/constants/route';
import { iconPath } from '@/lib/iconPath';
import { formatDate } from '@/lib/util';
import common from '@/styles/common';
import THEME from '@/styles/theme';
import { GRAY, WHITE } from '@styles/colors';
import { useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
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

  const navigation = useAppNavigation();

  const communityPostDeleteMutation = useCommunityPostDeleteMutation();

  const isPost = title ? true : false;
  const isComment = !isPost;

  const toggleTextExpansion = () => {
    textLine === 2 ? setTextLine(0) : setTextLine(2);
  };

  const onEdit = () => {
    if (isPost) {
      navigation.navigate(ROUTE.COMMUNITY.POST_EDIT, { postId });
    }

    if (isComment) {
      navigation.navigate(ROUTE.COMMUNITY.COMMENT_EDIT, { commentId: postId });
    }

    modal.close();
  };

  const onDelete = () => {
    communityPostDeleteMutation.mutate(postId, {
      onSuccess: modal.close,
    });
  };

  const onPress = () => {
    navigation.navigate(ROUTE.COMMUNITY.POST_DETAIL, { postId });
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
        <Image source={iconPath.KEBAB} style={common.size24} />
      </Pressable>
      <BottomSheet visible={modal.visible} onDismiss={modal.close} title="더보기">
        <BottomSheetOption label="수정하기" onPress={onEdit} />
        <BottomSheetOption label="삭제하기" onPress={onDelete} />
      </BottomSheet>
    </Pressable>
  );
};

const CommunityMyPostTab: React.FC = () => {
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
              postId={item.communitySeq || item.seq}
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
    backgroundColor: WHITE,
    flex: 1,
    paddingHorizontal: 16,
  },
  kebabIcon: { position: 'absolute', right: 0, top: 16 },
  postBox: {
    borderBottomWidth: 1,
    borderColor: GRAY.DEFAULT,
    paddingVertical: 16,
  },
});

export default CommunityMyPostTab;
