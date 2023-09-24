import { memberApi } from '@/api/member';
import { FetchMemberFollowingsParams } from '@/types/api/member';
import { useQuery } from '@tanstack/react-query';

export const useMemberFollowingList = (params: FetchMemberFollowingsParams) => {
  const { type } = params || {};
  return useQuery({
    queryKey: ['member', 'following', 'list', type],
    queryFn: () => memberApi.getFollowingList({ type }),
  });
};
