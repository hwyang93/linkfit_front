import { recruitApi } from '@/api/recruit';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateRecruit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: recruitApi.createRecruit,
    onSuccess: () => queryClient.invalidateQueries(['recruit']),
  });
};
