import { FetchCompanyResponse } from '@/types/api/company.type';
import request from '@api/request';

const ENDPOINT = '/company';

export const companyApi = {
  getCompany: async (companyId: number) => {
    const resposne = await request.get<FetchCompanyResponse>(`${ENDPOINT}/${companyId}`);
    return resposne.data;
  },
};
