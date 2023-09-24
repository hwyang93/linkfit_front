import { FetchCsParams, FetchCsResponse } from '@/types/api/cs.type';
import request from '@api/request';

export const fetchCs = (params?: FetchCsParams) => {
  return request.get<FetchCsResponse>('/cs', { params });
};
