import { useCreateCommunityBookmark } from '@/hooks/community/use-create-community-bookmark';
import { useDeleteCommunityBookmark } from '@/hooks/community/use-delete-community-bookmark';
import toast from '@/hooks/toast';
import { YesNoFlag } from '@/types/common';
import TOAST from '@/utils/constants/toast';
import { iconPath } from '@/utils/iconPath';
import common from '@styles/common';
import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

interface BookmarkCounterProps {
  isBookmark: YesNoFlag;
  counter: number;
  postId: number;
}

const BookmarkCounter: React.FC<BookmarkCounterProps> = ({ isBookmark, counter, postId }) => {
  const [isBookmarked, setIsBookmarked] = useState(isBookmark === 'Y');
  const [bookmarkCount, setBookmarkCount] = useState(counter);

  const createCommunityBookmark = useCreateCommunityBookmark();
  const deleteCommunityBookmark = useDeleteCommunityBookmark();

  const onBookmarkPress = () => {
    if (createCommunityBookmark.isLoading || deleteCommunityBookmark.isLoading) {
      return;
    }

    if (isBookmarked) {
      deleteCommunityBookmark.mutate(postId, {
        onSuccess: () => {
          toast.success({ message: TOAST.BOOKMARK_DELETED });
          setIsBookmarked(false);
          setBookmarkCount(bookmarkCount - 1);
        },
      });
    }

    if (!isBookmarked) {
      createCommunityBookmark.mutate(postId, {
        onSuccess: () => {
          toast.success({ message: TOAST.BOOKMARK_CREATED });
          setIsBookmarked(true);
          setBookmarkCount(bookmarkCount + 1);
        },
      });
    }
  };

  return (
    <View style={common.rowCenter}>
      <Pressable onPress={onBookmarkPress}>
        <Image
          source={isBookmarked ? iconPath.BOOKMARK_ON : iconPath.BOOKMARK}
          style={[common.size24, common.mr4]}
        />
      </Pressable>
      <Text style={[common.text_m, common.fwb, common.mr8]}>{bookmarkCount}</Text>
    </View>
  );
};

export default BookmarkCounter;
