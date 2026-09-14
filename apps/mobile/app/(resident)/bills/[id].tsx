import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '../../../src/theme/tokens';
import { HeaderBar, Icon, Badge, Button } from '../../../src/components/common';
import { useStayraStore } from '../../../src/stores/useStayraStore';

export default function InvoiceDetailsScreen() {
  const params = useLocalSearchParams();
  const billId = (params.id as string) || 'bill-sep-2026';

  const { bills, payBill } = useStayraStore();
  const bill = bills.find((b) => b.id === billId) || bills[0];

  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const handlePay = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      payBill(bill.id, `pay_UPI_${Date.now().toString().slice(-8)}`);
      Alert.alert('Payment Successful', 'Rent settled. PDF Tax Invoice receipt generated.');
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBar title={`Invoice #${bill.invoiceNumber}`} showBack />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Invoice Paper Canvas */}
        <View style={styles.invoicePaper}>
          <View style={styles.invoiceHeaderRow}>
            <View>
              <Text style={styles.invoiceBrand}>STAYRA RESIDENTIAL INVOICE</Text>
              <Text style={styles.invoiceNum}>#{bill.invoiceNumber}</Text>
            </View>
            <Badge
              label={bill.status}
              variant={bill.status === 'PAID' ? 'success' : 'warning'}
              size="md"
            />
          </View>

          <View style={styles.datesRow}>
            <View>
              <Text style={styles.metaLabel}>BILLING PERIOD</Text>
              <Text style={styles.metaVal}>{bill.billingPeriodStart} to {bill.billingPeriodEnd}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.metaLabel}>DUE DATE</Text>
              <Text style={styles.metaVal}>{bill.dueDate}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Line Items Table */}
          <Text style={styles.tableHeader}>ITEMIZED SERVICE CHARGES</Text>

          {bill.items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={{ flex: 1, paddingRight: spacing.sm }}>
                <Text style={styles.itemTitle}>{item.description}</Text>
                {item.category === 'ELECTRICITY_METERED' && item.metadata && (
                  <View style={styles.meterProofBox}>
                    <Text style={styles.meterText}>
                      Units consumed: {item.quantity} kWh (from {item.metadata.prevMeterUnits} to {item.metadata.currentMeterUnits})
                    </Text>
                    {item.metadata.meterPhotoUrl && (
                      <View style={styles.meterPhotoRow}>
                        <Icon name="Camera" size={12} color={colors.primary} style={{ marginRight: 4 }} />
                        <Text style={styles.meterPhotoLink}>Verified Meter Camera Proof Attached</Text>
                      </View>
                    )}
                  </View>
                )}
                {item.category === 'SERVICE_COMPENSATION_CREDIT' && (
                  <View style={styles.creditProofBox}>
                    <Icon name="ShieldCheck" size={12} color={colors.shieldEmerald} style={{ marginRight: 4 }} />
                    <Text style={styles.creditProofText}>
                      Stayra SLA Breach Compensation Guarantee
                    </Text>
                  </View>
                )}
              </View>

              <Text
                style={[
                  styles.itemTotal,
                  item.totalAmount < 0 && styles.itemCreditText,
                ]}
              >
                {item.totalAmount < 0
                  ? `-₹${Math.abs(item.totalAmount).toLocaleString('en-IN')}`
                  : `₹${item.totalAmount.toLocaleString('en-IN')}`}
              </Text>
            </View>
          ))}

          <View style={styles.divider} />

          {/* Totals Summary */}
          <View style={styles.totalsBox}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal Charges</Text>
              <Text style={styles.summaryVal}>₹{bill.subtotalAmount.toLocaleString('en-IN')}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>SLA Compensation Credits</Text>
              <Text style={[styles.summaryVal, { color: colors.shieldEmerald }]}>
                -₹{bill.totalServiceCredits.toLocaleString('en-IN')}
              </Text>
            </View>

            <View style={styles.totalDivider} />

            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalLabel}>Net Payable Amount</Text>
              <Text style={styles.grandTotalVal}>
                ₹{bill.finalPayableAmount.toLocaleString('en-IN')}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Button */}
        {bill.status !== 'PAID' ? (
          <Button
            title={`Pay ₹${bill.finalPayableAmount.toLocaleString('en-IN')} with Razorpay`}
            onPress={handlePay}
            loading={paymentProcessing}
            size="lg"
            iconRight="ShieldCheck"
            style={{ marginBottom: spacing.md }}
          />
        ) : (
          <Button
            title="Download GST Receipt (PDF)"
            variant="outline"
            onPress={() => Alert.alert('Receipt Downloaded', 'GST Invoice PDF saved.')}
            size="lg"
            iconLeft="FileText"
            style={{ marginBottom: spacing.md }}
          />
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
  invoicePaper: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  invoiceHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  invoiceBrand: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  invoiceNum: {
    ...typography.heading2,
    color: colors.text,
  },
  datesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceSecondary,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
  },
  metaLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  metaVal: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  tableHeader: {
    ...typography.label,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceSecondary,
  },
  itemTitle: {
    ...typography.bodySmall,
    fontWeight: '600',
    color: colors.text,
  },
  itemTotal: {
    ...typography.bodyBold,
    color: colors.text,
  },
  itemCreditText: {
    color: colors.shieldEmerald,
    fontWeight: '800',
  },
  meterProofBox: {
    marginTop: 4,
  },
  meterText: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  meterPhotoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  meterPhotoLink: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: '600',
  },
  creditProofBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  creditProofText: {
    fontSize: 10,
    color: colors.shieldEmerald,
    fontWeight: '700',
  },
  totalsBox: {
    marginTop: spacing.xs,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  summaryLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  summaryVal: {
    ...typography.bodySmall,
    fontWeight: '700',
    color: colors.text,
  },
  totalDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  grandTotalLabel: {
    ...typography.heading3,
    color: colors.text,
  },
  grandTotalVal: {
    ...typography.heading1,
    color: colors.primary,
  },
});
