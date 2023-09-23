import { customerServiceApi } from '@/api/customer-service';
import { CreateInquiryDto } from '@/types/api/dtos';
import { useMutation } from '@tanstack/react-query';

export const useCreateCsInquiryMutation = () => {
  return useMutation({
    mutationFn: (body: CreateInquiryDto) => customerServiceApi.createInquiry(body),
  });
};
