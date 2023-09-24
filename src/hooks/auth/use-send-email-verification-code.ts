import { authApi } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';

export const useSendEmailVerificationCode = () => {
  return useMutation({
    mutationFn: authApi.sendEmailVerificationCode,
  });
};
