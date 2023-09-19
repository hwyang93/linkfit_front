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

export interface checkVerificationCodeBody {
  email: string;
  authNumber: string;
}
