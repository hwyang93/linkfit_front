import {memberApi} from '@/api/member';
import {useMutation} from '@tanstack/react-query';

export const useUnregisterMutation = () => {
  return useMutation({
    mutationFn: memberApi.unregister,
  });
};
