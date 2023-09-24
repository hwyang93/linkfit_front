import { customerServiceApi } from '@/api/customer-service';
import { useQuery } from '@tanstack/react-query';

export const useCsInquiry = (inquiryId: number) => {
  return useQuery({
    queryKey: ['cs', 'inquiry', 'detail', inquiryId],
    queryFn: () => customerServiceApi.getInquiryById(inquiryId),
  });
};
