import { resumeApi } from '@/api/resume';
import { useQuery } from '@tanstack/react-query';

export const useResumeList = () => {
  return useQuery({
    queryKey: ['resume', 'list'],
    queryFn: resumeApi.getResumeList,
  });
};
