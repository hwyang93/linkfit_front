import { authApi } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';

export const useFindEmail = () => {
  return useMutation({
    mutationFn: authApi.findEmail,
  });
};
