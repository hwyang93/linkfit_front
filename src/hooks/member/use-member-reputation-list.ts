import { memberApi } from '@/api/member';
import { useQuery } from '@tanstack/react-query';

export const useMemberReputationList = () => {
  return useQuery({
    queryKey: ['member', 'reputation', 'list'],
    queryFn: memberApi.getReputationList,
  });
};
