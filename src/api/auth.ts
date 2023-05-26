import {
  LoginParams,
  LoginResponse,
  refreshTokenResponse,
} from '@/types/api/auth';
import request from './request';

export function login(params: LoginParams) {
  return request.post<LoginResponse>('/auth/login', params);
}

export function refreshToken() {
  return request.post<refreshTokenResponse>('/auth/refresh');
}
