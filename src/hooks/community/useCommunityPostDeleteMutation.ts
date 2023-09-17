import {communityApi} from '@/api/community';
import {useMutation, useQueryClient} from '@tanstack/react-query';

export const useCommunityPostDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => communityApi.deletePostById(postId),
    onSuccess: () =>
      queryClient.invalidateQueries(['community', 'post', 'list']),
  });
};
