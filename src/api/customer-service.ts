import {CreateInquiryDto} from '@/types/api/dtos';
import {FetchInquiryListResponse} from '@/types/api/inquiry';
import {PostResponse} from '@/types/common';
import request from '@api/request';

const ENDPOINT = '/cs';

export const customerServiceApi = {
  getInquiryList: async () => {
    const response = await request.get<FetchInquiryListResponse>(
      `${ENDPOINT}/inquiry`,
    );
    return response.data;
  },
  createInquiry: async (body: CreateInquiryDto) => {
    const response = await request.post<PostResponse>(
      `${ENDPOINT}/inquiry`,
      body,
    );
    return response.data;
  },
};
