export type UserRole = 'RESIDENT' | 'OWNER' | 'STAFF' | 'ADMIN';

export type KycStatus = 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'REJECTED';

export interface UserDTO {
  id: string;
  phoneNumber: string;
  email?: string | null;
  fullName: string;
  avatarUrl?: string | null;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ResidentProfileDTO {
  id: string;
  userId: string;
  stayraResidentId: string; // e.g. STR-RES-202609-0842
  emergencyContactName?: string | null;
  emergencyContactPhone?: string | null;
  kycStatus: KycStatus;
  kycDocumentType?: 'AADHAAR' | 'PASSPORT' | 'PAN' | null;
  lifetimeReputationScore: number;
  createdAt: string;
}

export interface OwnerProfileDTO {
  id: string;
  userId: string;
  businessName?: string | null;
  gstin?: string | null;
  payoutAccountVerified: boolean;
  createdAt: string;
}

export interface StaffProfileDTO {
  id: string;
  userId: string;
  assignedPropertyId: string;
  jobTitle: string;
  canResolveTickets: boolean;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // in seconds
}

export interface AuthSessionResponse {
  user: UserDTO;
  residentProfile?: ResidentProfileDTO | null;
  ownerProfile?: OwnerProfileDTO | null;
  staffProfile?: StaffProfileDTO | null;
  tokens: AuthTokens;
}

export interface SendOtpRequestDTO {
  phoneNumber: string;
}

export interface VerifyOtpRequestDTO {
  phoneNumber: string;
  otp: string;
  rolePreference?: UserRole;
}

export interface SignUpRequestDTO {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role?: 'RESIDENT' | 'OWNER';
}

export interface SignInRequestDTO {
  email: string;
  password: string;
}

export interface JwtTokenPayload {
  sub: string;
  email: string | null;
  role: UserRole;
}

