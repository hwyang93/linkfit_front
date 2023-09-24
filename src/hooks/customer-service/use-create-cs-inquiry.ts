import { customerServiceApi } from '@/api/customer-service';
import { CreateInquiryDto } from '@/types/api/dtos.type';
import { useMutation } from '@tanstack/react-query';

export const useCreateCsInquiry = () => {
  return useMutation({
    mutationFn: (body: CreateInquiryDto) => customerServiceApi.createInquiry(body),
  });
};
