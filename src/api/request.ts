import STORAGE_KEY from '@/utils/constants/storage';
import {refreshToken} from '@api/auth';
import toast from '@hooks/toast';
import axios, {isAxiosError} from 'axios';
import {Platform} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

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
    token = await EncryptedStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
  } else {
    token = await EncryptedStorage.getItem(STORAGE_KEY.REFRESH_TOKEN);
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

service.interceptors.request.use(
  async config => {
    let authHeader;
    if (config.url?.includes('/refresh')) {
      authHeader = await getHeaders('refresh');
    } else {
      authHeader = await getHeaders('access');
    }
    config.headers.Authorization = authHeader.Authorization;
    return config;
  },
  error => Promise.reject(error),
);

service.interceptors.response.use(
  response => response.data,
  async error => {
    if (error.response.data.message === 'expired') {
      const originalRequest = error.config;
      await refreshToken()
        .then(async ({data}) => {
          await EncryptedStorage.setItem(
            STORAGE_KEY.ACCESS_TOKEN,
            data.accessToken,
          );
          service(originalRequest);
        })
        .catch(error => {
          if (isAxiosError(error)) {
            toast.error({message: error.message});
          }
        });
    }
    return Promise.reject(error.response.data);
  },
);

export default service;
