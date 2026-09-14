export interface FeedbackReviewDTO {
  id: string;
  tenancyId: string;
  complaintId?: string | null;
  residentId: string;
  propertyId: string;
  speedRating?: number | null;
  cleanlinessRating?: number | null;
  foodRating?: number | null;
  wifiRating?: number | null;
  staffRating?: number | null;
  overallRating: number;
  reviewText?: string | null;
  createdAt: string;
}

export interface ReputationScoreDTO {
  propertyId: string;
  overallScore: number;
  cleanlinessScore: number;
  foodScore: number;
  maintenanceScore: number;
  wifiScore: number;
  safetyScore: number;
  totalReviewsCount: number;
  slaComplianceRate: number; // e.g. 94.25%
  avgResolutionTimeHours: number;
  lastRecalculatedAt: string;
}
