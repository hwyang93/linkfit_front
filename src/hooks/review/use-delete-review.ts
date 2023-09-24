import { reviewApi } from '@/api/review';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reviewApi.deleteReview,
    onSuccess: () => queryClient.invalidateQueries(['review', 'list']),
  });
};
