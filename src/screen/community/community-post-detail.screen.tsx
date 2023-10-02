import BottomSheet from '@/components/Common/BottomSheet';
import BottomSheetOption from '@/components/Common/BottomSheetOption';
import CommunityUserProfile from '@/components/Community/CommunityUserProfile';
import { useCommunityPostQuery } from '@/hooks/community/use-community-post-query';
import useAuth from '@/hooks/use-auth';
import useModal from '@/hooks/use-modal';
import { ROUTE } from '@/lib/constants/route';
import CommunityPostTop from '@components/Community/CommunityPostTop';
import ReplyComponent from '@components/Community/ReplyComponent';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WHITE } from '@styles/colors';
import common from '@styles/common';
import { FlatList, StyleSheet, View } from 'react-native';
import { LoggedInParamList } from '../../../AppInner';

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.COMMUNITY.POST_DETAIL>;

export const CommunityPostDetailScreen = ({ route }: Props) => {
  const modal = useModal();

  const communityPostQuery = useCommunityPostQuery(route.params.postId);
  const post = communityPostQuery.data;

  const { user } = useAuth();

  const isMyPost = post?.writerSeq === user.seq;

  return (
    <View style={styles.container}>
      <FlatList
        data={post?.comments}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <CommunityUserProfile
              career={item.writer.career}
              field={item.writer.field}
              name={item.writer.name}
              writerType={item.writer.type}
              profileImage={item.writer.profileImage?.originFileUrl}
              isMine={item.writerSeq === user.seq}
              onKebabPress={modal.open}
            />
            <ReplyComponent commentInfo={item} />
          </View>
        )}
        ListHeaderComponent={
          post && <CommunityPostTop postInfo={post} onCommentCreate={communityPostQuery.refetch} />
        }
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={[common.separator, common.mv16]} />}
      />
      {isMyPost && (
        <BottomSheet visible={modal.visible} onDismiss={modal.close}>
          <BottomSheetOption label="수정하기" />
          <BottomSheetOption label="삭제하기" />
        </BottomSheet>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    flex: 1,
    padding: 16,
  },
  kebabIcon: { position: 'absolute', right: 0, top: 16 },
});
