import { memberApi } from '@/api/member';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMemberUnfollow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: memberApi.unfollow,
    onSuccess: () => queryClient.invalidateQueries(['member']),
  });
};
