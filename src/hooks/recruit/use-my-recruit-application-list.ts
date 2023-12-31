import { recruitApi } from '@/api/recruit';
import { FetchRecruitApplicationsMyParams } from '@/types/api/recruit.type';
import { useQuery } from '@tanstack/react-query';

export const useMyRecruitApplicationList = (params?: FetchRecruitApplicationsMyParams) => {
  return useQuery({
    queryKey: ['my', 'recruit', 'application', 'list', params],
    queryFn: () => recruitApi.getMyApplicationList(params),
  });
};
