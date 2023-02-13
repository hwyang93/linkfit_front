import {refreshToken} from '@api/auth';

const axios = require('axios').default;
import EncryptedStorage from 'react-native-encrypted-storage';

const service = axios.create({
  baseURL: 'http://10.0.2.2:3000/api/v1',
  timeout: 600000,
});
export const getHeaders = async (tokenType: string) => {
  const headers = {
    Authorization: '',
  };
  let token;
  if (tokenType === 'access') {
    token = await EncryptedStorage.getItem('accessToken');
  } else {
    token = await EncryptedStorage.getItem('refreshToken');
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

service.interceptors.request.use(
  async (config: any) => {
    let authHeader;
    if (config.url.includes('/refresh')) {
      authHeader = await getHeaders('refresh');
    } else {
      authHeader = await getHeaders('access');
    }
    config.headers = {...config.headers, ...authHeader};
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);
service.interceptors.response.use(
  (response: {data: any}) => {
    return response.data;
  },
  async (error: any) => {
    const {config} = error;
    if (error.response.data.message === 'expired') {
      const originalRequest = config;
      await refreshToken()
        .then(async ({data}: any) => {
          await EncryptedStorage.setItem('accessToken', data.accessToken);
          service(originalRequest);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
    return Promise.reject(error.response.data);
  },
);

export default service;
