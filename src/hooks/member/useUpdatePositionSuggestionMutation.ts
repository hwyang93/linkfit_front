import {memberApi} from '@/api/member';
import {UpdatePositionSuggestDto} from '@/types/api/dtos';
import {useMutation, useQueryClient} from '@tanstack/react-query';

export const useUpdatePositionSuggestionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      suggestionId: number;
      body: UpdatePositionSuggestDto;
    }) => memberApi.updatePositionSuggestion(data.suggestionId, data.body),
    onSuccess: () => {
      queryClient.invalidateQueries(['member', 'received-position-suggestion']);
    },
  });
};
