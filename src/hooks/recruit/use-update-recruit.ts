import { recruitApi } from '@/api/recruit';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateRecruit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: recruitApi.updateRecruit,
    onSuccess: () => queryClient.invalidateQueries(['recruit']),
  });
};
