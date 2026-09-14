export interface Property {
  id: string;
  name: string;
  tagline: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  coordinates: { latitude: number; longitude: number };
  rating: number;
  reviewCount: number;
  slaAdherenceRate: number; // e.g. 96.4%
  avgResolutionHours: number; // e.g. 11.2
  compensationHonorRate: number; // e.g. 100%
  photos: string[];
  genderCategory: 'MALE' | 'FEMALE' | 'UNISEX';
  noticePeriodDays: number;
  curfewTime: string | null;
  startingPrice: number;
  amenities: {
    code: string;
    label: string;
    isFree: boolean;
  }[];
  rules: string[];
  slaPolicies: {
    category: string;
    severity: string;
    hours: number;
    compensationPerDay: number;
  }[];
  roomsCount: number;
  occupiedBeds: number;
  totalBeds: number;
}

export interface Room {
  id: string;
  propertyId: string;
  roomNumber: string;
  floorNumber: number;
  sharingType: 'SINGLE' | 'DOUBLE' | 'TRIPLE' | 'FOUR_SHARING';
  hasAttachedBathroom: boolean;
  hasAc: boolean;
  hasBalcony: boolean;
  baseRentPerBed: number;
  securityDeposit: number;
  photos: string[];
  beds: Bed[];
}

export interface Bed {
  id: string;
  roomId: string;
  bedIdentifier: string; // e.g. Bed-A, Bed-B
  status: 'VACANT' | 'RESERVED' | 'OCCUPIED' | 'MAINTENANCE';
  tenant?: {
    residentId: string;
    name: string;
    workplace: string;
    moveInDate: string;
    avatarUrl: string;
  };
}

export interface Tenancy {
  id: string;
  residentId: string;
  residentName: string;
  residentEmail: string;
  residentPhone: string;
  stayraResidentId: string; // e.g. STR-RES-202609-0842
  lifetimeRating: number;
  kycStatus: 'VERIFIED' | 'PENDING' | 'UNVERIFIED';
  propertyId: string;
  propertyName: string;
  propertyAddress: string;
  roomNumber: string;
  bedIdentifier: string;
  sharingType: string;
  status: 'ACTIVE' | 'NOTICE_PERIOD' | 'SETTLEMENT_PENDING' | 'COMPLETED';
  startDate: string;
  endDate: string;
  agreedRent: number;
  agreedDeposit: number;
  wifiSsid: string;
  wifiPassword: string;
  roommates: {
    name: string;
    workplace: string;
    bed: string;
    avatar: string;
  }[];
}

export interface BillItem {
  id: string;
  category: 'BASE_RENT' | 'ELECTRICITY_METERED' | 'WATER_CHARGES' | 'FOOD_MESS' | 'SERVICE_COMPENSATION_CREDIT' | 'MAINTENANCE';
  description: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number; // Negative for credit
  metadata?: {
    prevMeterUnits?: number;
    currentMeterUnits?: number;
    meterPhotoUrl?: string;
  };
}

export interface Bill {
  id: string;
  tenancyId: string;
  invoiceNumber: string;
  billingPeriodStart: string;
  billingPeriodEnd: string;
  dueDate: string;
  subtotalAmount: number;
  totalServiceCredits: number;
  finalPayableAmount: number;
  paidAmount: number;
  status: 'DRAFT' | 'ISSUED' | 'PARTIALLY_PAID' | 'PAID' | 'OVERDUE';
  items: BillItem[];
  paymentReference?: string;
  paidAt?: string;
}

export interface Complaint {
  id: string;
  ticketNumber: string; // e.g. TKT-2026-00392
  tenancyId: string;
  propertyId: string;
  propertyName: string;
  roomNumber: string;
  residentName: string;
  category: 'WIFI' | 'ELECTRICITY' | 'WATER' | 'AC' | 'FOOD' | 'HOUSEKEEPING' | 'PLUMBING' | 'SECURITY';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'OPEN' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED' | 'VERIFIED_CLOSED';
  title: string;
  description: string;
  createdAt: string;
  slaTargetTime: string;
  actualResolvedAt?: string;
  isSlaBreached: boolean;
  compensationCredit?: number;
  compensationStatus?: 'PENDING' | 'APPLIED_TO_BILL' | 'REFUNDED';
  assignedStaff?: {
    name: string;
    role: string;
    phone: string;
    avatarUrl: string;
  };
  resolutionNotes?: string;
  resolutionPhotoUrl?: string;
  photoAttachments: string[];
  feedback?: {
    speedRating: number;
    staffRating: number;
    isFullyResolved: boolean;
    reviewText: string;
  };
}

export interface FoodMenuDay {
  day: string; // Monday, Tuesday, etc.
  breakfast: { item: string; isVeg: boolean; time: string };
  lunch: { item: string; isVeg: boolean; time: string };
  snacks: { item: string; isVeg: boolean; time: string };
  dinner: { item: string; isVeg: boolean; time: string };
}

// ----------------------------------------------------
// Mock Dataset for Believable Indian PG Living
// ----------------------------------------------------

export const mockProperties: Property[] = [
  {
    id: 'prop-hsr-01',
    name: 'Stayra Prime — HSR Sector 4',
    tagline: 'Tech-enabled co-living with high-speed fiber & rooftop cafeteria',
    address: '14th Main, Sector 4, near BDA Complex, HSR Layout',
    neighborhood: 'HSR Layout',
    city: 'Bengaluru',
    state: 'Karnataka',
    coordinates: { latitude: 12.9121, longitude: 77.6446 },
    rating: 4.88,
    reviewCount: 94,
    slaAdherenceRate: 95.8,
    avgResolutionHours: 9.4,
    compensationHonorRate: 100,
    photos: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
    ],
    genderCategory: 'UNISEX',
    noticePeriodDays: 30,
    curfewTime: null, // No curfew
    startingPrice: 12500,
    amenities: [
      { code: 'WIFI', label: '250 Mbps Fiber WiFi (Verified)', isFree: true },
      { code: 'POWER_BACKUP', label: '100% DG Power Backup 24/7', isFree: true },
      { code: 'AC', label: 'Invertor Split AC in all rooms', isFree: true },
      { code: 'FOOD', label: '3 Daily Homestyle Meals (North & South)', isFree: true },
      { code: 'BIOMETRIC', label: 'Keyless Biometric Entry & CCTV', isFree: true },
      { code: 'CLEANING', label: 'Daily Housekeeping & Linen Care', isFree: true },
      { code: 'WASHING_MACHINE', label: 'Smart Bosch Washing Machines', isFree: true },
      { code: 'RO_WATER', label: 'Commercial UV+RO Purifiers', isFree: true },
    ],
    rules: [
      'Zero curfew hours with 24/7 smart biometric door access',
      'Guests allowed in common co-working lounge till 10:00 PM',
      'Strict non-smoking policy inside living corridors and rooms',
      '30-day digital notice required for move-out and full deposit refund',
    ],
    slaPolicies: [
      { category: 'WIFI', severity: 'HIGH', hours: 24, compensationPerDay: 100 },
      { category: 'ELECTRICITY', severity: 'CRITICAL', hours: 4, compensationPerDay: 150 },
      { category: 'WATER', severity: 'CRITICAL', hours: 4, compensationPerDay: 300 },
      { category: 'AC', severity: 'HIGH', hours: 24, compensationPerDay: 200 },
      { category: 'HOUSEKEEPING', severity: 'LOW', hours: 12, compensationPerDay: 50 },
    ],
    roomsCount: 16,
    occupiedBeds: 28,
    totalBeds: 32,
  },
  {
    id: 'prop-krm-02',
    name: 'Stayra Sanctuary — Koramangala 5th Block',
    tagline: 'Quiet tree-lined residential retreat for startup founders & devs',
    address: '80 Feet Road, 5th Block, near Sony World Signal',
    neighborhood: 'Koramangala',
    city: 'Bengaluru',
    state: 'Karnataka',
    coordinates: { latitude: 12.9352, longitude: 77.6245 },
    rating: 4.92,
    reviewCount: 112,
    slaAdherenceRate: 97.2,
    avgResolutionHours: 7.8,
    compensationHonorRate: 100,
    photos: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    ],
    genderCategory: 'UNISEX',
    noticePeriodDays: 30,
    curfewTime: null,
    startingPrice: 14500,
    amenities: [
      { code: 'WIFI', label: '300 Mbps Dual-Band Fiber', isFree: true },
      { code: 'POWER_BACKUP', label: '24/7 Silent DG Generator', isFree: true },
      { code: 'AC', label: 'Daikin Dual Inverter AC', isFree: true },
      { code: 'FOOD', label: 'Chef-prepared Gourmet Indian Meals', isFree: true },
      { code: 'GYM', label: 'In-house Cardio & Fitness Zone', isFree: true },
    ],
    rules: [
      '24/7 keyless access via Stayra Mobile App',
      'Quiet co-working hours in terrace garden 9 PM - 8 AM',
      'Itemized electricity sub-meter billed on 1st of month',
    ],
    slaPolicies: [
      { category: 'WIFI', severity: 'HIGH', hours: 12, compensationPerDay: 150 },
      { category: 'ELECTRICITY', severity: 'CRITICAL', hours: 3, compensationPerDay: 200 },
      { category: 'WATER', severity: 'CRITICAL', hours: 3, compensationPerDay: 300 },
      { category: 'AC', severity: 'HIGH', hours: 18, compensationPerDay: 250 },
    ],
    roomsCount: 12,
    occupiedBeds: 22,
    totalBeds: 24,
  },
  {
    id: 'prop-ggn-03',
    name: 'Stayra Tech Hub — Cyber City Phase 2',
    tagline: 'Modern luxury corporate residences 5 mins from DLF Epitome',
    address: 'DLF Phase 2, near Sikanderpur Metro Station',
    neighborhood: 'Cyber City',
    city: 'Gurugram',
    state: 'Haryana',
    coordinates: { latitude: 28.4912, longitude: 77.0924 },
    rating: 4.79,
    reviewCount: 76,
    slaAdherenceRate: 94.0,
    avgResolutionHours: 12.0,
    compensationHonorRate: 100,
    photos: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    ],
    genderCategory: 'UNISEX',
    noticePeriodDays: 30,
    curfewTime: '23:30',
    startingPrice: 16000,
    amenities: [
      { code: 'WIFI', label: 'Commercial Cisco Mesh WiFi', isFree: true },
      { code: 'POWER_BACKUP', label: 'Uninterrupted 24/7 Power', isFree: true },
      { code: 'FOOD', label: 'Buffet Breakfast & Executive Dinner', isFree: true },
      { code: 'ELEVATOR', label: 'High-speed Schindler Elevator', isFree: true },
    ],
    rules: [
      'Gate closes at 11:30 PM (Special late pass via app available)',
      'Visitors registered at security desk',
      'Electricity sub-meter @ ₹10.5/unit billed accurately',
    ],
    slaPolicies: [
      { category: 'WIFI', severity: 'HIGH', hours: 24, compensationPerDay: 100 },
      { category: 'AC', severity: 'CRITICAL', hours: 12, compensationPerDay: 250 },
    ],
    roomsCount: 20,
    occupiedBeds: 36,
    totalBeds: 40,
  },
];

export const mockRooms: Room[] = [
  {
    id: 'room-204',
    propertyId: 'prop-hsr-01',
    roomNumber: '204',
    floorNumber: 2,
    sharingType: 'DOUBLE',
    hasAttachedBathroom: true,
    hasAc: true,
    hasBalcony: true,
    baseRentPerBed: 12500,
    securityDeposit: 20000,
    photos: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80',
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80',
    ],
    beds: [
      {
        id: 'bed-204-a',
        roomId: 'room-204',
        bedIdentifier: 'Bed-A (Window Side)',
        status: 'OCCUPIED',
        tenant: {
          residentId: 'res-4910',
          name: 'Arjun Swaminathan',
          workplace: 'Frontend Architect @ Flipkart',
          moveInDate: '2026-03-01',
          avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&q=80',
        },
      },
      {
        id: 'bed-204-b',
        roomId: 'room-204',
        bedIdentifier: 'Bed-B (Balcony View)',
        status: 'OCCUPIED',
        tenant: {
          residentId: 'res-0842',
          name: 'Rohan Verma',
          workplace: 'Senior Engineer @ Swiggy',
          moveInDate: '2026-06-15',
          avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&q=80',
        },
      },
    ],
  },
  {
    id: 'room-301',
    propertyId: 'prop-hsr-01',
    roomNumber: '301',
    floorNumber: 3,
    sharingType: 'SINGLE',
    hasAttachedBathroom: true,
    hasAc: true,
    hasBalcony: true,
    baseRentPerBed: 21000,
    securityDeposit: 30000,
    photos: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    ],
    beds: [
      {
        id: 'bed-301-a',
        roomId: 'room-301',
        bedIdentifier: 'Private Bed',
        status: 'VACANT',
      },
    ],
  },
  {
    id: 'room-102',
    propertyId: 'prop-hsr-01',
    roomNumber: '102',
    floorNumber: 1,
    sharingType: 'DOUBLE',
    hasAttachedBathroom: true,
    hasAc: true,
    hasBalcony: false,
    baseRentPerBed: 11500,
    securityDeposit: 18000,
    photos: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
    ],
    beds: [
      {
        id: 'bed-102-a',
        roomId: 'room-102',
        bedIdentifier: 'Bed-A',
        status: 'OCCUPIED',
        tenant: {
          residentId: 'res-9912',
          name: 'Vikram Mehta',
          workplace: 'Analyst @ Goldman Sachs',
          moveInDate: '2026-04-10',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
        },
      },
      {
        id: 'bed-102-b',
        roomId: 'room-102',
        bedIdentifier: 'Bed-B',
        status: 'VACANT',
      },
    ],
  },
];

export const mockActiveTenancy: Tenancy = {
  id: 'tenancy-849201',
  residentId: 'res-0842',
  residentName: 'Rohan Verma',
  residentEmail: 'rohan.verma@example.com',
  residentPhone: '+91 98765 43210',
  stayraResidentId: 'STR-RES-202609-0842',
  lifetimeRating: 4.96,
  kycStatus: 'VERIFIED',
  propertyId: 'prop-hsr-01',
  propertyName: 'Stayra Prime — HSR Sector 4',
  propertyAddress: '14th Main, Sector 4, near BDA Complex, HSR Layout, Bengaluru',
  roomNumber: '204',
  bedIdentifier: 'Bed-B (Balcony View)',
  sharingType: '2-Sharing Deluxe (AC)',
  status: 'ACTIVE',
  startDate: '2026-06-15',
  endDate: '2027-06-14',
  agreedRent: 12500,
  agreedDeposit: 20000,
  wifiSsid: 'StayraPrime_5G_Floor2',
  wifiPassword: 'StayraLivingSecure99#',
  roommates: [
    {
      name: 'Arjun Swaminathan',
      workplace: 'Frontend Architect @ Flipkart',
      bed: 'Bed-A (Window Side)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&q=80',
    },
  ],
};

export const mockBills: Bill[] = [
  {
    id: 'bill-sep-2026',
    tenancyId: 'tenancy-849201',
    invoiceNumber: 'INV-2026-09-0012',
    billingPeriodStart: '2026-09-01',
    billingPeriodEnd: '2026-09-30',
    dueDate: '2026-10-05',
    subtotalAmount: 13500,
    totalServiceCredits: 100, // SLA compensation credit applied!
    finalPayableAmount: 13400,
    paidAmount: 0,
    status: 'ISSUED',
    items: [
      {
        id: 'item-1',
        category: 'BASE_RENT',
        description: 'Monthly Base Rent (Room 204 - Bed B)',
        quantity: 1,
        unitPrice: 12500,
        totalAmount: 12500,
      },
      {
        id: 'item-2',
        category: 'ELECTRICITY_METERED',
        description: 'Electricity Sub-Meter (65 kWh units @ ₹10.00/unit)',
        quantity: 65,
        unitPrice: 10,
        totalAmount: 650,
        metadata: {
          prevMeterUnits: 1420,
          currentMeterUnits: 1485,
          meterPhotoUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80',
        },
      },
      {
        id: 'item-3',
        category: 'WATER_CHARGES',
        description: 'Water Supply & Common Area Utility Maintenance',
        quantity: 1,
        unitPrice: 350,
        totalAmount: 350,
      },
      {
        id: 'item-4',
        category: 'SERVICE_COMPENSATION_CREDIT',
        description: 'SLA Compensation Credit: Ticket #TKT-00392 (WiFi outage breach: 28h)',
        quantity: 1,
        unitPrice: -100,
        totalAmount: -100,
      },
    ],
  },
  {
    id: 'bill-aug-2026',
    tenancyId: 'tenancy-849201',
    invoiceNumber: 'INV-2026-08-0012',
    billingPeriodStart: '2026-08-01',
    billingPeriodEnd: '2026-08-31',
    dueDate: '2026-09-05',
    subtotalAmount: 13240,
    totalServiceCredits: 0,
    finalPayableAmount: 13240,
    paidAmount: 13240,
    status: 'PAID',
    paymentReference: 'pay_UPI_9182374981',
    paidAt: '2026-09-03T11:42:00Z',
    items: [
      {
        id: 'item-aug-1',
        category: 'BASE_RENT',
        description: 'Monthly Base Rent (Room 204 - Bed B)',
        quantity: 1,
        unitPrice: 12500,
        totalAmount: 12500,
      },
      {
        id: 'item-aug-2',
        category: 'ELECTRICITY_METERED',
        description: 'Electricity Sub-Meter (49 kWh units @ ₹10.00/unit)',
        quantity: 49,
        unitPrice: 10,
        totalAmount: 490,
      },
      {
        id: 'item-aug-3',
        category: 'WATER_CHARGES',
        description: 'Water & Maintenance Charges',
        quantity: 1,
        unitPrice: 250,
        totalAmount: 250,
      },
    ],
  },
];

export const mockComplaints: Complaint[] = [
  {
    id: 'tkt-00392',
    ticketNumber: 'TKT-2026-00392',
    tenancyId: 'tenancy-849201',
    propertyId: 'prop-hsr-01',
    propertyName: 'Stayra Prime — HSR Sector 4',
    roomNumber: '204',
    residentName: 'Rohan Verma',
    category: 'WIFI',
    severity: 'HIGH',
    status: 'RESOLVED',
    title: 'Floor 2 WiFi mesh node offline / high packet loss',
    description: 'The router node on 2nd floor corridor stopped blinking blue and has solid red light. Speeds dropped to 0.4 Mbps and video calls disconnecting.',
    createdAt: '2026-09-11T09:30:00Z',
    slaTargetTime: '2026-09-12T09:30:00Z', // 24h SLA
    actualResolvedAt: '2026-09-12T13:45:00Z', // Breached by 4h 15m!
    isSlaBreached: true,
    compensationCredit: 100,
    compensationStatus: 'APPLIED_TO_BILL',
    assignedStaff: {
      name: 'Manoj Kumar',
      role: 'IT & Network Engineer',
      phone: '+91 98450 11223',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80',
    },
    resolutionNotes: 'Replaced faulty PoE injector on the 2nd floor Cisco AP and tested bandwidth speed at 240 Mbps downlink.',
    resolutionPhotoUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80',
    photoAttachments: [
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80',
    ],
    feedback: {
      speedRating: 4,
      staffRating: 5,
      isFullyResolved: true,
      reviewText: 'Took longer than SLA due to replacement part, but ₹100 rent credit was automatically credited to my bill without any argument! Excellent transparency.',
    },
  },
  {
    id: 'tkt-00418',
    ticketNumber: 'TKT-2026-00418',
    tenancyId: 'tenancy-849201',
    propertyId: 'prop-hsr-01',
    propertyName: 'Stayra Prime — HSR Sector 4',
    roomNumber: '204',
    residentName: 'Rohan Verma',
    category: 'ELECTRICITY',
    severity: 'CRITICAL',
    status: 'ASSIGNED',
    title: 'Bathroom water heater MCB tripped and switch spark',
    description: 'Turned on the geyser this morning and the MCB switch tripped with a mild spark sound. Power cuts off when switched back on.',
    createdAt: '2026-09-13T23:45:00Z',
    slaTargetTime: '2026-09-14T03:45:00Z', // 4h critical SLA
    isSlaBreached: false,
    assignedStaff: {
      name: 'Ramesh Sharma',
      role: 'Certified Electrician',
      phone: '+91 98451 99887',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80',
    },
    photoAttachments: [],
  },
];

export const mockWeeklyFoodMenu: FoodMenuDay[] = [
  {
    day: 'Monday',
    breakfast: { item: 'Mysore Masala Dosa, Coconut Chutney, Sambar & Filter Coffee', isVeg: true, time: '7:30 - 9:30 AM' },
    lunch: { item: 'Paneer Butter Masala, Dal Makhani, Fresh Phulkas, Steamed Rice, Curd', isVeg: true, time: '12:30 - 2:30 PM' },
    snacks: { item: 'Onion Pakoda & Masala Chai', isVeg: true, time: '5:00 - 6:30 PM' },
    dinner: { item: 'Aloo Gobi Adraki, Mixed Veg Kadai, Rotis, Jeera Rice, Gulab Jamun', isVeg: true, time: '8:00 - 10:00 PM' },
  },
  {
    day: 'Tuesday',
    breakfast: { item: 'Fluffy Idlis & Medu Vada with Podi & Sambar', isVeg: true, time: '7:30 - 9:30 AM' },
    lunch: { item: 'Chole Bhature / Phulkas, Pulao, Boondi Raita', isVeg: true, time: '12:30 - 2:30 PM' },
    snacks: { item: 'Veg Cutlet & Green Chutney, Ginger Tea', isVeg: true, time: '5:00 - 6:30 PM' },
    dinner: { item: 'Egg Curry / Paneer Bhurji, Dal Tadka, Rotis, Steamed Rice', isVeg: false, time: '8:00 - 10:00 PM' },
  },
  {
    day: 'Wednesday',
    breakfast: { item: 'Poha with Roasted Peanuts & Sev, Boiled Eggs / Sprouts', isVeg: false, time: '7:30 - 9:30 AM' },
    lunch: { item: 'Rajma Masala, Punjabi Kadhi Pakora, Basmati Rice, Rotis', isVeg: true, time: '12:30 - 2:30 PM' },
    snacks: { item: 'Samosa with Sweet Tamarind Dip, Chai', isVeg: true, time: '5:00 - 6:30 PM' },
    dinner: { item: 'Hyderabadi Chicken Biryani / Soya Chaap Biryani, Mirchi Ka Salan, Raita', isVeg: false, time: '8:00 - 10:00 PM' },
  },
];

export const mockOwnerStats = {
  occupancyRate: 91.7, // %
  totalBeds: 96,
  occupiedBeds: 88,
  vacantBeds: 8,
  monthlyRevenue: '₹11.2L',
  revenueGrowth: '+6.8% vs last mo',
  pendingRentAmount: '₹42,000',
  pendingTenantsCount: 3,
  slaComplianceRate: 94.8, // %
  avgResolutionTime: '8.5 hrs',
  activeBranches: [
    { id: 'prop-hsr-01', name: 'Stayra Prime (HSR)', beds: '28/32', occupancy: 87.5, revenue: '₹3.9L' },
    { id: 'prop-krm-02', name: 'Stayra Sanctuary (Koramangala)', beds: '22/24', occupancy: 91.6, revenue: '₹3.4L' },
    { id: 'prop-ggn-03', name: 'Stayra Tech Hub (Gurugram)', beds: '38/40', occupancy: 95.0, revenue: '₹3.9L' },
  ],
  urgentAlerts: [
    {
      id: 'alert-1',
      title: 'SLA Breach Warning',
      message: 'TKT-00418 (Geyser MCB trip) has 1h 45m remaining before SLA penalty.',
      severity: 'HIGH',
    },
    {
      id: 'alert-2',
      title: 'AI Anomaly Detected',
      message: 'Room 102 electricity reading jumped 320% compared to 3-mo average. Verify meter photo.',
      severity: 'WARNING',
    },
    {
      id: 'alert-3',
      title: 'Tenancy Request Pending',
      message: 'Kunal Singhal applied for Bed 102-B at Stayra Prime. KYC verified.',
      severity: 'INFO',
    },
  ],
};
