import request from '@api/request';
import {FetchCsParams, FetchCsResponse} from '@/types/api/cs';

export const fetchCs = (params?: FetchCsParams) => {
  return request.get<FetchCsResponse>('/cs', {params});
};
