import { z } from 'zod';

export const emailSchema = z.string().email();

export const verificationCodeSchema = z.string().length(6);
