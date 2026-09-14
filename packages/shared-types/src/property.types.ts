export type RoomSharingType = 'SINGLE' | 'DOUBLE' | 'TRIPLE' | 'FOUR_SHARING' | 'DORMITORY';

export type BedStatus = 'VACANT' | 'RESERVED' | 'OCCUPIED' | 'MAINTENANCE';

export type GenderCategory = 'MALE' | 'FEMALE' | 'UNISEX';

export type AmenityCode =
  | 'WIFI'
  | 'POWER_BACKUP'
  | 'WASHING_MACHINE'
  | 'GYM'
  | 'CCTV'
  | 'RO_WATER'
  | 'HOUSEKEEPING'
  | 'REFRIGERATOR'
  | 'BIOMETRIC_ENTRY';

export interface CoordinatesDTO {
  latitude: number;
  longitude: number;
}

export interface BedDTO {
  id: string;
  roomId: string;
  bedIdentifier: string;
  status: BedStatus;
  currentTenancyId?: string | null;
}

export interface RoomDTO {
  id: string;
  propertyId: string;
  roomNumber: string;
  floorNumber: number;
  sharingType: RoomSharingType;
  hasAttachedBathroom: boolean;
  hasAc: boolean;
  hasBalcony: boolean;
  baseRentPerBed: number;
  securityDeposit: number;
  isActive: boolean;
  beds?: BedDTO[];
}

export interface PropertyAmenityDTO {
  amenityCode: AmenityCode;
  isFree: boolean;
  monthlyCharge: number;
}

export interface DailyFoodMenuDTO {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  isVegetarian: boolean;
}

export interface PropertyDTO {
  id: string;
  ownerId: string;
  name: string;
  description?: string | null;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state: string;
  postalCode: string;
  coordinates: CoordinatesDTO;
  genderCategory: GenderCategory;
  noticePeriodDays: number;
  curfewTime?: string | null;
  isVerified: boolean;
  photos: string[];
  amenities: PropertyAmenityDTO[];
  foodMenu?: DailyFoodMenuDTO | null;
  minBaseRent?: number;
  reputationScore?: number;
  distanceMeters?: number;
  createdAt: string;
}

export interface SearchPropertiesQueryDTO {
  latitude: number;
  longitude: number;
  radiusMeters?: number; // default 5000 (5km)
  minBudget?: number;
  maxBudget?: number;
  sharingType?: RoomSharingType;
  genderCategory?: GenderCategory;
  hasAc?: boolean;
  amenities?: AmenityCode[];
  page?: number;
  limit?: number;
}
