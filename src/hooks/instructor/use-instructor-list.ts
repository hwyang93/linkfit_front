import { instructorApi } from '@/api/instructor';
import { FetchInstructorsParams } from '@/types/api/instructor';
import { useQuery } from '@tanstack/react-query';

export const useInstructorList = (params?: FetchInstructorsParams) => {
  const { noPaging, curPage, perPage, fields } = params || {};

  return useQuery({
    queryKey: ['instructor', 'list', noPaging, curPage, perPage, fields],
    queryFn: () => instructorApi.getInstructorList({ noPaging, curPage, perPage, fields }),
  });
};
