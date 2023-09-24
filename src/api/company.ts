import { FetchCompanyResponse } from '@/types/api/company.type';
import request from '@api/request';

export const fetchCompany = (seq: number) => {
  return request.get<FetchCompanyResponse>(`/company/${seq}`);
};
