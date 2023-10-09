import { recruitApi } from '@/api/recruit';
import { useMutation } from '@tanstack/react-query';

export const useUpdateRecruitApplyStatus = () => {
  return useMutation({
    mutationFn: recruitApi.updateRecruitApplyStatus,
  });
};
