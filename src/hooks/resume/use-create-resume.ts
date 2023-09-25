import { resumeApi } from '@/api/resume';
import { useMutation } from '@tanstack/react-query';

export const useCreateResume = () => {
  return useMutation({
    mutationFn: (data: object) => resumeApi.createResume(data),
  });
};
