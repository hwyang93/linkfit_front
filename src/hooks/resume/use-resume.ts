import { resumeApi } from '@/api/resume';
import { useQuery } from '@tanstack/react-query';

export const useResume = (resumeId: number) => {
  return useQuery({
    queryKey: ['resume', 'detail', resumeId],
    queryFn: () => resumeApi.getResume(resumeId),
  });
};
