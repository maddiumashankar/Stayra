import { z } from 'zod';

export const complaintCategorySchema = z.enum([
  'WATER',
  'ELECTRICITY',
  'WIFI',
  'AC',
  'FOOD',
  'HOUSEKEEPING',
  'PLUMBING',
  'SECURITY',
  'OTHER',
]);

export const complaintSeveritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);

export const createComplaintSchema = z.object({
  tenancyId: z.string().uuid(),
  category: complaintCategorySchema,
  severity: complaintSeveritySchema.default('MEDIUM'),
  title: z.string().min(5).max(150),
  description: z.string().min(10).max(2000),
  attachmentS3Keys: z.array(z.string()).default([]),
});

export const assignComplaintSchema = z.object({
  complaintId: z.string().uuid(),
  staffId: z.string().uuid(),
});

export const resolveComplaintSchema = z.object({
  complaintId: z.string().uuid(),
  resolutionNotes: z.string().min(5).max(1000),
  resolutionPhotoS3Key: z.string().optional(),
});

export type CreateComplaintInput = z.infer<typeof createComplaintSchema>;
export type AssignComplaintInput = z.infer<typeof assignComplaintSchema>;
export type ResolveComplaintInput = z.infer<typeof resolveComplaintSchema>;
