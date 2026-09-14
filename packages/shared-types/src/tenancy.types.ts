export type TenancyStatus =
  | 'REQUESTED'
  | 'OWNER_APPROVED'
  | 'CONFIRMED'
  | 'ACTIVE'
  | 'NOTICE_PERIOD'
  | 'SETTLEMENT_PENDING'
  | 'COMPLETED'
  | 'CANCELLED';

export interface TenancyDTO {
  id: string;
  residentId: string;
  propertyId: string;
  bedId: string;
  status: TenancyStatus;
  startDate: string;
  endDate?: string | null;
  actualMoveOutDate?: string | null;
  agreedRent: number;
  agreedDeposit: number;
  billingDayOfMonth: number;
  digitalAgreementS3Key?: string | null;
  agreementSignedAt?: string | null;
  cancellationReason?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RequestTenancyDTO {
  propertyId: string;
  bedId: string;
  startDate: string;
  expectedDurationMonths: number;
}

export interface MoveOutSettlementDTO {
  tenancyId: string;
  depositPaid: number;
  unpaidRentTotal: number;
  unpaidUtilitiesTotal: number;
  approvedDamages: number;
  unappliedServiceCredits: number;
  finalRefundAmount: number;
  isSettled: boolean;
  settledAt?: string | null;
}
