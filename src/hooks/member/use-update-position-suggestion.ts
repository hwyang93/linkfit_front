import { memberApi } from '@/api/member';
import { UpdatePositionSuggestDto } from '@/types/api/dtos.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdatePositionSuggestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { suggestionId: number; body: UpdatePositionSuggestDto }) =>
      memberApi.updatePositionSuggestion(data.suggestionId, data.body),
    onSuccess: () => {
      queryClient.invalidateQueries(['member', 'received-position-suggestion']);
    },
  });
};
