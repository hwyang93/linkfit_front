import request from './request';

const ENDPOINT = '/system/region';

export const regionApi = {
  getCityList: async () => {
    const response = await request.get<Region[]>(ENDPOINT);
    return response.data;
  },
  getDistrictList: async (mainCode: string) => {
    const response = await request.get<Region[]>(`${ENDPOINT}/${mainCode}`);
    return response.data;
  },
  getSubDistrictList: async (mainCode: string, middleCode: string) => {
    const response = await request.get<Region[]>(`${ENDPOINT}/${mainCode}/${middleCode}`);
    return response.data;
  },
};

type Region = {
  code: string;
  name: string;
};
