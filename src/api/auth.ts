import {
  CheckEmailVerificationCodeBody,
  FindEmailParams,
  LoginBody,
  LoginResponse,
  RefreshTokenResponse,
  SendEmailVerificationCodeBody,
} from '@/types/api/auth.type';
import request from './request';

const ENDPOINT = '/auth';

export const authApi = {
  login: async (body: LoginBody) => {
    const response = await request.post<LoginResponse>(`${ENDPOINT}/login`, body);
    return response.data;
  },
  refreshToken: async () => {
    const response = await request.post<RefreshTokenResponse>(`${ENDPOINT}/refresh`);
    return response.data;
  },
  findEmail: async (params: FindEmailParams) => {
    const response = await request.get(`${ENDPOINT}/email`, { params });
    return response.data;
  },
  sendEmailVerificationCode: async (body: SendEmailVerificationCodeBody) => {
    const response = await request.post(`${ENDPOINT}/email`, body);
    return response.data;
  },
  checkEmailVerificationCode: async (body: CheckEmailVerificationCodeBody) => {
    const response = await request.post(`${ENDPOINT}/check/email`, body);
    return response.data;
  },
};
