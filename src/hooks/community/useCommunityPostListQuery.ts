import { communityApi } from '@/api/community';
import { FetchCommunityPostsParams } from '@/types/api/community';
import { useQuery } from '@tanstack/react-query';

export const useCommunityPostListQuery = (params?: FetchCommunityPostsParams) => {
  return useQuery({
    queryKey: ['community', 'post', 'list', params],
    queryFn: () => communityApi.getPostList(params),
  });
};
