export type BillStatus = 'DRAFT' | 'ISSUED' | 'PARTIALLY_PAID' | 'PAID' | 'OVERDUE' | 'VOID';

export type BillItemCategory =
  | 'BASE_RENT'
  | 'ELECTRICITY_METERED'
  | 'WATER_CHARGES'
  | 'FOOD_MESS'
  | 'MAINTENANCE'
  | 'SERVICE_COMPENSATION_CREDIT'
  | 'ONE_TIME_CHARGE';

export interface BillItemDTO {
  id: string;
  billId: string;
  category: BillItemCategory;
  description: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number; // negative if credit
  metadata?: Record<string, unknown> | null;
}

export interface BillDTO {
  id: string;
  tenancyId: string;
  billingPeriodStart: string;
  billingPeriodEnd: string;
  dueDate: string;
  subtotalAmount: number;
  totalServiceCredits: number;
  finalPayableAmount: number;
  paidAmount: number;
  status: BillStatus;
  invoiceNumber: string;
  pdfS3Key?: string | null;
  aiAnomalyFlagged: boolean;
  aiAnomalyReason?: string | null;
  items?: BillItemDTO[];
  createdAt: string;
}

export type AccountType =
  | 'ASSET_ESCROW'
  | 'LIABILITY_DEPOSIT'
  | 'RECEIVABLE_RESIDENT'
  | 'REVENUE_RENT'
  | 'REVENUE_UTILITIES'
  | 'EXPENSE_SERVICE_COMPENSATION';

export interface LedgerEntryDTO {
  id: string;
  transactionGroupId: string;
  debitAccountId: string;
  creditAccountId: string;
  amount: number;
  description: string;
  idempotencyKey: string;
  referenceEntityType: 'BILL' | 'PAYMENT' | 'COMPENSATION' | 'DEPOSIT_REFUND';
  referenceEntityId: string;
  postedAt: string;
}

export interface RecordMeterReadingDTO {
  tenancyId: string;
  meterPhotoS3Key: string;
  currentReadingUnits: number;
  ratePerUnit: number;
}
