import { resumeApi } from '@/api/resume';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resumeApi.deleteResume,
    onSuccess: () => queryClient.invalidateQueries(['resume']),
  });
};
