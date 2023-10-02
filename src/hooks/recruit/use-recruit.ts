import { recruitApi } from '@/api/recruit';
import { useQuery } from '@tanstack/react-query';

export const useRecruit = (recruitId?: number) => {
  return useQuery({
    queryKey: ['recruit', 'detail', recruitId],
    queryFn: () => (recruitId ? recruitApi.getRecruitById(recruitId) : null),
    enabled: !!recruitId,
  });
};
