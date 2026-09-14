export type ComplaintCategory =
  | 'WATER'
  | 'ELECTRICITY'
  | 'WIFI'
  | 'AC'
  | 'FOOD'
  | 'HOUSEKEEPING'
  | 'PLUMBING'
  | 'SECURITY'
  | 'OTHER';

export type ComplaintSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type ComplaintStatus =
  | 'OPEN'
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'RESOLVED'
  | 'VERIFIED_CLOSED'
  | 'REOPENED'
  | 'CANCELLED';

export interface SlaPolicyDTO {
  id: string;
  propertyId: string;
  category: ComplaintCategory;
  severity: ComplaintSeverity;
  resolutionSlaHours: number;
  compensationRatePerDay: number;
  maxCompensationCap: number;
}

export interface ComplaintAttachmentDTO {
  id: string;
  complaintId: string;
  fileType: 'IMAGE' | 'VIDEO' | 'AUDIO';
  s3Key: string;
}

export interface ComplaintDTO {
  id: string;
  ticketNumber: string; // e.g. TKT-2026-00392
  tenancyId: string;
  propertyId: string;
  residentId: string;
  assignedStaffId?: string | null;
  category: ComplaintCategory;
  severity: ComplaintSeverity;
  status: ComplaintStatus;
  title: string;
  description: string;
  slaTargetTime: string;
  actualResolvedAt?: string | null;
  isSlaBreached: boolean;
  resolutionNotes?: string | null;
  attachments?: ComplaintAttachmentDTO[];
  createdAt: string;
  updatedAt: string;
}

export interface ServiceCompensationCreditDTO {
  id: string;
  complaintId: string;
  residentId: string;
  propertyId: string;
  appliedToBillId?: string | null;
  creditAmount: number;
  breachDurationHours: number;
  calculationBasis: string;
  status: 'PENDING' | 'APPLIED_TO_BILL' | 'REFUNDED';
  createdAt: string;
}
