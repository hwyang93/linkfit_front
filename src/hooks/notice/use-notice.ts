import { noticeApi } from '@/api/notice';
import { useQuery } from '@tanstack/react-query';

export const useNotice = (noticeId: number) => {
  return useQuery({
    queryKey: ['notice', 'detail', noticeId],
    queryFn: () => noticeApi.getNoticeById(noticeId),
  });
};
