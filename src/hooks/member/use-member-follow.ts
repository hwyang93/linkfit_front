import { memberApi } from '@/api/member';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMemberFollow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: memberApi.follow,
    onSuccess: () => queryClient.invalidateQueries(['member']),
  });
};
