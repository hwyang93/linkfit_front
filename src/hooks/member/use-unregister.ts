import { memberApi } from '@/api/member';
import { useMutation } from '@tanstack/react-query';

export const useUnregister = () => {
  return useMutation({
    mutationFn: memberApi.unregister,
  });
};
