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
import { colors, typography, spacing, borderRadius, shadows } from '../../../src/theme/tokens';
import { HeaderBar, Icon, Badge, Button, SlaTimerBadge } from '../../../src/components/common';
import { useStayraStore } from '../../../src/stores/useStayraStore';

export default function ComplaintsScreen() {
  const router = useRouter();
  const { complaints } = useStayraStore();

  const activeTickets = complaints.filter(
    (c) => c.status !== 'RESOLVED' && c.status !== 'VERIFIED_CLOSED'
  );
  const resolvedTickets = complaints.filter(
    (c) => c.status === 'RESOLVED' || c.status === 'VERIFIED_CLOSED'
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBar title="Maintenance &amp; SLAs" subtitle="Live SLA Timers &amp; Compensation" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Raise Ticket Hero Banner */}
        <View style={styles.heroCard}>
          <View style={styles.heroLeft}>
            <Text style={styles.heroTitle}>Need Maintenance?</Text>
            <Text style={styles.heroSub}>
              All tickets have guaranteed SLA timers. If our staff breaches the deadline, you get automatic daily rent credits.
            </Text>
          </View>
          <Button
            title="Raise Ticket"
            onPress={() => router.push('/(resident)/complaints/new' as any)}
            iconLeft="Plus"
            size="md"
            style={{ alignSelf: 'flex-start', marginTop: spacing.sm }}
          />
        </View>

        {/* SLA Guarantee Summary Card */}
        <View style={styles.slaSummaryCard}>
          <View style={styles.slaSummaryItem}>
            <Icon name="ShieldCheck" size={16} color={colors.shieldEmerald} style={{ marginBottom: 2 }} />
            <Text style={styles.slaSummaryNum}>95.8%</Text>
            <Text style={styles.slaSummaryLabel}>SLA Compliance</Text>
          </View>

          <View style={styles.slaDivider} />

          <View style={styles.slaSummaryItem}>
            <Icon name="Clock" size={16} color={colors.primary} style={{ marginBottom: 2 }} />
            <Text style={styles.slaSummaryNum}>9.4 hrs</Text>
            <Text style={styles.slaSummaryLabel}>Avg Resolution</Text>
          </View>

          <View style={styles.slaDivider} />

          <View style={styles.slaSummaryItem}>
            <Icon name="Zap" size={16} color={colors.amber} style={{ marginBottom: 2 }} />
            <Text style={styles.slaSummaryNum}>₹100/day</Text>
            <Text style={styles.slaSummaryLabel}>Breach Credit</Text>
          </View>
        </View>

        {/* Active Tickets with Live Timers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Tickets ({activeTickets.length})</Text>

          {activeTickets.length === 0 ? (
            <View style={styles.emptyTickets}>
              <Icon name="CheckCircle2" size={24} color={colors.success} style={{ marginRight: spacing.sm }} />
              <Text style={styles.emptyText}>Zero open complaints. Everything is in working order!</Text>
            </View>
          ) : (
            activeTickets.map((ticket) => (
              <TouchableOpacity
                key={ticket.id}
                style={styles.ticketCard}
                onPress={() => router.push(`/(resident)/complaints/${ticket.id}` as any)}
                activeOpacity={0.88}
              >
                <View style={styles.ticketHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.ticketNum}>#{ticket.ticketNumber}</Text>
                    <Text style={styles.ticketTitle} numberOfLines={1}>{ticket.title}</Text>
                  </View>
                  <Badge label={ticket.category} variant="brand" size="sm" />
                </View>

                <Text style={styles.ticketDesc} numberOfLines={2}>{ticket.description}</Text>

                <View style={styles.ticketFooter}>
                  <SlaTimerBadge
                    targetTime={ticket.slaTargetTime}
                    isBreached={ticket.isSlaBreached}
                    compensationCredit={ticket.compensationCredit}
                  />

                  {ticket.assignedStaff && (
                    <View style={styles.staffPill}>
                      <Icon name="User" size={11} color={colors.textSecondary} style={{ marginRight: 3 }} />
                      <Text style={styles.staffName}>{ticket.assignedStaff.name} ({ticket.assignedStaff.role})</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Resolved Tickets & SLA Credits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resolved &amp; Compensated ({resolvedTickets.length})</Text>

          {resolvedTickets.map((ticket) => (
            <TouchableOpacity
              key={ticket.id}
              style={styles.ticketCard}
              onPress={() => router.push(`/(resident)/complaints/${ticket.id}` as any)}
              activeOpacity={0.88}
            >
              <View style={styles.ticketHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.ticketNum}>#{ticket.ticketNumber}</Text>
                  <Text style={styles.ticketTitle} numberOfLines={1}>{ticket.title}</Text>
                </View>
                <Badge label="RESOLVED" variant="success" size="sm" />
              </View>

              <Text style={styles.ticketDesc} numberOfLines={2}>{ticket.description}</Text>

              {/* SLA Compensation Badge if breached */}
              {ticket.isSlaBreached && ticket.compensationCredit && (
                <View style={styles.compensationBanner}>
                  <Icon name="ShieldCheck" size={13} color={colors.shieldEmerald} style={{ marginRight: 4 }} />
                  <Text style={styles.compensationText}>
                    SLA Breached: ₹{ticket.compensationCredit} Rent Credit Applied to your Ledger!
                  </Text>
                </View>
              )}

              {ticket.feedback && (
                <View style={styles.feedbackRow}>
                  <Text style={styles.feedbackLabel}>Your Verified Rating:</Text>
                  <View style={styles.stars}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Icon
                        key={s}
                        name="Star"
                        size={11}
                        color={s <= ticket.feedback!.speedRating ? colors.amber : colors.border}
                      />
                    ))}
                  </View>
                </View>
              )}
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
  heroCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  heroLeft: {},
  heroTitle: {
    ...typography.heading2,
    color: colors.text,
    marginBottom: 4,
  },
  heroSub: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: 19,
  },
  slaSummaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  slaSummaryItem: {
    alignItems: 'center',
  },
  slaSummaryNum: {
    ...typography.heading3,
    color: colors.text,
  },
  slaSummaryLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
  slaDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.border,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.heading3,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  emptyTickets: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successLight,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  emptyText: {
    ...typography.caption,
    color: colors.successDark,
    fontWeight: '600',
  },
  ticketCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  ticketNum: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  ticketTitle: {
    ...typography.bodyBold,
    color: colors.text,
  },
  ticketDesc: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    lineHeight: 16,
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  staffPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSecondary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.xs,
  },
  staffName: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  compensationBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.xs,
    marginBottom: 6,
  },
  compensationText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.successDark,
  },
  feedbackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.surfaceSecondary,
    paddingTop: 6,
    marginTop: 4,
  },
  feedbackLabel: {
    fontSize: 10,
    color: colors.textMuted,
    marginRight: 6,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
});
