import {
  LoginBody,
  LoginResponse,
  RefreshTokenResponse,
  SendEmailVerificationCodeBody,
} from '@/types/api/auth';
import request from './request';

export const login = (body: LoginBody) => {
  return request.post<LoginResponse>('/auth/login', body);
};

export const refreshToken = () => {
  return request.post<RefreshTokenResponse>('/auth/refresh');
};

export const sendEmailVerificationCode = (
  body: SendEmailVerificationCodeBody,
) => {
  return request.post('/auth/email', body);
};
