import { z } from 'zod';

export const emailSchema = z.string().email();

export const verificationCodeSchema = z.string().length(6);

// 영문, 숫자, 특수문자 포함 8자 이상
export const passwordSchema = z.string().refine((password) => {
  return /^(?=.*[a-zA-Z0-9])(?=.*[^a-zA-Z0-9]).{8,}$/.test(password);
});
