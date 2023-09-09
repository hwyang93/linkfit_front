import {memberApi} from '@/api/member';
import {useQuery} from '@tanstack/react-query';

export const useMemberInfoQuery = () => {
  return useQuery({
    queryKey: ['member', 'info'],
    queryFn: memberApi.getMemberInfo,
  });
};
