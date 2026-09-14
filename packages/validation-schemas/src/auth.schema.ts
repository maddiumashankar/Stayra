import { z } from 'zod';

export const sendOtpSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number cannot exceed 15 digits')
    .regex(/^\+?[1-9]\d{9,14}$/, 'Invalid international phone number format'),
});

export const verifyOtpSchema = z.object({
  phoneNumber: z
    .string()
    .min(10)
    .max(15)
    .regex(/^\+?[1-9]\d{9,14}$/, 'Invalid phone number format'),
  otp: z
    .string()
    .length(6, 'OTP must be exactly 6 digits')
    .regex(/^\d{6}$/, 'OTP must contain only numbers'),
  rolePreference: z.enum(['RESIDENT', 'OWNER']).optional().default('RESIDENT'),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(20, 'Invalid refresh token'),
});

export type SendOtpInput = z.infer<typeof sendOtpSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
