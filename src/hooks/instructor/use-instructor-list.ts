import { instructorApi } from '@/api/instructor';
import { FetchInstructorsParams } from '@/types/api/instructor.type';
import { useQuery } from '@tanstack/react-query';

export const useInstructorList = (params?: FetchInstructorsParams) => {
  return useQuery({
    queryKey: ['instructor', 'list', params],
    queryFn: () => instructorApi.getInstructorList(params),
  });
};
