import {communityApi} from '@/api/community';
import {useMutation} from '@tanstack/react-query';

export const useCommunityPostDeleteMutation = () => {
  return useMutation({
    mutationFn: (postId: number) => communityApi.deletePostById(postId),
  });
};
