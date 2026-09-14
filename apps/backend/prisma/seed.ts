import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Stayra database with high-fidelity MVP records...');

  // Clean existing records in reverse dependency order
  await prisma.ledgerEntry.deleteMany();
  await prisma.ledgerAccount.deleteMany();
  await prisma.feedbackReview.deleteMany();
  await prisma.serviceCompensationCredit.deleteMany();
  await prisma.complaint.deleteMany();
  await prisma.slaPolicy.deleteMany();
  await prisma.billItem.deleteMany();
  await prisma.bill.deleteMany();
  await prisma.tenancy.deleteMany();
  await prisma.bed.deleteMany();
  await prisma.room.deleteMany();
  await prisma.propertyAmenity.deleteMany();
  await prisma.staffProfile.deleteMany();
  await prisma.property.deleteMany();
  await prisma.ownerProfile.deleteMany();
  await prisma.residentProfile.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Existing data wiped cleanly.');

  // 1. Create Core Users
  const adminUser = await prisma.user.create({
    data: {
      fullName: 'Stayra Platform Admin',
      phoneNumber: '+919876543210',
      email: 'admin@stayra.com',
      role: 'ADMIN',
      isActive: true,
    },
  });

  const sureshUser = await prisma.user.create({
    data: {
      fullName: 'Suresh Reddy',
      phoneNumber: '+919876543211',
      email: 'suresh.reddy@stayra.com',
      role: 'OWNER',
      isActive: true,
      ownerProfile: {
        create: {
          businessName: 'Reddy Estates & Co-Living',
          gstin: '29ABCDE1234F1Z5',
          bankAccountNumber: '987654321001',
          bankIfscCode: 'HDFC0001234',
          bankBeneficiaryName: 'Reddy Estates LLC',
          payoutAccountVerified: true,
        },
      },
    },
    include: { ownerProfile: true },
  });

  const vikramUser = await prisma.user.create({
    data: {
      fullName: 'Vikram Malhotra',
      phoneNumber: '+919876543212',
      email: 'vikram.malhotra@stayra.com',
      role: 'OWNER',
      isActive: true,
      ownerProfile: {
        create: {
          businessName: 'Malhotra Hospitality Ventures',
          gstin: '29FGHIJ5678K1Z2',
          bankAccountNumber: '123456789099',
          bankIfscCode: 'ICIC0000987',
          bankBeneficiaryName: 'Malhotra Ventures',
          payoutAccountVerified: true,
        },
      },
    },
    include: { ownerProfile: true },
  });

  const rohanUser = await prisma.user.create({
    data: {
      fullName: 'Rohan Verma',
      phoneNumber: '+919876543220',
      email: 'rohan.verma@example.com',
      role: 'RESIDENT',
      isActive: true,
      residentProfile: {
        create: {
          stayraResidentId: 'STR-RES-202609-0842',
          emergencyContactName: 'Kavita Verma',
          emergencyContactPhone: '+919876543299',
          kycStatus: 'VERIFIED',
          kycDocumentType: 'AADHAAR',
          lifetimeReputationScore: 4.95,
        },
      },
    },
    include: { residentProfile: true },
  });

  const ananyaUser = await prisma.user.create({
    data: {
      fullName: 'Ananya Iyer',
      phoneNumber: '+919876543221',
      email: 'ananya.iyer@example.com',
      role: 'RESIDENT',
      isActive: true,
      residentProfile: {
        create: {
          stayraResidentId: 'STR-RES-202609-0843',
          emergencyContactName: 'R. Iyer',
          emergencyContactPhone: '+919876543298',
          kycStatus: 'VERIFIED',
          kycDocumentType: 'PASSPORT',
          lifetimeReputationScore: 5.0,
        },
      },
    },
    include: { residentProfile: true },
  });

  console.log(`✅ Core users created: Platform Admin (${adminUser.email}), Owners, Residents.`);

  // 2. Properties
  const hsrProperty = await prisma.property.create({
    data: {
      ownerId: sureshUser.ownerProfile!.id,
      name: 'Stayra Living HSR',
      tagline: 'Modern luxury co-living with 100% SLA guarantees',
      description: 'Premium co-living facility located in Sector 2, HSR Layout. Walking distance from major tech hubs.',
      addressLine1: 'Building 42, 14th Main Road',
      addressLine2: 'Sector 2, HSR Layout',
      neighborhood: 'HSR Layout, Sector 2',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560102',
      latitude: 12.9116,
      longitude: 77.6389,
      genderCategory: 'UNISEX',
      noticePeriodDays: 30,
      curfewTime: '11:00 PM',
      isVerified: true,
      rating: 4.9,
      reviewCount: 128,
      slaAdherenceRate: 97.5,
      photos: JSON.stringify([
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
      ]),
      rules: JSON.stringify([
        'No smoking inside rooms or corridors',
        'Quiet hours between 11:00 PM and 6:00 AM',
        'Visitors allowed in lounge areas until 9:00 PM',
      ]),
      amenities: {
        create: [
          { amenityCode: 'WIFI', label: 'High-Speed Optical WiFi (300 Mbps)', isFree: true },
          { amenityCode: 'POWER_BACKUP', label: '100% Full Generator Power Backup', isFree: true },
          { amenityCode: 'WASHING_MACHINE', label: 'Automated Laundry & Dryers', isFree: true },
          { amenityCode: 'RO_WATER', label: 'Multi-stage RO Drinking Water', isFree: true },
          { amenityCode: 'CCTV', label: '24x7 App-Monitored CCTV Security', isFree: true },
          { amenityCode: 'HOUSEKEEPING', label: 'Daily Room & Linen Cleaning', isFree: true },
          { amenityCode: 'GYM', label: 'In-house Fitness Studio', isFree: true },
        ],
      },
      slaPolicies: {
        create: [
          { category: 'WATER', severity: 'HIGH', resolutionSlaHours: 4, compensationRatePerDay: 500, maxCompensationCap: 2000 },
          { category: 'ELECTRICITY', severity: 'HIGH', resolutionSlaHours: 4, compensationRatePerDay: 500, maxCompensationCap: 2000 },
          { category: 'WIFI', severity: 'MEDIUM', resolutionSlaHours: 6, compensationRatePerDay: 300, maxCompensationCap: 1500 },
          { category: 'AC', severity: 'MEDIUM', resolutionSlaHours: 12, compensationRatePerDay: 400, maxCompensationCap: 2000 },
          { category: 'HOUSEKEEPING', severity: 'LOW', resolutionSlaHours: 24, compensationRatePerDay: 150, maxCompensationCap: 1000 },
        ],
      },
    },
  });

  const koramangalaProperty = await prisma.property.create({
    data: {
      ownerId: vikramUser.ownerProfile!.id,
      name: 'Stayra Prime Koramangala',
      tagline: 'Vibrant boutique living in the culinary heart of Bangalore',
      description: 'Exclusive executive living with private balconies, rooftop lounge, and dedicated work pods.',
      addressLine1: 'Plot 108, 80 Feet Road',
      addressLine2: '4th Block, Koramangala',
      neighborhood: 'Koramangala 4th Block',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560034',
      latitude: 12.9352,
      longitude: 77.6245,
      genderCategory: 'UNISEX',
      noticePeriodDays: 30,
      curfewTime: 'None',
      isVerified: true,
      rating: 4.8,
      reviewCount: 94,
      slaAdherenceRate: 95.0,
      photos: JSON.stringify([
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
      ]),
      rules: JSON.stringify(['Pet friendly with prior notice', 'No loud music past 11:00 PM']),
      amenities: {
        create: [
          { amenityCode: 'WIFI', label: 'Gigabit Fiber WiFi', isFree: true },
          { amenityCode: 'POWER_BACKUP', label: '24x7 Power Backup', isFree: true },
          { amenityCode: 'ROOF_LOUNGE', label: 'Rooftop Cafe & Co-working', isFree: true },
        ],
      },
      slaPolicies: {
        create: [
          { category: 'WIFI', severity: 'HIGH', resolutionSlaHours: 4, compensationRatePerDay: 400, maxCompensationCap: 2000 },
          { category: 'WATER', severity: 'HIGH', resolutionSlaHours: 4, compensationRatePerDay: 500, maxCompensationCap: 2000 },
        ],
      },
    },
  });

  console.log(`✅ Properties and SLA policies created (HSR & Koramangala: ${koramangalaProperty.name}).`);

  // 3. Staff Profiles
  const rameshStaffUser = await prisma.user.create({
    data: {
      fullName: 'Ramesh Kumar',
      phoneNumber: '+919876543213',
      email: 'ramesh.kumar@stayra.com',
      role: 'STAFF',
      isActive: true,
      staffProfile: {
        create: {
          assignedPropertyId: hsrProperty.id,
          jobTitle: 'Senior Electrician & Facility Technician',
          canResolveTickets: true,
        },
      },
    },
    include: { staffProfile: true },
  });

  const deepakStaffUser = await prisma.user.create({
    data: {
      fullName: 'Deepak Sharma',
      phoneNumber: '+919876543214',
      email: 'deepak.sharma@stayra.com',
      role: 'STAFF',
      isActive: true,
      staffProfile: {
        create: {
          assignedPropertyId: koramangalaProperty.id,
          jobTitle: 'Property Operations Manager',
          canResolveTickets: true,
        },
      },
    },
    include: { staffProfile: true },
  });

  console.log(`✅ Staff members assigned: ${rameshStaffUser.fullName} to HSR, ${deepakStaffUser.fullName} to Koramangala.`);

  // 4. Rooms and Beds for Stayra Living HSR
  const room204 = await prisma.room.create({
    data: {
      propertyId: hsrProperty.id,
      roomNumber: 'Room 204',
      floorNumber: 2,
      sharingType: 'DOUBLE',
      hasAttachedBathroom: true,
      hasAc: true,
      hasBalcony: true,
      baseRentPerBed: 14500,
      securityDeposit: 29000,
      beds: {
        create: [
          { bedIdentifier: 'Bed-A', status: 'VACANT' },
          { bedIdentifier: 'Bed-B', status: 'OCCUPIED' },
        ],
      },
    },
    include: { beds: true },
  });

  const room205 = await prisma.room.create({
    data: {
      propertyId: hsrProperty.id,
      roomNumber: 'Room 205',
      floorNumber: 2,
      sharingType: 'SINGLE',
      hasAttachedBathroom: true,
      hasAc: true,
      hasBalcony: false,
      baseRentPerBed: 19500,
      securityDeposit: 39000,
      beds: {
        create: [{ bedIdentifier: 'Bed-A', status: 'OCCUPIED' }],
      },
    },
    include: { beds: true },
  });

  const bedRohan = room204.beds.find((b) => b.bedIdentifier === 'Bed-B')!;
  const bedAnanya = room205.beds.find((b) => b.bedIdentifier === 'Bed-A')!;

  console.log('✅ Rooms and beds created.');

  // 5. Active Tenancies
  const rohanTenancy = await prisma.tenancy.create({
    data: {
      residentId: rohanUser.residentProfile!.id,
      propertyId: hsrProperty.id,
      bedId: bedRohan.id,
      status: 'ACTIVE',
      startDate: new Date('2026-06-01T00:00:00.000Z'),
      agreedRent: 14500,
      agreedDeposit: 29000,
      billingDayOfMonth: 1,
      digitalAgreementS3Key: 'agreements/STR-RES-202609-0842-signed.pdf',
      agreementSignedAt: new Date('2026-05-28T14:30:00.000Z'),
    },
  });

  await prisma.tenancy.create({
    data: {
      residentId: ananyaUser.residentProfile!.id,
      propertyId: hsrProperty.id,
      bedId: bedAnanya.id,
      status: 'ACTIVE',
      startDate: new Date('2026-07-01T00:00:00.000Z'),
      agreedRent: 19500,
      agreedDeposit: 39000,
      billingDayOfMonth: 1,
      digitalAgreementS3Key: 'agreements/STR-RES-202609-0843-signed.pdf',
      agreementSignedAt: new Date('2026-06-25T11:15:00.000Z'),
    },
  });

  console.log('✅ Tenancies established.');

  // 6. Complaint with SLA Breach & Auto-Compensation
  const wifiComplaint = await prisma.complaint.create({
    data: {
      ticketNumber: 'TKT-00392',
      tenancyId: rohanTenancy.id,
      propertyId: hsrProperty.id,
      assignedStaffId: rameshStaffUser.staffProfile!.id,
      category: 'WIFI',
      severity: 'MEDIUM',
      status: 'RESOLVED',
      title: 'Frequent WiFi disconnection in Room 204',
      description: 'WiFi router on 2nd floor drops signal every 15 minutes during peak office hours.',
      slaTargetTime: new Date('2026-09-02T16:00:00.000Z'),
      actualResolvedAt: new Date('2026-09-03T06:30:00.000Z'),
      isSlaBreached: true,
      resolutionNotes: 'Replaced corridor dual-band repeater and updated channel frequency.',
      photos: JSON.stringify(['https://images.unsplash.com/photo-1544197150-b99a580bb7a8']),
      compensationCredit: {
        create: {
          residentId: rohanUser.residentProfile!.id,
          creditAmount: 400.0,
          breachDurationHours: 14.5,
        },
      },
    },
    include: { compensationCredit: true },
  });

  console.log('✅ Complaint TKT-00392 with SLA compensation credit logged.');

  // 7. Rohan September 2026 Bill with Applied SLA Credit
  const rohanBill = await prisma.bill.create({
    data: {
      tenancyId: rohanTenancy.id,
      invoiceNumber: 'INV-202609-0192',
      billingPeriodStart: new Date('2026-09-01T00:00:00.000Z'),
      billingPeriodEnd: new Date('2026-09-30T23:59:59.000Z'),
      dueDate: new Date('2026-09-05T23:59:59.000Z'),
      subtotalAmount: 15300.0,
      totalServiceCredits: 400.0,
      finalPayableAmount: 14900.0,
      paidAmount: 0.0,
      status: 'ISSUED',
      items: {
        create: [
          {
            category: 'BASE_RENT',
            description: 'Room 204 (Bed-B) Base Monthly Rent - Sept 2026',
            quantity: 1,
            unitPrice: 14500,
            totalAmount: 14500,
          },
          {
            category: 'ELECTRICITY_METERED',
            description: 'Sub-metered Room Electricity (80 units @ ₹10/unit)',
            quantity: 80,
            unitPrice: 10,
            totalAmount: 800,
            metadata: JSON.stringify({ meterId: 'MTR-204-SEP', unitsConsumed: 80, ratePerUnit: 10 }),
          },
          {
            category: 'SERVICE_COMPENSATION_CREDIT',
            description: 'SLA Compensation Credit: Ticket TKT-00392 (WiFi Delay)',
            quantity: 1,
            unitPrice: -400,
            totalAmount: -400,
          },
        ],
      },
    },
  });

  // Link credit to the bill
  if (wifiComplaint.compensationCredit) {
    await prisma.serviceCompensationCredit.update({
      where: { id: wifiComplaint.compensationCredit.id },
      data: { appliedToBillId: rohanBill.id },
    });
  }

  console.log('✅ September 2026 invoice with itemized breakdown and SLA deduction generated.');

  // 8. Resident Review
  await prisma.feedbackReview.create({
    data: {
      tenancyId: rohanTenancy.id,
      propertyId: hsrProperty.id,
      residentId: rohanUser.residentProfile!.id,
      cleanlinessRating: 5.0,
      foodRating: 4.8,
      wifiRating: 4.2,
      staffRating: 5.0,
      overallRating: 4.85,
      reviewText: 'Outstanding property management. When WiFi dropped, the ₹400 compensation was automatically applied to my rent invoice without even asking!',
    },
  });

  console.log('✅ Verified resident review added.');

  // 9. Double-Entry Ledger Accounts
  const escrowAccount = await prisma.ledgerAccount.create({
    data: {
      accountType: 'ASSET_ESCROW',
      propertyId: hsrProperty.id,
      name: 'Stayra Escrow Reserve - HSR',
      currency: 'INR',
    },
  });

  const depositLiability = await prisma.ledgerAccount.create({
    data: {
      accountType: 'LIABILITY_DEPOSIT',
      propertyId: hsrProperty.id,
      residentId: rohanUser.residentProfile!.id,
      name: 'Security Deposit Liability - Rohan Verma',
      currency: 'INR',
    },
  });

  // Post deposit transfer ledger entry
  await prisma.ledgerEntry.create({
    data: {
      transactionGroupId: 'TXG-DEP-20260528-001',
      debitAccountId: escrowAccount.id,
      creditAccountId: depositLiability.id,
      amount: 29000.0,
      description: 'Security Deposit Received for Tenancy Room 204 Bed-B',
      idempotencyKey: 'IDEMP-DEP-ROHAN-29000',
      referenceEntityType: 'PAYMENT',
      referenceEntityId: rohanTenancy.id,
    },
  });

  console.log('✅ Double-entry ledger accounts and initial deposit journal posted.');
  console.log('🎉 Stayra database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
