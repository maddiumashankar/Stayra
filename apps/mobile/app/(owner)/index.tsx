import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '../../src/theme/tokens';
import { HeaderBar, Icon, Badge, MetricCard } from '../../src/components/common';
import { mockOwnerStats } from '../../src/data/mockData';

export default function OwnerDashboardScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBar title="Owner Executive Suite" subtitle="Stayra Portfolio • 3 Branches" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* KPI Metrics Grid */}
        <View style={styles.metricsGrid}>
          <MetricCard
            label="PORTFOLIO OCCUPANCY"
            value={`${mockOwnerStats.occupancyRate}%`}
            subtitle={`${mockOwnerStats.occupiedBeds} of ${mockOwnerStats.totalBeds} beds`}
            trend="+4.2% this mo"
            isPositiveTrend
            icon="Bed"
            iconColor={colors.primary}
            style={styles.metricCardHalf}
          />

          <MetricCard
            label="ACTIVE MONTHLY REVENUE"
            value={mockOwnerStats.monthlyRevenue}
            trend={mockOwnerStats.revenueGrowth}
            isPositiveTrend
            icon="TrendingUp"
            iconColor={colors.shieldEmerald}
            style={styles.metricCardHalf}
          />

          <MetricCard
            label="PENDING RENT DUES"
            value={mockOwnerStats.pendingRentAmount}
            subtitle={`${mockOwnerStats.pendingTenantsCount} residents pending`}
            trend="Due in 2 days"
            isPositiveTrend={false}
            icon="Clock"
            iconColor={colors.amber}
            style={styles.metricCardHalf}
          />

          <MetricCard
            label="SLA COMPLIANCE RATE"
            value={`${mockOwnerStats.slaComplianceRate}%`}
            subtitle={`Avg fix: ${mockOwnerStats.avgResolutionTime}`}
            trend="1 breach this mo"
            isPositiveTrend
            icon="ShieldCheck"
            iconColor={colors.primary}
            style={styles.metricCardHalf}
          />
        </View>

        {/* Urgent Attention Operational Alerts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Urgent Action Items ({mockOwnerStats.urgentAlerts.length})</Text>

          {mockOwnerStats.urgentAlerts.map((alert) => (
            <TouchableOpacity
              key={alert.id}
              style={[
                styles.alertCard,
                alert.severity === 'HIGH' && styles.alertCardHigh,
                alert.severity === 'WARNING' && styles.alertCardWarning,
              ]}
              onPress={() => {
                if (alert.id === 'alert-1') {
                  router.push('/(owner)/complaints' as any);
                } else if (alert.id === 'alert-2') {
                  router.push('/(owner)/billing/record-meter' as any);
                } else {
                  router.push('/(owner)/properties/prop-hsr-01/rooms' as any);
                }
              }}
              activeOpacity={0.85}
            >
              <View style={styles.alertIconBox}>
                <Icon
                  name={
                    alert.severity === 'HIGH'
                      ? 'AlertTriangle'
                      : alert.severity === 'WARNING'
                      ? 'Zap'
                      : 'User'
                  }
                  size={18}
                  color={
                    alert.severity === 'HIGH'
                      ? colors.danger
                      : alert.severity === 'WARNING'
                      ? colors.amber
                      : colors.primary
                  }
                />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.alertHeaderRow}>
                  <Text style={styles.alertTitle}>{alert.title}</Text>
                  <Badge
                    label={alert.severity}
                    variant={
                      alert.severity === 'HIGH'
                        ? 'danger'
                        : alert.severity === 'WARNING'
                        ? 'warning'
                        : 'info'
                    }
                    size="sm"
                  />
                </View>
                <Text style={styles.alertMessage}>{alert.message}</Text>
              </View>
              <Icon name="ChevronRight" size={16} color={colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Action Shortcuts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Operations Shortcuts</Text>
          <View style={styles.quickActionRow}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push('/(owner)/billing' as any)}
              activeOpacity={0.8}
            >
              <View style={styles.actionIconCircle}>
                <Icon name="Receipt" size={20} color={colors.primary} />
              </View>
              <Text style={styles.actionBtnTitle}>Run Monthly Bills</Text>
              <Text style={styles.actionBtnSub}>Batch generate draft invoices</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push('/(owner)/properties/prop-hsr-01/rooms' as any)}
              activeOpacity={0.8}
            >
              <View style={[styles.actionIconCircle, { backgroundColor: colors.shieldEmerald + '15' }]}>
                <Icon name="Bed" size={20} color={colors.shieldEmerald} />
              </View>
              <Text style={styles.actionBtnTitle}>Bed Grid Matrix</Text>
              <Text style={styles.actionBtnSub}>Floor-by-floor allocation</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.quickActionRow, { marginTop: spacing.sm }]}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push('/(owner)/billing/record-meter' as any)}
              activeOpacity={0.8}
            >
              <View style={[styles.actionIconCircle, { backgroundColor: colors.amber + '15' }]}>
                <Icon name="Zap" size={20} color={colors.amber} />
              </View>
              <Text style={styles.actionBtnTitle}>Record Sub-Meters</Text>
              <Text style={styles.actionBtnSub}>Electricity photo &amp; AI check</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push('/(owner)/complaints' as any)}
              activeOpacity={0.8}
            >
              <View style={[styles.actionIconCircle, { backgroundColor: colors.danger + '15' }]}>
                <Icon name="Wrench" size={20} color={colors.danger} />
              </View>
              <Text style={styles.actionBtnTitle}>Dispatch Staff</Text>
              <Text style={styles.actionBtnSub}>SLA priority kanban</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Portfolio Branches List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Property Portfolio Performance</Text>
            <TouchableOpacity onPress={() => router.push('/(owner)/properties' as any)}>
              <Text style={styles.linkText}>View All</Text>
            </TouchableOpacity>
          </View>

          {mockOwnerStats.activeBranches.map((branch) => (
            <TouchableOpacity
              key={branch.id}
              style={styles.branchCard}
              onPress={() => router.push(`/(owner)/properties/${branch.id}/rooms` as any)}
              activeOpacity={0.85}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.branchName}>{branch.name}</Text>
                <Text style={styles.branchSub}>
                  Occupancy: {branch.occupancy}% ({branch.beds} beds) • Revenue: {branch.revenue}/mo
                </Text>
                <View style={styles.occupancyBar}>
                  <View style={[styles.occupancyBarFill, { width: `${branch.occupancy}%` }]} />
                </View>
              </View>
              <Icon name="ChevronRight" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          ))}
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
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  metricCardHalf: {
    width: '48.5%',
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
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xs,
    ...shadows.sm,
  },
  alertCardHigh: {
    borderColor: 'rgba(239, 68, 68, 0.4)',
    backgroundColor: '#FEF2F2',
  },
  alertCardWarning: {
    borderColor: 'rgba(245, 158, 11, 0.4)',
    backgroundColor: '#FFFBEB',
  },
  alertIconBox: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  alertHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  alertTitle: {
    ...typography.bodyBold,
    color: colors.text,
  },
  alertMessage: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  quickActionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  actionIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  actionBtnTitle: {
    ...typography.bodyBold,
    color: colors.text,
  },
  actionBtnSub: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  branchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xs,
  },
  branchName: {
    ...typography.bodyBold,
    color: colors.text,
  },
  branchSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
    marginBottom: 6,
  },
  occupancyBar: {
    height: 5,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 3,
    overflow: 'hidden',
  },
  occupancyBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
});
