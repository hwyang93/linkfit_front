import {
  LoginParams,
  LoginResponse,
  refreshTokenResponse,
} from '@/types/api/auth';
import request from './request';

export const login = (params: LoginParams) => {
  return request.post<LoginResponse>('/auth/login', params);
};

export const refreshToken = () => {
  return request.post<refreshTokenResponse>('/auth/refresh');
};
