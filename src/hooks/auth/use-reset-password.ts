import { memberApi } from '@/api/member';
import { useMutation } from '@tanstack/react-query';

export const useResetPassword = () => {
  return useMutation({
    mutationFn: memberApi.updateMemberPassword,
  });
};
