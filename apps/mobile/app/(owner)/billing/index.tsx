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
import { HeaderBar, Icon, Button, MetricCard } from '../../../src/components/common';

export default function OwnerBillingScreen() {
  const router = useRouter();
  const [generatingBills, setGeneratingBills] = useState(false);

  const handleRunMonthlyBills = () => {
    setGeneratingBills(true);
    setTimeout(() => {
      setGeneratingBills(false);
      Alert.alert(
        'Billing Run Complete',
        '88 Tenancy invoices generated with metered electricity ingested and SLA breach credits automatically deducted.'
      );
    }, 1200);
  };

  const overdueList = [
    { id: '1', name: 'Kunal Singhal', room: 'Room 102 - Bed B', amount: 11500, days: 6, phone: '+91 98761 12345' },
    { id: '2', name: 'Pooja Hegde', room: 'Room 201 - Bed A', amount: 14000, days: 4, phone: '+91 98450 22334' },
    { id: '3', name: 'Tanmay Bhatt', room: 'Room 303 - Bed A', amount: 16500, days: 3, phone: '+91 97410 99887' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBar title="Billing &amp; Revenue" subtitle="Automated Double-Entry Ledgers" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Run Billing Banner */}
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.heroTitle}>Monthly Bill Generation</Text>
              <Text style={styles.heroSub}>
                Ingests active rent, variable sub-meters, and automatically subtracts SLA breach credits.
              </Text>
            </View>
          </View>

          <View style={styles.heroBtnRow}>
            <Button
              title="Run 1st of Month Billing Batch"
              onPress={handleRunMonthlyBills}
              loading={generatingBills}
              iconLeft="Receipt"
              size="lg"
              style={{ flex: 1 }}
            />
          </View>
        </View>

        {/* Financial Metrics */}
        <View style={styles.metricsRow}>
          <MetricCard
            label="COLLECTED THIS CYCLE"
            value="₹10.82L"
            subtitle="85 of 88 tenancies paid"
            isPositiveTrend
            trend="+5.4%"
            icon="CheckCircle2"
            iconColor={colors.success}
            style={{ flex: 1 }}
          />

          <MetricCard
            label="PENDING RECEIVABLES"
            value="₹42,000"
            subtitle="3 tenants pending"
            isPositiveTrend={false}
            trend="Action needed"
            icon="Clock"
            iconColor={colors.amber}
            style={{ flex: 1 }}
          />
        </View>

        {/* Record Sub-Meter CTA Banner */}
        <TouchableOpacity
          style={styles.meterBanner}
          onPress={() => router.push('/(owner)/billing/record-meter' as any)}
          activeOpacity={0.88}
        >
          <View style={styles.meterIconCircle}>
            <Icon name="Zap" size={22} color={colors.amber} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.meterTitle}>Record Electricity Sub-Meters</Text>
            <Text style={styles.meterSub}>
              Camera upload with AI OCR &amp; spike anomaly detection
            </Text>
          </View>
          <Icon name="ChevronRight" size={20} color={colors.primary} />
        </TouchableOpacity>

        {/* Overdue Tenants List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pending Dues ({overdueList.length})</Text>

          {overdueList.map((item) => (
            <View key={item.id} style={styles.dueCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.dueName}>{item.name}</Text>
                <Text style={styles.dueRoom}>{item.room}</Text>
                <Text style={styles.dueDays}>{item.days} days overdue</Text>
              </View>

              <View style={styles.dueRight}>
                <Text style={styles.dueAmount}>₹{item.amount.toLocaleString('en-IN')}</Text>
                <TouchableOpacity
                  style={styles.reminderBtn}
                  onPress={() => Alert.alert('Reminder Sent', `WhatsApp payment link dispatched to ${item.name}.`)}
                >
                  <Icon name="Send" size={12} color={colors.primary} style={{ marginRight: 4 }} />
                  <Text style={styles.reminderBtnText}>Remind</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* SLA Compensation Ledger Impact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SLA Credits Honored (This Month)</Text>
          <View style={styles.creditsCard}>
            <View style={styles.creditsTop}>
              <Icon name="ShieldCheck" size={18} color={colors.shieldEmerald} style={{ marginRight: 6 }} />
              <Text style={styles.creditsTotal}>-₹3,400 Total Rent Credits Deducted</Text>
            </View>
            <Text style={styles.creditsExplanation}>
              Guaranteed under owner SLA policies. Transparently adjusted in resident invoices, maintaining 94.8% SLA compliance.
            </Text>
          </View>
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
    ...shadows.md,
  },
  heroTop: {
    marginBottom: spacing.md,
  },
  heroTitle: {
    ...typography.heading2,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  heroSub: {
    ...typography.bodySmall,
    color: '#94A3B8',
    lineHeight: 18,
  },
  heroBtnRow: {},
  metricsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  meterBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  meterIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.amberLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  meterTitle: {
    ...typography.bodyBold,
    color: colors.text,
  },
  meterSub: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.heading3,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  dueCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xs,
  },
  dueName: {
    ...typography.bodyBold,
    color: colors.text,
  },
  dueRoom: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
  },
  dueDays: {
    fontSize: 10,
    color: colors.danger,
    fontWeight: '700',
    marginTop: 2,
  },
  dueRight: {
    alignItems: 'flex-end',
  },
  dueAmount: {
    ...typography.heading3,
    color: colors.text,
    marginBottom: 4,
  },
  reminderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  reminderBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  creditsCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  creditsTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  creditsTotal: {
    ...typography.bodyBold,
    color: colors.shieldEmerald,
  },
  creditsExplanation: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
  },
});
