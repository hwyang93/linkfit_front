import { companyApi } from '@/api/company';
import { useQuery } from '@tanstack/react-query';

export const useCompany = (companyId: number) => {
  return useQuery({
    queryFn: () => companyApi.getCompany(companyId),
    queryKey: ['company', companyId],
  });
};
