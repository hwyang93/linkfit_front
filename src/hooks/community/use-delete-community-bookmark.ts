import { communityApi } from '@/api/community';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteCommunityBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: communityApi.deleteBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries(['community', 'bookmark']);
    },
  });
};
