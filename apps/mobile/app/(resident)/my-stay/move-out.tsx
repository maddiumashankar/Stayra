import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '../../../src/theme/tokens';
import { HeaderBar, Icon, Button, Input } from '../../../src/components/common';
import { useStayraStore } from '../../../src/stores/useStayraStore';

export default function MoveOutScreen() {
  const router = useRouter();
  const { activeTenancy } = useStayraStore();

  const [reason, setReason] = useState('Relocation / Job Switch');
  const [upiId, setUpiId] = useState('rohan.verma@okhdfcbank');
  const [submitted, setSubmitted] = useState(false);

  const deposit = activeTenancy.agreedDeposit;
  const estimatedUtilities = 350;
  const unappliedCredits = 100;
  const netRefund = deposit - estimatedUtilities + unappliedCredits;

  const handleSubmitNotice = () => {
    setSubmitted(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBar title="Serve Move-Out Notice" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {submitted ? (
          <View style={styles.successCard}>
            <View style={styles.successCircle}>
              <Icon name="CheckCircle2" size={38} color="#FFFFFF" />
            </View>
            <Text style={styles.successTitle}>30-Day Notice Registered</Text>
            <Text style={styles.successSub}>
              Your move-out request has been logged in the Stayra immutable ledger. Your scheduled move-out date is{' '}
              <Text style={{ fontWeight: '700', color: colors.text }}>14th October 2026</Text>.
            </Text>

            <View style={styles.settlementSummary}>
              <Text style={styles.settlementHeader}>FINAL ESTIMATED SETTLEMENT</Text>
              <Text style={styles.settlementAmount}>₹{netRefund.toLocaleString('en-IN')}</Text>
              <Text style={styles.settlementSub}>Will be credited to {upiId} within 7 days of room handover.</Text>
            </View>

            <Button
              title="Return to My Stay"
              onPress={() => router.replace('/(resident)/my-stay' as any)}
              size="lg"
              style={{ width: '100%', marginTop: spacing.md }}
            />
          </View>
        ) : (
          <View>
            {/* Notice Policy Banner */}
            <View style={styles.banner}>
              <Icon name="ShieldCheck" size={18} color={colors.shieldEmerald} style={{ marginRight: spacing.sm }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.bannerTitle}>Stayra Guaranteed Deposit Refund</Text>
                <Text style={styles.bannerBody}>
                  Standard 30-day notice period. Zero arbitrary deductions. All calculations are itemized and verified.
                </Text>
              </View>
            </View>

            {/* Form */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Move-Out Details</Text>

              <Text style={styles.inputLabel}>Reason for Leaving</Text>
              <View style={styles.reasonsGrid}>
                {[
                  'Relocation / Job Switch',
                  'Moving closer to work',
                  'Found flat with friends',
                  'Personal / Family reason',
                ].map((r) => (
                  <TouchableOpacity
                    key={r}
                    onPress={() => setReason(r)}
                    style={[styles.reasonPill, reason === r && styles.reasonPillActive]}
                  >
                    <Text style={[styles.reasonText, reason === r && styles.reasonTextActive]}>
                      {r}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Deposit Settlement Engine Calculator */}
              <Text style={[styles.inputLabel, { marginTop: spacing.md }]}>
                Deposit Settlement Calculation Engine
              </Text>

              <View style={styles.calcBox}>
                <View style={styles.calcRow}>
                  <Text style={styles.calcLabel}>Deposit Held in Escrow</Text>
                  <Text style={styles.calcVal}>+₹{deposit.toLocaleString('en-IN')}</Text>
                </View>
                <View style={styles.calcRow}>
                  <Text style={styles.calcLabel}>Estimated Final Utility Usage</Text>
                  <Text style={[styles.calcVal, { color: colors.danger }]}>
                    -₹{estimatedUtilities.toLocaleString('en-IN')}
                  </Text>
                </View>
                <View style={styles.calcRow}>
                  <Text style={styles.calcLabel}>Unapplied SLA Service Credits</Text>
                  <Text style={[styles.calcVal, { color: colors.success }]}>
                    +₹{unappliedCredits.toLocaleString('en-IN')}
                  </Text>
                </View>

                <View style={styles.calcDivider} />

                <View style={styles.calcRowTotal}>
                  <View>
                    <Text style={styles.calcTotalLabel}>Estimated Net Refund</Text>
                    <Text style={styles.calcTotalSub}>100% Guaranteed by Stayra</Text>
                  </View>
                  <Text style={styles.calcTotalAmount}>₹{netRefund.toLocaleString('en-IN')}</Text>
                </View>
              </View>

              <Input
                label="Bank Account / UPI ID for Refund"
                value={upiId}
                onChangeText={setUpiId}
                iconLeft="CreditCard"
                placeholder="yourname@okhdfcbank"
              />

              <Button
                title="Confirm & Serve 30-Day Notice"
                onPress={handleSubmitNotice}
                variant="danger"
                size="lg"
                iconRight="ChevronRight"
                style={{ marginTop: spacing.sm }}
              />
            </View>
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
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successLight,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
  },
  bannerTitle: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.successDark,
  },
  bannerBody: {
    ...typography.caption,
    color: colors.successDark,
    fontSize: 11,
    marginTop: 2,
    lineHeight: 16,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  cardTitle: {
    ...typography.heading3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  inputLabel: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  reasonsGrid: {
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  reasonPill: {
    paddingVertical: 8,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceSecondary,
  },
  reasonPillActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  reasonText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  reasonTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  calcBox: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  calcRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  calcLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  calcVal: {
    ...typography.bodySmall,
    fontWeight: '700',
    color: colors.text,
  },
  calcDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  calcRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calcTotalLabel: {
    ...typography.heading3,
    color: colors.text,
  },
  calcTotalSub: {
    fontSize: 10,
    color: colors.shieldEmerald,
    fontWeight: '700',
  },
  calcTotalAmount: {
    ...typography.heading1,
    color: colors.primary,
  },
  successCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.md,
  },
  successCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  successTitle: {
    ...typography.heading2,
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
  settlementSummary: {
    width: '100%',
    backgroundColor: '#0F172A',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
  },
  settlementHeader: {
    color: '#93C5FD',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 4,
  },
  settlementAmount: {
    ...typography.display,
    color: colors.shieldEmerald,
    marginBottom: 4,
  },
  settlementSub: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
  },
});
