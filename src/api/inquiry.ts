import {CreateInquiryDto} from '@/types/api/dtos';
import request from '@api/request';
import {PostResponse} from '@/types/common';
import {FetchInquriyResponse} from '@/types/api/inquiry';

export const createInquiry = (body: CreateInquiryDto) => {
  return request.post<PostResponse>('/cs/inquiry', body);
};

export const fetchInquiries = () => {
  return request.get<FetchInquriyResponse>('/cs/inquiry');
};
