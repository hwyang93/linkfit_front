import {CreateInquiryDto} from '@/types/api/dtos';
import {FetchInquiryListResponse} from '@/types/api/inquiry';
import {PostResponse} from '@/types/common';
import request from '@api/request';

export const createInquiry = (body: CreateInquiryDto) => {
  return request.post<PostResponse>('/cs/inquiry', body);
};

const ENDPOINT = '/cs';

export const customerServiceApi = {
  getInquiryList: async () => {
    const response = await request.get<FetchInquiryListResponse>(
      `${ENDPOINT}/inquiry`,
    );
    return response.data;
  },
};
