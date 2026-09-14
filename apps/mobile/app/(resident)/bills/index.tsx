import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '../../../src/theme/tokens';
import { HeaderBar, Icon, Badge, Button } from '../../../src/components/common';
import { useStayraStore } from '../../../src/stores/useStayraStore';
import { Bill } from '../../../src/data/mockData';

export default function BillsScreen() {
  const router = useRouter();
  const { bills, payBill } = useStayraStore();
  const currentBill = bills.find((b) => b.status === 'ISSUED') || bills[0];

  const [paying, setPaying] = useState(false);

  const handleQuickPay = (bill: Bill) => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      payBill(bill.id, `pay_UPI_${Date.now().toString().slice(-8)}`);
      Alert.alert(
        'Payment Captured Successfully!',
        `₹${bill.finalPayableAmount.toLocaleString('en-IN')} paid via UPI. GST Invoice receipt generated and double-entry ledger reconciled.`
      );
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBar title="Bills &amp; Payments" subtitle="Double-Entry Financial Ledger" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Outstanding Rent Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <Text style={styles.heroLabel}>CURRENT OUTSTANDING DUE</Text>
            <Badge
              label={currentBill.status === 'PAID' ? 'ALL CLEAR' : 'DUE 5TH OCT'}
              variant={currentBill.status === 'PAID' ? 'success' : 'warning'}
              size="sm"
            />
          </View>

          <Text style={styles.heroAmount}>
            ₹{currentBill.status === 'PAID' ? '0' : currentBill.finalPayableAmount.toLocaleString('en-IN')}
          </Text>

          {currentBill.status !== 'PAID' && (
            <View style={styles.heroSubRow}>
              <Text style={styles.heroSubText}>
                Invoice #{currentBill.invoiceNumber} • Billing Period {currentBill.billingPeriodStart} to {currentBill.billingPeriodEnd}
              </Text>
            </View>
          )}

          {/* Automatic SLA Credit Highlight */}
          {currentBill.totalServiceCredits > 0 && currentBill.status !== 'PAID' && (
            <View style={styles.creditBanner}>
              <Icon name="ShieldCheck" size={16} color={colors.shieldEmerald} style={{ marginRight: 6 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.creditTitle}>
                  -₹{currentBill.totalServiceCredits} Service Compensation Credit Applied!
                </Text>
                <Text style={styles.creditSub}>
                  Automatic deduction for Ticket #TKT-00392 (WiFi downtime breach).
                </Text>
              </View>
            </View>
          )}

          {currentBill.status !== 'PAID' ? (
            <View style={styles.heroActionsRow}>
              <Button
                title={`Pay ₹${currentBill.finalPayableAmount.toLocaleString('en-IN')} via UPI`}
                onPress={() => handleQuickPay(currentBill)}
                loading={paying}
                size="lg"
                iconRight="ChevronRight"
                style={{ flex: 1 }}
              />
              <Button
                title="Breakdown"
                variant="outline"
                size="lg"
                onPress={() => router.push(`/(resident)/bills/${currentBill.id}` as any)}
                style={{ paddingHorizontal: spacing.md }}
              />
            </View>
          ) : (
            <View style={styles.paidBadgeBox}>
              <Icon name="CheckCircle2" size={16} color={colors.success} style={{ marginRight: 6 }} />
              <Text style={styles.paidBadgeText}>Your rent for this cycle is fully settled!</Text>
            </View>
          )}
        </View>

        {/* Current Bill Itemized Preview */}
        {currentBill.status !== 'PAID' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Itemized Billing Line Items</Text>
              <TouchableOpacity onPress={() => router.push(`/(resident)/bills/${currentBill.id}` as any)}>
                <Text style={styles.linkText}>View Invoice</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.itemsCard}>
              {currentBill.items.map((item) => (
                <View key={item.id} style={styles.billItemRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.itemDesc}>{item.description}</Text>
                    {item.metadata?.prevMeterUnits && (
                      <Text style={styles.meterMeta}>
                        Meter Reading: {item.metadata.prevMeterUnits} $\to$ {item.metadata.currentMeterUnits} ({item.quantity} units @ ₹10)
                      </Text>
                    )}
                  </View>
                  <Text
                    style={[
                      styles.itemAmount,
                      item.totalAmount < 0 && styles.itemCredit,
                    ]}
                  >
                    {item.totalAmount < 0 ? `-₹${Math.abs(item.totalAmount)}` : `₹${item.totalAmount.toLocaleString('en-IN')}`}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Payment History & Double-Entry Ledger */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Invoice &amp; Payment History</Text>

          {bills.map((b) => (
            <View key={b.id} style={styles.historyCard}>
              <View style={styles.historyLeft}>
                <View style={[styles.historyIcon, b.status === 'PAID' && styles.historyIconPaid]}>
                  <Icon
                    name={b.status === 'PAID' ? 'CheckCircle2' : 'Clock'}
                    size={18}
                    color={b.status === 'PAID' ? colors.success : colors.amber}
                  />
                </View>
                <View>
                  <Text style={styles.historyInvoice}>{b.invoiceNumber}</Text>
                  <Text style={styles.historyDate}>
                    {b.billingPeriodStart} • {b.status === 'PAID' ? `Paid on ${b.paidAt?.slice(0, 10)}` : `Due on ${b.dueDate}`}
                  </Text>
                </View>
              </View>

              <View style={styles.historyRight}>
                <Text style={styles.historyAmount}>₹{b.finalPayableAmount.toLocaleString('en-IN')}</Text>
                <Badge
                  label={b.status}
                  variant={b.status === 'PAID' ? 'success' : 'warning'}
                  size="sm"
                />
              </View>
            </View>
          ))}
        </View>

        {/* Financial Security Escrow Note */}
        <View style={styles.securityNote}>
          <Icon name="ShieldCheck" size={16} color={colors.primary} style={{ marginRight: 6 }} />
          <Text style={styles.securityNoteText}>
            All payments are held in RBI-compliant escrow and double-entry reconciled against Stayra Core Ledgers.
          </Text>
        </View>
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
  heroCard: {
    backgroundColor: '#0F172A',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.lg,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  heroLabel: {
    color: '#93C5FD',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  heroAmount: {
    ...typography.display,
    color: '#FFFFFF',
    fontSize: 34,
    marginBottom: spacing.xs,
  },
  heroSubRow: {
    marginBottom: spacing.md,
  },
  heroSubText: {
    ...typography.caption,
    color: '#94A3B8',
    fontSize: 11,
  },
  creditBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  creditTitle: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.shieldEmerald,
  },
  creditSub: {
    fontSize: 10,
    color: '#A7F3D0',
  },
  heroActionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  paidBadgeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  paidBadgeText: {
    ...typography.bodySmall,
    fontWeight: '700',
    color: colors.shieldEmerald,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  sectionTitle: {
    ...typography.heading3,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  linkText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.primary,
  },
  itemsCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  billItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceSecondary,
  },
  itemDesc: {
    ...typography.bodySmall,
    color: colors.text,
  },
  meterMeta: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 2,
  },
  itemAmount: {
    ...typography.bodyBold,
    color: colors.text,
  },
  itemCredit: {
    color: colors.shieldEmerald,
  },
  historyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.xs,
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyIcon: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  historyIconPaid: {
    backgroundColor: colors.successLight,
  },
  historyInvoice: {
    ...typography.bodyBold,
    color: colors.text,
  },
  historyDate: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  historyRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  historyAmount: {
    ...typography.bodyBold,
    color: colors.text,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSecondary,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginTop: spacing.xs,
  },
  securityNoteText: {
    ...typography.caption,
    color: colors.textSecondary,
    flex: 1,
    fontSize: 11,
    lineHeight: 16,
  },
});
