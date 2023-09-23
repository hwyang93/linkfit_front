export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export interface SendEmailVerificationCodeBody {
  email: string;
}

export interface CheckEmailVerificationCodeBody {
  email: string;
  authNumber: string;
}

export interface FindEmailParams {
  name: string;
  phone: string;
}
