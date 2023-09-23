import { customerServiceApi } from '@/api/customer-service';
import { useQuery } from '@tanstack/react-query';

export const useCsInquiryListQuery = () => {
  return useQuery({
    queryKey: ['cs', 'inquiry', 'list'],
    queryFn: () => customerServiceApi.getInquiryList(),
  });
};
