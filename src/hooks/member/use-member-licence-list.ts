import { memberApi } from '@/api/member';
import { useQuery } from '@tanstack/react-query';

export const useMemberLicenceList = () => {
  return useQuery({
    queryKey: ['member', 'licence', 'list'],
    queryFn: memberApi.getMemberLicenceList,
  });
};
