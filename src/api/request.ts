import {refreshToken} from '@api/auth';

const axios = require('axios').default;
import EncryptedStorage from 'react-native-encrypted-storage';
import {Platform} from 'react-native';
import toast from '@hooks/toast';

const uri =
  process.env.NODE_ENV === 'production'
    ? 'http://linkfit-back-api.works/api/v1'
    : Platform.OS === 'ios'
    ? 'http://127.0.0.1:3000/api/v1'
    : 'http://10.0.2.2:3000/api/v1';
const service = axios.create({
  // baseURL: 'http://172.30.1.89:3000/api/v1',
  baseURL: uri,
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
        .catch((e: any) => {
          toast.error({message: e.message});
        });
    }
    return Promise.reject(error.response.data);
  },
);

export default service;
