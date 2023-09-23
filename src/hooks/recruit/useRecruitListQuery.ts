import { recruitApi } from '@/api/recruit';
import { FetchRecruitsParams } from '@/types/api/recruit';
import { useQuery } from '@tanstack/react-query';

export const useRecruitListQuery = (params?: FetchRecruitsParams) => {
  return useQuery({
    queryKey: ['recruit', 'list', params],
    queryFn: () => recruitApi.getRecruitList(params),
  });
};
