import {
  LoginBody,
  LoginResponse,
  RefreshTokenResponse,
  SendEmailVerificationCodeBody,
} from '@/types/api/auth';
import request from './request';

const ENDPOINT = '/auth';

export const login = (body: LoginBody) => {
  return request.post<LoginResponse>(`${ENDPOINT}/login`, body);
};

export const refreshToken = () => {
  return request.post<RefreshTokenResponse>(`${ENDPOINT}/refresh`);
};

export const sendEmailVerificationCode = (
  body: SendEmailVerificationCodeBody,
) => {
  return request.post(`${ENDPOINT}/email`, body);
};
