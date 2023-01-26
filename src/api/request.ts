const axios = require('axios').default;
import EncryptedStorage from 'react-native-encrypted-storage';

const service = axios.create({
  baseURL: 'http://10.0.2.2:3000/api/v1',
  timeout: 600000,
});
export const getHeaders = async () => {
  const headers = {
    Authorization: '',
  };
  const token = await EncryptedStorage.getItem('accessToken');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

service.interceptors.request.use(
  async (config: {headers: any}) => {
    config.headers = {...config.headers, ...(await getHeaders())};
    console.log(config.headers);
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);
service.interceptors.response.use(
  function (response: {data: any}) {
    return response.data;
  },
  function (error: any) {
    return Promise.reject(error);
  },
);
export default service;
