import { memberApi } from '@/api/member';
import { useQuery } from '@tanstack/react-query';

export const useReceivedPositionSuggestionQuery = (suggestionId: number) => {
  return useQuery({
    queryKey: ['member', 'received-position-suggestion', 'detail', suggestionId],
    queryFn: () => memberApi.getReceivedPositionSuggestion(suggestionId),
  });
};
