import {LoginBody, LoginResponse, refreshTokenResponse} from '@/types/api/auth';
import request from './request';

export const login = (body: LoginBody) => {
  return request.post<LoginResponse>('/auth/login', body);
};

export const refreshToken = () => {
  return request.post<refreshTokenResponse>('/auth/refresh');
};
