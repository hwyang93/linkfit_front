import { recruitApi } from '@/api/recruit';
import { FetchRecruitsParams } from '@/types/api/recruit.type';
import { useQuery } from '@tanstack/react-query';

export const useRecruitList = (params?: FetchRecruitsParams) => {
  return useQuery({
    queryKey: ['recruit', 'list', params],
    queryFn: () => recruitApi.getRecruitList(params),
  });
};
