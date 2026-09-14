import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '../../../src/theme/tokens';
import { HeaderBar, Icon, Badge, Button, SlaTimerBadge } from '../../../src/components/common';
import { useStayraStore } from '../../../src/stores/useStayraStore';

export default function TicketDetailsScreen() {
  const params = useLocalSearchParams();
  const ticketId = (params.id as string) || 'tkt-00392';

  const { complaints, updateComplaintStatus } = useStayraStore();
  const ticket = complaints.find((c) => c.id === ticketId) || complaints[0];

  const [speedRating, setSpeedRating] = useState(ticket.feedback?.speedRating || 5);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(Boolean(ticket.feedback));

  const handleResolveAndVerify = () => {
    updateComplaintStatus(ticket.id, 'VERIFIED_CLOSED', 'Resident verified resolution.');
    setFeedbackSubmitted(true);
    Alert.alert('Feedback Recorded', 'Thank you! Your verified rating updates the PG Living Reputation Score.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBar title={`Ticket #${ticket.ticketNumber}`} showBack />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Ticket Header Card */}
        <View style={styles.card}>
          <View style={styles.topRow}>
            <View>
              <Text style={styles.ticketNum}>#{ticket.ticketNumber}</Text>
              <Text style={styles.title}>{ticket.title}</Text>
            </View>
            <Badge label={ticket.category} variant="brand" size="sm" />
          </View>

          <Text style={styles.desc}>{ticket.description}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaText}>Created on {ticket.createdAt.slice(0, 10)}</Text>
            <Text style={styles.metaText}>Target SLA: {ticket.slaTargetTime.slice(0, 16).replace('T', ' ')}</Text>
          </View>
        </View>

        {/* SLA Status & Rent Compensation Highlight */}
        <View style={styles.slaBannerCard}>
          <View style={styles.slaBannerTop}>
            <Text style={styles.slaBannerLabel}>SERVICE LEVEL STATUS</Text>
            <SlaTimerBadge
              targetTime={ticket.slaTargetTime}
              isBreached={ticket.isSlaBreached}
              compensationCredit={ticket.compensationCredit}
              status={ticket.status}
            />
          </View>

          {ticket.isSlaBreached && (
            <View style={styles.creditBox}>
              <Icon name="ShieldCheck" size={18} color={colors.shieldEmerald} style={{ marginRight: spacing.sm }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.creditBoxTitle}>
                  Automatic Rent Credit: ₹{ticket.compensationCredit || 100} Honored
                </Text>
                <Text style={styles.creditBoxSub}>
                  SLA target was exceeded by 4h. The compensation credit has been automatically posted to your upcoming monthly ledger invoice.
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Assigned Technician Card */}
        {ticket.assignedStaff && (
          <View style={styles.card}>
            <Text style={styles.cardSectionHeader}>ASSIGNED MAINTENANCE SPECIALIST</Text>
            <View style={styles.staffRow}>
              <View style={styles.staffAvatar}>
                <Icon name="User" size={20} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.staffName}>{ticket.assignedStaff.name}</Text>
                <Text style={styles.staffRole}>{ticket.assignedStaff.role}</Text>
                <Text style={styles.staffPhone}>{ticket.assignedStaff.phone}</Text>
              </View>
              <TouchableOpacity
                style={styles.callBtn}
                onPress={() => Alert.alert('Calling Technician', `Dialing ${ticket.assignedStaff?.phone}...`)}
              >
                <Icon name="Phone" size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Resolution Proof & Staff Notes */}
        {ticket.resolutionNotes && (
          <View style={styles.card}>
            <Text style={styles.cardSectionHeader}>STAFF RESOLUTION REPORT</Text>
            <Text style={styles.notesText}>{ticket.resolutionNotes}</Text>

            {ticket.resolutionPhotoUrl && (
              <View style={styles.proofContainer}>
                <Image source={{ uri: ticket.resolutionPhotoUrl }} style={styles.proofImage} />
                <View style={styles.proofTag}>
                  <Icon name="CheckCircle2" size={11} color={colors.success} style={{ marginRight: 3 }} />
                  <Text style={styles.proofTagText}>Staff Resolution Photo Proof</Text>
                </View>
              </View>
            )}
          </View>
        )}

        {/* Post-Resolution Micro-Survey */}
        {ticket.status === 'RESOLVED' || ticket.status === 'VERIFIED_CLOSED' ? (
          <View style={styles.feedbackCard}>
            <Text style={styles.feedbackTitle}>Verified Resident Micro-Survey</Text>
            <Text style={styles.feedbackSub}>
              Your rating directly impacts this PG's Living Reputation Score on Stayra.
            </Text>

            <Text style={styles.ratingPrompt}>Rate resolution speed &amp; quality:</Text>
            <View style={styles.starPickerRow}>
              {[1, 2, 3, 4, 5].map((s) => (
                <TouchableOpacity
                  key={s}
                  onPress={() => !feedbackSubmitted && setSpeedRating(s)}
                  disabled={feedbackSubmitted}
                  style={styles.starTouch}
                >
                  <Icon
                    name="Star"
                    size={28}
                    color={s <= speedRating ? colors.amber : colors.border}
                  />
                </TouchableOpacity>
              ))}
            </View>

            {!feedbackSubmitted ? (
              <Button
                title="Verify Resolution &amp; Submit Rating"
                onPress={handleResolveAndVerify}
                size="md"
                iconRight="CheckCircle2"
                style={{ marginTop: spacing.md }}
              />
            ) : (
              <View style={styles.verifiedBox}>
                <Icon name="CheckCircle2" size={16} color={colors.success} style={{ marginRight: 6 }} />
                <Text style={styles.verifiedBoxText}>
                  Verified by Resident • 5.0 Rating Contributed
                </Text>
              </View>
            )}
          </View>
        ) : null}
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
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  ticketNum: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  title: {
    ...typography.heading3,
    color: colors.text,
    marginTop: 2,
  },
  desc: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: 21,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.surfaceSecondary,
    paddingTop: spacing.sm,
  },
  metaText: {
    fontSize: 10,
    color: colors.textMuted,
  },
  slaBannerCard: {
    backgroundColor: '#0F172A',
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  slaBannerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  slaBannerLabel: {
    color: '#93C5FD',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  creditBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginTop: spacing.xs,
  },
  creditBoxTitle: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.shieldEmerald,
  },
  creditBoxSub: {
    fontSize: 10,
    color: '#A7F3D0',
    lineHeight: 14,
    marginTop: 2,
  },
  cardSectionHeader: {
    ...typography.label,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  staffRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  staffAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  staffName: {
    ...typography.bodyBold,
    color: colors.text,
  },
  staffRole: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  staffPhone: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  callBtn: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notesText: {
    ...typography.bodySmall,
    color: colors.text,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  proofContainer: {
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  proofImage: {
    width: '100%',
    height: 180,
  },
  proofTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  proofTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  feedbackCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  feedbackTitle: {
    ...typography.heading3,
    color: colors.text,
    marginBottom: 2,
  },
  feedbackSub: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: 18,
  },
  ratingPrompt: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  starPickerRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  starTouch: {
    padding: 4,
  },
  verifiedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successLight,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    marginTop: spacing.sm,
  },
  verifiedBoxText: {
    ...typography.caption,
    color: colors.successDark,
    fontWeight: '700',
  },
});
