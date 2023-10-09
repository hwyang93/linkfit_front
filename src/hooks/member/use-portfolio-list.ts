import { memberApi } from '@/api/member';
import { useQuery } from '@tanstack/react-query';

export const usePortfolioList = () => {
  return useQuery({
    queryKey: ['portfolio', 'list'],
    queryFn: memberApi.getPortfolioList,
  });
};
