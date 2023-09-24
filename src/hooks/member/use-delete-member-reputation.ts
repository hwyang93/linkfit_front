import { memberApi } from '@/api/member';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteMemberReputation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: memberApi.deleteReputation,
    onSuccess: () => queryClient.invalidateQueries(['member', 'reputation', 'list']),
  });
};
