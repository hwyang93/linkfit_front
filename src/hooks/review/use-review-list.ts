import { reviewApi } from '@/api/review';
import { useQuery } from '@tanstack/react-query';

export const useReviewList = () => {
  return useQuery({
    queryKey: ['review', 'list'],
    queryFn: reviewApi.getReviewList,
  });
};
