import { instructorApi } from '@/api/instructor';
import { useQuery } from '@tanstack/react-query';

export const useInstructor = (instructorId: number) => {
  return useQuery({
    queryFn: () => instructorApi.getInstructor(instructorId),
    queryKey: ['instructor', instructorId],
  });
};
