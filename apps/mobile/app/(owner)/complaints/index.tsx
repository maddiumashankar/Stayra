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
import { colors, typography, spacing, borderRadius, shadows } from '../../../src/theme/tokens';
import { HeaderBar, Icon, Badge, Button, SlaTimerBadge } from '../../../src/components/common';
import { useStayraStore } from '../../../src/stores/useStayraStore';

export default function OwnerComplaintsScreen() {
  const { complaints, updateComplaintStatus } = useStayraStore();
  const [filterTab, setFilterTab] = useState<'ALL' | 'BREACHING' | 'CRITICAL' | 'RESOLVED'>('ALL');

  const filteredTickets = complaints.filter((c) => {
    if (filterTab === 'RESOLVED') return c.status === 'RESOLVED' || c.status === 'VERIFIED_CLOSED';
    if (filterTab === 'CRITICAL') return c.severity === 'CRITICAL';
    if (filterTab === 'BREACHING') return c.isSlaBreached || c.severity === 'CRITICAL';
    return true;
  });

  const handleResolve = (ticketId: string) => {
    updateComplaintStatus(ticketId, 'RESOLVED', 'Electrician replaced MCB breaker.');
    Alert.alert('Resolution Logged', 'Ticket marked resolved with photo proof. Resident prompted for verified rating.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBar title="Maintenance Dispatch" subtitle="SLA Priority Kanban" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Urgent SLA Alert Banner */}
        <View style={styles.urgencyBanner}>
          <Icon name="AlertTriangle" size={18} color={colors.amberDark} style={{ marginRight: spacing.sm }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.urgencyTitle}>1 Ticket Approaching SLA Breach Deadline</Text>
            <Text style={styles.urgencySub}>
              TKT-00418 has 1h 45m remaining before a daily ₹100 SLA credit is triggered.
            </Text>
          </View>
        </View>

        {/* Filter Pills */}
        <View style={styles.filterRow}>
          {[
            { key: 'ALL', label: `All (${complaints.length})` },
            { key: 'BREACHING', label: 'Breaching Soon' },
            { key: 'CRITICAL', label: 'Critical' },
            { key: 'RESOLVED', label: 'Resolved' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setFilterTab(tab.key as any)}
              style={[styles.tabPill, filterTab === tab.key && styles.tabPillActive]}
            >
              <Text style={[styles.tabText, filterTab === tab.key && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tickets Kanban List */}
        {filteredTickets.map((ticket) => (
          <View key={ticket.id} style={styles.ticketCard}>
            <View style={styles.ticketHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.ticketNum}>#{ticket.ticketNumber}</Text>
                <Text style={styles.ticketTitle}>{ticket.title}</Text>
                <Text style={styles.ticketLocation}>
                  {ticket.propertyName} • {ticket.roomNumber} (Tenant: {ticket.residentName})
                </Text>
              </View>
              <Badge
                label={ticket.severity}
                variant={ticket.severity === 'CRITICAL' ? 'danger' : 'brand'}
                size="sm"
              />
            </View>

            <Text style={styles.ticketDesc} numberOfLines={2}>{ticket.description}</Text>

            {/* SLA Timer & Staff Assignment */}
            <View style={styles.metaRow}>
              <SlaTimerBadge
                targetTime={ticket.slaTargetTime}
                isBreached={ticket.isSlaBreached}
                compensationCredit={ticket.compensationCredit}
                status={ticket.status}
              />

              <View style={styles.staffAssignedPill}>
                <Icon name="User" size={11} color={colors.textSecondary} style={{ marginRight: 3 }} />
                <Text style={styles.staffAssignedText}>
                  {ticket.assignedStaff ? ticket.assignedStaff.name : 'Unassigned'}
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            {ticket.status !== 'RESOLVED' && ticket.status !== 'VERIFIED_CLOSED' ? (
              <View style={styles.actionsRow}>
                <Button
                  title="Mark Resolved with Proof"
                  size="sm"
                  onPress={() => handleResolve(ticket.id)}
                  iconLeft="Check"
                  variant="accent"
                  style={{ flex: 1 }}
                />
                <Button
                  title="Call Staff"
                  size="sm"
                  variant="outline"
                  onPress={() => Alert.alert('Dialing Staff', `Calling ${ticket.assignedStaff?.phone || 'reception'}`)}
                  iconLeft="Phone"
                />
              </View>
            ) : (
              <View style={styles.resolvedInfoRow}>
                <Icon name="CheckCircle2" size={14} color={colors.success} style={{ marginRight: 4 }} />
                <Text style={styles.resolvedInfoText}>Resolved &amp; verified by resident</Text>
              </View>
            )}
          </View>
        ))}
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
  urgencyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.amberLight,
    borderWidth: 1.5,
    borderColor: 'rgba(245, 158, 11, 0.4)',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  urgencyTitle: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.amberDark,
  },
  urgencySub: {
    fontSize: 11,
    color: colors.text,
    lineHeight: 16,
    marginTop: 2,
  },
  filterRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  tabPill: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  ticketCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
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
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
  },
  ticketTitle: {
    ...typography.bodyBold,
    color: colors.text,
  },
  ticketLocation: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
  },
  ticketDesc: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 16,
    marginVertical: 4,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: spacing.xs,
  },
  staffAssignedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSecondary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.xs,
  },
  staffAssignedText: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  resolvedInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  resolvedInfoText: {
    ...typography.caption,
    color: colors.successDark,
    fontWeight: '600',
  },
});
