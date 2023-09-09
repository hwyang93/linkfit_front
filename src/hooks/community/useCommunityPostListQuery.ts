import {communityApi} from '@/api/community';
import {FetchCommunityPostsParams} from '@/types/api/community';
import {useQuery} from '@tanstack/react-query';

export const useCommunityPostListQuery = (
  params?: FetchCommunityPostsParams,
) => {
  const {category, isWriter} = params || {};

  return useQuery({
    queryKey: ['community', 'post', 'list', category, isWriter],
    queryFn: () => communityApi.getPostList({category, isWriter}),
  });
};
