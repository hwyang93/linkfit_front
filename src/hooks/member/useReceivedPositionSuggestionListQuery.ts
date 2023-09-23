import { memberApi } from '@/api/member';
import { FetchReceivePositionSuggestsParams } from '@/types/api/member';
import { useQuery } from '@tanstack/react-query';

export const useReceivedPositionSuggestionListQuery = (
  params?: FetchReceivePositionSuggestsParams,
) => {
  const { period, status } = params || {};
  return useQuery({
    queryKey: ['member', 'received-position-suggestion', 'list', period, status],
    queryFn: () =>
      memberApi.getReceivedPositionSuggestionList({
        period,
        status,
      }),
  });
};
