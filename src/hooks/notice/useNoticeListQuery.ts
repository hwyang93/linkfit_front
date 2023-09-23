import { noticeApi } from '@/api/notice';
import { useQuery } from '@tanstack/react-query';

export const useNoticeListQuery = () => {
  return useQuery({
    queryKey: ['notice', 'list'],
    queryFn: noticeApi.getNoticeList,
  });
};
