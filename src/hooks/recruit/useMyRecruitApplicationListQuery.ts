import {recruitApi} from '@/api/recruit';
import {FetchRecruitApplicationsMyParams} from '@/types/api/recruit';
import {useQuery} from '@tanstack/react-query';

export const useMyRecruitApplicationListQuery = (
  params?: FetchRecruitApplicationsMyParams,
) => {
  return useQuery({
    queryKey: ['my', 'recruit', 'application', 'list', params],
    queryFn: () => recruitApi.getMyApplicationList(params),
  });
};
