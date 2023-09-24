import { communityApi } from '@/api/community';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateCommunityBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: communityApi.createBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries(['community', 'bookmark']);
    },
  });
};
