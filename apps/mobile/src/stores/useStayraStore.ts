import { create } from 'zustand';
import {
  Property,
  Tenancy,
  Bill,
  Complaint,
  mockProperties,
  mockActiveTenancy,
  mockBills,
  mockComplaints,
} from '../data/mockData';

export type UserRole = 'RESIDENT' | 'OWNER';

interface SearchFilters {
  city: string;
  neighborhood: string;
  maxBudget: number;
  sharingType: string;
  hasAc: boolean;
  hasFood: boolean;
  flexibleCurfew: boolean;
  verifiedSlaOnly: boolean;
  viewMode: 'LIST' | 'MAP';
}

interface StayraState {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;

  // Discovery & Filtering
  properties: Property[];
  filters: SearchFilters;
  setFilters: (filters: Partial<SearchFilters>) => void;
  resetFilters: () => void;

  // Active Tenancy (Resident)
  activeTenancy: Tenancy;

  // Financial Bills & Ledger
  bills: Bill[];
  payBill: (billId: string, paymentRef: string) => void;

  // Complaints & Maintenance
  complaints: Complaint[];
  addComplaint: (complaint: Omit<Complaint, 'id' | 'ticketNumber' | 'createdAt' | 'isSlaBreached'>) => void;
  updateComplaintStatus: (id: string, status: Complaint['status'], notes?: string) => void;

  // Owner Actions
  subMeterSpikeConfirmed: boolean;
  setSubMeterSpikeConfirmed: (val: boolean) => void;

  // Notifications
  unreadNotificationsCount: number;
  clearNotifications: () => void;
}

const initialFilters: SearchFilters = {
  city: 'Bengaluru',
  neighborhood: 'All Neighborhoods',
  maxBudget: 25000,
  sharingType: 'ALL',
  hasAc: false,
  hasFood: false,
  flexibleCurfew: false,
  verifiedSlaOnly: false,
  viewMode: 'LIST',
};

export const useStayraStore = create<StayraState>((set) => ({
  currentRole: 'RESIDENT',
  setRole: (role) => set({ currentRole: role }),

  properties: mockProperties,
  filters: initialFilters,
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  resetFilters: () => set({ filters: initialFilters }),

  activeTenancy: mockActiveTenancy,

  bills: mockBills,
  payBill: (billId, paymentRef) =>
    set((state) => ({
      bills: state.bills.map((b) =>
        b.id === billId
          ? {
              ...b,
              status: 'PAID',
              paidAmount: b.finalPayableAmount,
              paymentReference: paymentRef,
              paidAt: new Date().toISOString(),
            }
          : b
      ),
    })),

  complaints: mockComplaints,
  addComplaint: (data) => {
    const newId = `tkt-${Date.now().toString().slice(-5)}`;
    const ticketNumber = `TKT-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newComplaint: Complaint = {
      ...data,
      id: newId,
      ticketNumber,
      createdAt: new Date().toISOString(),
      isSlaBreached: false,
    };
    set((state) => ({
      complaints: [newComplaint, ...state.complaints],
      unreadNotificationsCount: state.unreadNotificationsCount + 1,
    }));
  },

  updateComplaintStatus: (id, status, notes) =>
    set((state) => ({
      complaints: state.complaints.map((c) =>
        c.id === id
          ? {
              ...c,
              status,
              resolutionNotes: notes || c.resolutionNotes,
              actualResolvedAt: status === 'RESOLVED' ? new Date().toISOString() : c.actualResolvedAt,
            }
          : c
      ),
    })),

  subMeterSpikeConfirmed: false,
  setSubMeterSpikeConfirmed: (val) => set({ subMeterSpikeConfirmed: val }),

  unreadNotificationsCount: 2,
  clearNotifications: () => set({ unreadNotificationsCount: 0 }),
}));
