import { reviewApi } from '@/api/review';
import { useMutation } from '@tanstack/react-query';

export const useCreateReview = () => {
  return useMutation({
    mutationFn: reviewApi.createReview,
  });
};
