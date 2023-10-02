import { recruitApi } from '@/api/recruit';
import { useQuery } from '@tanstack/react-query';

export const useRecommendedRecruitList = () => {
  return useQuery({
    queryKey: ['recruit', 'recommnded', 'list'],
    queryFn: recruitApi.getRecommendedRecruitList,
  });
};
