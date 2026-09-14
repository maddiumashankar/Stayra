import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '../../../src/theme/tokens';
import { HeaderBar, Icon, Badge, Button, Input } from '../../../src/components/common';

export default function BookingFlowScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const roomNum = (params.roomNum as string) || '204';
  const bedName = (params.bedName as string) || 'Bed-B (Balcony View)';
  const rent = Number(params.rent) || 12500;
  const deposit = Number(params.deposit) || 20000;
  const totalPayable = rent + deposit;

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [moveInDate, setMoveInDate] = useState('1st of Next Month');
  const [kycDocType, setKycDocType] = useState('Aadhaar Card');
  const [emergencyName, setEmergencyName] = useState('Rajesh Verma (Father)');
  const [emergencyPhone, setEmergencyPhone] = useState('+91 94480 12345');
  const [agreementAgreed, setAgreementAgreed] = useState(true);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const handlePay = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setStep(5); // Success confirmation
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBar
        title={`Book Room ${roomNum}`}
        subtitle={`Step ${step} of 4: ${
          step === 1
            ? 'Tenancy Terms'
            : step === 2
            ? 'Digital KYC'
            : step === 3
            ? 'Tenancy Contract'
            : step === 4
            ? 'Initial Payment'
            : 'Pass Confirmed'
        }`}
        showBack
        onPressBack={() => {
          if (step > 1 && step < 5) {
            setStep((step - 1) as any);
          } else {
            router.back();
          }
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Progress Stepper Bar */}
        {step < 5 && (
          <View style={styles.stepperContainer}>
            {[1, 2, 3, 4].map((s) => (
              <View key={s} style={styles.stepItem}>
                <View
                  style={[
                    styles.stepCircle,
                    step === s && styles.stepCircleActive,
                    step > s && styles.stepCircleDone,
                  ]}
                >
                  {step > s ? (
                    <Icon name="Check" size={12} color="#FFFFFF" />
                  ) : (
                    <Text
                      style={[
                        styles.stepNumber,
                        step === s && styles.stepNumberActive,
                      ]}
                    >
                      {s}
                    </Text>
                  )}
                </View>
                <Text style={styles.stepLabel}>
                  {s === 1 ? 'Room' : s === 2 ? 'KYC' : s === 3 ? 'Contract' : 'Payment'}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* STEP 1: ROOM & BED SELECTION */}
        {step === 1 && (
          <View style={styles.stepCard}>
            <Text style={styles.stepTitle}>Allocated Accommodation</Text>
            <View style={styles.summaryBox}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Room Number</Text>
                <Text style={styles.summaryVal}>Room {roomNum}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Selected Bed</Text>
                <Text style={styles.summaryVal}>{bedName}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Monthly Base Rent</Text>
                <Text style={styles.summaryValHighlight}>₹{rent.toLocaleString('en-IN')}/mo</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Refundable Security Deposit</Text>
                <Text style={styles.summaryVal}>₹{deposit.toLocaleString('en-IN')}</Text>
              </View>
            </View>

            <Text style={styles.inputSectionTitle}>Target Move-In Date</Text>
            <View style={styles.dateSelectorRow}>
              {['Immediate (Today)', '1st of Next Month', '15th of Next Month'].map((d) => (
                <TouchableOpacity
                  key={d}
                  onPress={() => setMoveInDate(d)}
                  style={[styles.datePill, moveInDate === d && styles.datePillActive]}
                >
                  <Text style={[styles.dateText, moveInDate === d && styles.dateTextActive]}>
                    {d}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.slaNoticeCard}>
              <Icon name="ShieldCheck" size={16} color={colors.shieldEmerald} style={{ marginRight: 6 }} />
              <Text style={styles.slaNoticeText}>
                Your tenancy is protected by Stayra Fair Living SLAs. Any breach automatically reduces your rent.
              </Text>
            </View>

            <Button
              title="Continue to Digital KYC"
              onPress={() => setStep(2)}
              iconRight="ChevronRight"
              size="lg"
            />
          </View>
        )}

        {/* STEP 2: DIGITAL KYC VERIFICATION */}
        {step === 2 && (
          <View style={styles.stepCard}>
            <Text style={styles.stepTitle}>Digital Identity &amp; Tenancy KYC</Text>
            <Text style={styles.stepSub}>
              Complying with local tenancy registration laws. Your documents are encrypted and never shared publicly.
            </Text>

            <View style={styles.kycDocSelector}>
              {['Aadhaar Card', 'Passport', 'Driving License'].map((doc) => (
                <TouchableOpacity
                  key={doc}
                  onPress={() => setKycDocType(doc)}
                  style={[styles.docPill, kycDocType === doc && styles.docPillActive]}
                >
                  <Text style={[styles.docText, kycDocType === doc && styles.docTextActive]}>
                    {doc}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Document Upload Simulation */}
            <View style={styles.uploadBox}>
              <Icon name="CheckCircle2" size={28} color={colors.success} style={{ marginBottom: 4 }} />
              <Text style={styles.uploadTitle}>{kycDocType} Verified</Text>
              <Text style={styles.uploadSub}>
                Encrypted hash: 8f92a10b9821c9... (Stayra Resident Profile ID)
              </Text>
              <Badge label="INSTANT AI VERIFIED" variant="success" size="sm" style={{ marginTop: 6 }} />
            </View>

            <Input
              label="Emergency Contact Name"
              value={emergencyName}
              onChangeText={setEmergencyName}
              iconLeft="User"
            />

            <Input
              label="Emergency Contact Phone"
              value={emergencyPhone}
              onChangeText={setEmergencyPhone}
              iconLeft="Phone"
              keyboardType="phone-pad"
            />

            <Button
              title="Review Tenancy Agreement"
              onPress={() => setStep(3)}
              iconRight="ChevronRight"
              size="lg"
            />
          </View>
        )}

        {/* STEP 3: DIGITAL TENANCY CONTRACT */}
        {step === 3 && (
          <View style={styles.stepCard}>
            <Text style={styles.stepTitle}>Digital Tenancy Agreement</Text>
            <Text style={styles.stepSub}>
              Legally binding tenancy contract generated under the Model Tenancy Act.
            </Text>

            <View style={styles.contractPreviewBox}>
              <Text style={styles.contractHeader}>STAYRA RESIDENTIAL TENANCY AGREEMENT</Text>
              <Text style={styles.contractClause}>
                <Text style={styles.clauseBold}>1. Premises &amp; Bed:</Text> The Owner leases to the Resident Bed {bedName} in Room {roomNum} at Stayra Prime, Bengaluru.
              </Text>
              <Text style={styles.contractClause}>
                <Text style={styles.clauseBold}>2. Monthly Rent &amp; Billing Cycle:</Text> Monthly base rent of ₹{rent.toLocaleString('en-IN')} due on the 5th of each calendar month. Metered electricity charges calculated accurately via sub-meter readings.
              </Text>
              <Text style={styles.contractClause}>
                <Text style={styles.clauseBold}>3. SLA-Backed Rent Compensation:</Text> Outages exceeding property SLA matrix will result in deterministic daily rent credits deducted automatically from subsequent invoices.
              </Text>
              <Text style={styles.contractClause}>
                <Text style={styles.clauseBold}>4. Notice Period &amp; Move-Out:</Text> Either party may initiate departure with a standard 30-day digital notice period within the Stayra App. Security deposit will be refunded within 7 days of inspection.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setAgreementAgreed(!agreementAgreed)}
              activeOpacity={0.8}
            >
              <View style={[styles.checkbox, agreementAgreed && styles.checkboxActive]}>
                {agreementAgreed && <Icon name="Check" size={13} color="#FFFFFF" />}
              </View>
              <Text style={styles.checkboxLabel}>
                I digitally sign and agree to the Tenancy Agreement terms.
              </Text>
            </TouchableOpacity>

            <Button
              title="Proceed to Move-In Payment"
              onPress={() => setStep(4)}
              disabled={!agreementAgreed}
              iconRight="ChevronRight"
              size="lg"
            />
          </View>
        )}

        {/* STEP 4: INITIAL PAYMENT BREAKDOWN */}
        {step === 4 && (
          <View style={styles.stepCard}>
            <Text style={styles.stepTitle}>Initial Move-In Settlement</Text>
            <Text style={styles.stepSub}>
              Pay refundable security deposit and 1st month rent to activate your digital key.
            </Text>

            <View style={styles.breakdownCard}>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>First Month Rent (Advance)</Text>
                <Text style={styles.breakdownVal}>₹{rent.toLocaleString('en-IN')}</Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>Refundable Security Deposit</Text>
                <Text style={styles.breakdownVal}>₹{deposit.toLocaleString('en-IN')}</Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>Digital Stamp &amp; Onboarding Fee</Text>
                <Text style={[styles.breakdownVal, { color: colors.success }]}>WAIVED (₹0)</Text>
              </View>
              <View style={styles.breakdownDivider} />
              <View style={styles.breakdownRowTotal}>
                <Text style={styles.totalLabel}>Total Payable Now</Text>
                <Text style={styles.totalVal}>₹{totalPayable.toLocaleString('en-IN')}</Text>
              </View>
            </View>

            {/* Payment Method Selector */}
            <Text style={styles.paymentSectionTitle}>Payment Method (Razorpay Escrow)</Text>
            <View style={styles.paymentOptionActive}>
              <Icon name="CreditCard" size={20} color={colors.primary} style={{ marginRight: spacing.sm }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.payOptionTitle}>Instant UPI / Net Banking</Text>
                <Text style={styles.payOptionSub}>Google Pay, PhonePe, Paytm, BHIM</Text>
              </View>
              <Icon name="CheckCircle2" size={18} color={colors.success} />
            </View>

            <Button
              title={`Pay ₹${totalPayable.toLocaleString('en-IN')} & Move In`}
              onPress={handlePay}
              loading={paymentProcessing}
              size="lg"
              iconRight="ShieldCheck"
            />
          </View>
        )}

        {/* STEP 5: BOOKING SUCCESS & DIGITAL PASS */}
        {step === 5 && (
          <View style={styles.successCard}>
            <View style={styles.successIconCircle}>
              <Icon name="CheckCircle2" size={42} color="#FFFFFF" />
            </View>

            <Text style={styles.successTitle}>Tenancy Confirmed!</Text>
            <Text style={styles.successSub}>
              Welcome to Stayra Prime. Your room has been allocated and your digital key is activated.
            </Text>

            {/* Digital Pass Card */}
            <View style={styles.passCard}>
              <View style={styles.passHeader}>
                <Text style={styles.passStayra}>STAYRA LIVING PASS</Text>
                <Badge label="ACTIVE RESIDENT" variant="success" size="sm" />
              </View>

              <View style={styles.passBody}>
                <Text style={styles.passTenantName}>Rohan Verma</Text>
                <Text style={styles.passId}>Resident ID: STR-RES-202609-0842</Text>

                <View style={styles.passGrid}>
                  <View style={styles.passGridItem}>
                    <Text style={styles.gridLabel}>PROPERTY</Text>
                    <Text style={styles.gridVal}>Stayra Prime</Text>
                  </View>
                  <View style={styles.passGridItem}>
                    <Text style={styles.gridLabel}>ROOM / BED</Text>
                    <Text style={styles.gridVal}>
                      Room {roomNum} • {bedName.split(' ')[0]}
                    </Text>
                  </View>
                  <View style={styles.passGridItem}>
                    <Text style={styles.gridLabel}>WIFI PASSWORD</Text>
                    <Text style={styles.gridVal}>StayraSecure99#</Text>
                  </View>
                  <View style={styles.passGridItem}>
                    <Text style={styles.gridLabel}>MOVE-IN DATE</Text>
                    <Text style={styles.gridVal}>1st Oct 2026</Text>
                  </View>
                </View>
              </View>
            </View>

            <Button
              title="Go to My Stay Dashboard"
              onPress={() => router.replace('/(resident)/my-stay' as any)}
              size="lg"
              iconRight="ChevronRight"
              style={{ width: '100%', marginTop: spacing.lg }}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
  },
  stepperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  stepItem: {
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.surfaceTertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepCircleActive: {
    backgroundColor: colors.primary,
  },
  stepCircleDone: {
    backgroundColor: colors.success,
  },
  stepNumber: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  stepNumberActive: {
    color: '#FFFFFF',
  },
  stepLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  stepCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  stepTitle: {
    ...typography.heading2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  stepSub: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: 19,
  },
  summaryBox: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  summaryLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  summaryVal: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.text,
  },
  summaryValHighlight: {
    ...typography.caption,
    fontWeight: '800',
    color: colors.primary,
  },
  inputSectionTitle: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  dateSelectorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  datePill: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  datePillActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  dateText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  dateTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  slaNoticeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successLight,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
  },
  slaNoticeText: {
    ...typography.caption,
    color: colors.successDark,
    flex: 1,
    lineHeight: 16,
  },
  kycDocSelector: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  docPill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  docPillActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  docText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  docTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  uploadBox: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.borderStrong,
    marginBottom: spacing.lg,
  },
  uploadTitle: {
    ...typography.heading3,
    color: colors.text,
  },
  uploadSub: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  contractPreviewBox: {
    backgroundColor: '#0F172A',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  contractHeader: {
    color: '#93C5FD',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  contractClause: {
    color: '#CBD5E1',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: spacing.xs,
  },
  clauseBold: {
    fontWeight: '700',
    color: '#FFFFFF',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.borderStrong,
    marginRight: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxLabel: {
    ...typography.bodySmall,
    color: colors.text,
    flex: 1,
  },
  breakdownCard: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  breakdownLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  breakdownVal: {
    ...typography.bodySmall,
    fontWeight: '700',
    color: colors.text,
  },
  breakdownDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  breakdownRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    ...typography.heading3,
    color: colors.text,
  },
  totalVal: {
    ...typography.heading2,
    color: colors.primary,
  },
  paymentSectionTitle: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  paymentOptionActive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  payOptionTitle: {
    ...typography.bodyBold,
    color: colors.text,
  },
  payOptionSub: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  successCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    ...shadows.lg,
  },
  successIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  successTitle: {
    ...typography.heading1,
    color: colors.text,
    marginBottom: 4,
  },
  successSub: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  passCard: {
    width: '100%',
    backgroundColor: '#0F172A',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.md,
  },
  passHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    paddingBottom: spacing.sm,
    marginBottom: spacing.sm,
  },
  passStayra: {
    color: '#93C5FD',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  passBody: {},
  passTenantName: {
    ...typography.heading2,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  passId: {
    fontSize: 11,
    color: '#94A3B8',
    marginBottom: spacing.md,
  },
  passGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  passGridItem: {
    width: '47%',
  },
  gridLabel: {
    fontSize: 9,
    color: '#64748B',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  gridVal: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 1,
  },
});
