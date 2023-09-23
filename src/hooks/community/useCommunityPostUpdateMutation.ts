import { communityApi } from '@/api/community';
import { UpdateCommunityDto } from '@/types/api/dtos';
import { useMutation } from '@tanstack/react-query';

export const useCommunityPostUpdateMutation = () => {
  return useMutation({
    mutationFn: (data: { postId: number; body: UpdateCommunityDto }) =>
      communityApi.updatePostById(data.postId, data.body),
  });
};
