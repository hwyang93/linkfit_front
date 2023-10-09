import { resumeApi } from '@/api/resume';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateResumeMaster = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resumeApi.updateResumeMaster,
    onSuccess: () => queryClient.invalidateQueries(['resume']),
  });
};
