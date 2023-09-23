import { communityApi } from '@/api/community';
import { useQuery } from '@tanstack/react-query';

export const useCommunityBookmarkListQuery = () => {
  return useQuery({
    queryKey: ['community', 'bookmark', 'list'],
    queryFn: communityApi.getBookmarkList,
  });
};
