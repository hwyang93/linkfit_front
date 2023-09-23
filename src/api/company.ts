import { FetchCompanyResponse } from '@/types/api/company';
import request from '@api/request';

export const fetchCompany = (seq: number) => {
  return request.get<FetchCompanyResponse>(`/company/${seq}`);
};
