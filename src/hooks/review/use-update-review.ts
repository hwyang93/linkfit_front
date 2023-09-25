import { reviewApi } from '@/api/review';
import { UpdateReviewBody } from '@/types/api/review.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { reviewId: number; body: UpdateReviewBody }) =>
      reviewApi.updateReview(data.reviewId, data.body),
    onSuccess: () => queryClient.invalidateQueries(['review', 'list']),
  });
};
