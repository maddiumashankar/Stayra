import { z } from 'zod';

export const requestTenancySchema = z.object({
  propertyId: z.string().uuid(),
  bedId: z.string().uuid(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  expectedDurationMonths: z.number().int().min(1).max(24).default(6),
});

export const moveOutNoticeSchema = z.object({
  tenancyId: z.string().uuid(),
  noticeDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  reason: z.string().max(500).optional(),
});

export type RequestTenancyInput = z.infer<typeof requestTenancySchema>;
export type MoveOutNoticeInput = z.infer<typeof moveOutNoticeSchema>;
