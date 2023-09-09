import {communityApi} from '@/api/community';
import {useQuery} from '@tanstack/react-query';

export const useCommunityPostQuery = (postId: number) => {
  return useQuery({
    queryKey: ['community', 'post', 'detail', postId],
    queryFn: () => communityApi.getPostById(postId),
  });
};
