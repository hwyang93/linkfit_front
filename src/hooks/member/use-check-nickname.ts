import { memberApi } from '@/api/member';
import { useQuery } from '@tanstack/react-query';

export const useCheckNickname = (nickname: string) => {
  return useQuery({
    queryKey: ['member', 'nickname', nickname],
    queryFn: () => memberApi.checkNickname(nickname),
    enabled: false,
  });
};
