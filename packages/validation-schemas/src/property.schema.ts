import { z } from 'zod';

export const coordinatesSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const searchPropertiesSchema = z.object({
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  radiusMeters: z.coerce.number().positive().optional().default(5000),
  minBudget: z.coerce.number().nonnegative().optional(),
  maxBudget: z.coerce.number().positive().optional(),
  sharingType: z
    .enum(['SINGLE', 'DOUBLE', 'TRIPLE', 'FOUR_SHARING', 'DORMITORY'])
    .optional(),
  genderCategory: z.enum(['MALE', 'FEMALE', 'UNISEX']).optional(),
  hasAc: z.coerce.boolean().optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().min(1).max(50).optional().default(20),
});

export const createPropertySchema = z.object({
  name: z.string().min(3).max(150),
  description: z.string().max(2000).optional(),
  addressLine1: z.string().min(5).max(255),
  addressLine2: z.string().max(255).optional(),
  city: z.string().min(2).max(100),
  state: z.string().min(2).max(100),
  postalCode: z.string().min(4).max(20),
  coordinates: coordinatesSchema,
  genderCategory: z.enum(['MALE', 'FEMALE', 'UNISEX']),
  noticePeriodDays: z.number().int().min(15).max(90).default(30),
  curfewTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Format must be HH:MM').optional(),
  amenityCodes: z.array(z.string()).default([]),
});

export const createRoomSchema = z.object({
  propertyId: z.string().uuid(),
  roomNumber: z.string().min(1).max(50),
  floorNumber: z.number().int(),
  sharingType: z.enum(['SINGLE', 'DOUBLE', 'TRIPLE', 'FOUR_SHARING', 'DORMITORY']),
  hasAttachedBathroom: z.boolean().default(true),
  hasAc: z.boolean().default(false),
  hasBalcony: z.boolean().default(false),
  baseRentPerBed: z.number().positive(),
  securityDeposit: z.number().positive(),
});

export type SearchPropertiesInput = z.infer<typeof searchPropertiesSchema>;
export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
export type CreateRoomInput = z.infer<typeof createRoomSchema>;
