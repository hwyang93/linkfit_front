import { reviewApi } from '@/api/review';
import { useQuery } from '@tanstack/react-query';

export const useReview = (reviewId?: number) => {
  return useQuery({
    queryKey: ['review', reviewId],
    queryFn: () => {
      if (!reviewId) return;

      return reviewApi.getReview(reviewId);
    },
    enabled: !!reviewId,
  });
};
