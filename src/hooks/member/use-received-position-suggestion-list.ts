import { memberApi } from '@/api/member';
import { FetchReceivePositionSuggestsParams } from '@/types/api/member.type';
import { useQuery } from '@tanstack/react-query';

export const useReceivedPositionSuggestionList = (params?: FetchReceivePositionSuggestsParams) => {
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
