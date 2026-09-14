import { z } from 'zod';

export const recordMeterReadingSchema = z.object({
  tenancyId: z.string().uuid(),
  meterPhotoS3Key: z.string().min(5),
  currentReadingUnits: z.number().positive(),
  ratePerUnit: z.number().positive().default(10.0),
});

export const createPaymentOrderSchema = z.object({
  billId: z.string().uuid(),
});

export type RecordMeterReadingInput = z.infer<typeof recordMeterReadingSchema>;
export type CreatePaymentOrderInput = z.infer<typeof createPaymentOrderSchema>;
