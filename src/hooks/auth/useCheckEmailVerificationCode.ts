import { authApi } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';

export const useCheckEmailVerificationCode = () => {
  return useMutation({
    mutationFn: authApi.checkEmailVerificationCode,
  });
};
