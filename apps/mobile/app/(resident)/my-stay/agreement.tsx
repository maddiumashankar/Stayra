import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../../src/theme/tokens';
import { HeaderBar, Badge, Button } from '../../../src/components/common';
import { useStayraStore } from '../../../src/stores/useStayraStore';

export default function TenancyAgreementScreen() {
  const { activeTenancy } = useStayraStore();

  const handleDownloadPdf = () => {
    Alert.alert('Agreement Downloaded', 'Official signed Tenancy Agreement PDF saved to device.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBar title="Digital Tenancy Contract" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Document Status Header */}
        <View style={styles.docHeader}>
          <View>
            <Text style={styles.docTitle}>Residential Tenancy Contract</Text>
            <Text style={styles.docHash}>Document Ref: STR-AGR-2026-084291</Text>
          </View>
          <Badge label="DIGITALLY SIGNED" variant="success" icon="ShieldCheck" size="sm" />
        </View>

        {/* Action Button: Download PDF */}
        <Button
          title="Download Immutable PDF"
          variant="outline"
          onPress={handleDownloadPdf}
          iconLeft="FileText"
          size="sm"
          style={{ marginBottom: spacing.md }}
        />

        {/* Agreement Text Paper Box */}
        <View style={styles.paperContainer}>
          <Text style={styles.legalHeader}>MODEL TENANCY DIGITAL CONTRACT</Text>
          <Text style={styles.effectiveDate}>
            Effective Date: {activeTenancy.startDate} • Expiry: {activeTenancy.endDate}
          </Text>

          <View style={styles.clauseSection}>
            <Text style={styles.clauseTitle}>PARTIES TO THE AGREEMENT</Text>
            <Text style={styles.clauseText}>
              <Text style={styles.bold}>Owner (Lessor):</Text> Stayra Prime Accommodations Pvt Ltd, represented by Property Operations Bangalore.
            </Text>
            <Text style={styles.clauseText}>
              <Text style={styles.bold}>Resident (Lessee):</Text> {activeTenancy.residentName} (Resident ID: {activeTenancy.stayraResidentId}).
            </Text>
          </View>

          <View style={styles.clauseSection}>
            <Text style={styles.clauseTitle}>1. ALLOCATED ACCOMMODATION</Text>
            <Text style={styles.clauseText}>
              The Owner allocates to the Resident {activeTenancy.bedIdentifier} in Room {activeTenancy.roomNumber} at {activeTenancy.propertyAddress}.
            </Text>
          </View>

          <View style={styles.clauseSection}>
            <Text style={styles.clauseTitle}>2. FINANCIAL LEDGER &amp; RENT OBLIGATIONS</Text>
            <Text style={styles.clauseText}>
              Monthly base rent is agreed at <Text style={styles.bold}>₹{activeTenancy.agreedRent.toLocaleString('en-IN')}</Text> payable on or before the 5th of each calendar month.
            </Text>
            <Text style={styles.clauseText}>
              Metered utility charges (electricity sub-meter) shall be billed at actual unit consumption with photographic reading proof provided in the monthly invoice.
            </Text>
          </View>

          <View style={styles.clauseSection}>
            <Text style={styles.clauseTitle}>3. DETERMINISTIC SERVICE COMPENSATION</Text>
            <Text style={styles.clauseText}>
              The Owner commits to the Stayra Living SLA Matrix. If internet, air conditioning, or water supply outages exceed published resolution thresholds, deterministic daily compensation credits will automatically be deducted from the Resident's monthly ledger balance.
            </Text>
          </View>

          <View style={styles.clauseSection}>
            <Text style={styles.clauseTitle}>4. SECURITY DEPOSIT &amp; NOTICE PERIOD</Text>
            <Text style={styles.clauseText}>
              The Resident has deposited <Text style={styles.bold}>₹{activeTenancy.agreedDeposit.toLocaleString('en-IN')}</Text> as interest-free refundable security deposit held in Stayra Escrow. Either party may terminate tenancy by serving a 30-day notice via the Stayra application.
            </Text>
          </View>

          {/* Signatures */}
          <View style={styles.signaturesRow}>
            <View style={styles.sigBox}>
              <Text style={styles.sigLabel}>DIGITALLY SIGNED BY RESIDENT</Text>
              <Text style={styles.sigName}>{activeTenancy.residentName}</Text>
              <Text style={styles.sigHash}>Verified OTP: 2026-06-15 14:22 UTC</Text>
            </View>

            <View style={styles.sigBox}>
              <Text style={styles.sigLabel}>DIGITALLY SIGNED BY OWNER</Text>
              <Text style={styles.sigName}>Stayra Prime Ops</Text>
              <Text style={styles.sigHash}>Verified Digital Key: STR-OWN-001</Text>
            </View>
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
  docHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  docTitle: {
    ...typography.heading3,
    color: colors.text,
  },
  docHash: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  paperContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  legalHeader: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 4,
  },
  effectiveDate: {
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  clauseSection: {
    marginBottom: spacing.md,
  },
  clauseTitle: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  clauseText: {
    ...typography.bodySmall,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 4,
  },
  bold: {
    fontWeight: '700',
  },
  signaturesRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
    marginTop: spacing.sm,
  },
  sigBox: {
    flex: 1,
    backgroundColor: colors.surfaceSecondary,
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  sigLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.textMuted,
    marginBottom: 4,
  },
  sigName: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.text,
  },
  sigHash: {
    fontSize: 9,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
