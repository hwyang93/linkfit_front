import { recruitApi } from '@/api/recruit';
import { useQuery } from '@tanstack/react-query';

export const useRecruitApplicationList = (recruitId: number) => {
  return useQuery({
    queryKey: ['recruit', 'application', 'list', recruitId],
    queryFn: () => recruitApi.getApplicationList(recruitId),
  });
};
