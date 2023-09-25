import { communityApi } from '@/api/community';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateCommunityPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: communityApi.createPost,
    onSuccess: () => queryClient.invalidateQueries(['community', 'post']),
  });
};
