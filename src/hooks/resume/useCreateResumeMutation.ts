import { resumeApi } from '@/api/resume';
import { useMutation } from '@tanstack/react-query';

export const useCreateResumeMutation = () => {
  return useMutation({
    mutationFn: (data: object) => resumeApi.createResume(data),
  });
};
