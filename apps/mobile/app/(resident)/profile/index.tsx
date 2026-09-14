import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '../../../src/theme/tokens';
import { HeaderBar, Icon, Badge, Button } from '../../../src/components/common';
import { useStayraStore } from '../../../src/stores/useStayraStore';

export default function ProfileScreen() {
  const router = useRouter();
  const { activeTenancy, setRole } = useStayraStore();

  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [slaAlertsEnabled, setSlaAlertsEnabled] = useState(true);

  const handleSwitchToOwner = () => {
    setRole('OWNER');
    router.replace('/(owner)');
  };

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out of Stayra?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: () => router.replace('/(auth)/login' as any) },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBar title="Resident Profile" subtitle="Stayra Universal Identity" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Digital Stayra Resident ID Pass */}
        <View style={styles.idPassCard}>
          <View style={styles.idPassHeader}>
            <View style={styles.idPassHeaderLeft}>
              <View style={styles.passIconCircle}>
                <Icon name="ShieldCheck" size={20} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.idPassTitle}>STAYRA RESIDENT ID</Text>
                <Text style={styles.idNumber}>{activeTenancy.stayraResidentId}</Text>
              </View>
            </View>
            <Badge label="VERIFIED" variant="success" size="sm" />
          </View>

          <View style={styles.idPassBody}>
            <Text style={styles.residentName}>{activeTenancy.residentName}</Text>
            <Text style={styles.residentEmail}>{activeTenancy.residentEmail} • {activeTenancy.residentPhone}</Text>

            <View style={styles.idStatsRow}>
              <View style={styles.idStatItem}>
                <View style={styles.starRow}>
                  <Icon name="Star" size={14} color={colors.amber} style={{ marginRight: 3 }} />
                  <Text style={styles.idStatNum}>{activeTenancy.lifetimeRating.toFixed(2)}</Text>
                </View>
                <Text style={styles.idStatLabel}>Lifetime Rating</Text>
              </View>

              <View style={styles.idStatDivider} />

              <View style={styles.idStatItem}>
                <Text style={styles.idStatNum}>100%</Text>
                <Text style={styles.idStatLabel}>On-Time Rent Payer</Text>
              </View>

              <View style={styles.idStatDivider} />

              <View style={styles.idStatItem}>
                <Text style={styles.idStatNum}>0</Text>
                <Text style={styles.idStatLabel}>Lease Disputes</Text>
              </View>
            </View>
          </View>

          {/* QR Code Simulation */}
          <View style={styles.qrSection}>
            <View style={styles.qrPlaceholder}>
              <Icon name="QrCode" size={32} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.qrTitle}>Check-In &amp; Biometric Access</Text>
              <Text style={styles.qrSub}>
                Scan at any Stayra-verified property for instant keyless access.
              </Text>
            </View>
          </View>

          {/* Privacy Shield Note */}
          <View style={styles.privacyShieldNote}>
            <Icon name="Lock" size={13} color="#93C5FD" style={{ marginRight: 4 }} />
            <Text style={styles.privacyText}>
              Privacy Boundary Protected: Your profile persists across PGs without sharing private chat logs.
            </Text>
          </View>
        </View>

        {/* Switch to PG Owner Portal CTA */}
        <TouchableOpacity
          style={styles.ownerSwitchBanner}
          onPress={handleSwitchToOwner}
          activeOpacity={0.88}
        >
          <View style={styles.ownerSwitchIcon}>
            <Icon name="Building2" size={22} color="#FFFFFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.ownerSwitchTitle}>Switch to PG Owner Portal</Text>
            <Text style={styles.ownerSwitchSub}>
              Manage occupancy, bed allocation grids, and maintenance staff
            </Text>
          </View>
          <Icon name="ChevronRight" size={20} color={colors.primary} />
        </TouchableOpacity>

        {/* Personal & KYC Info Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Identity &amp; Tenancy Documents</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Aadhaar Card (Govt ID)</Text>
            <Badge label="VERIFIED" variant="success" size="sm" icon="CheckCircle2" />
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Employment / Student ID</Text>
            <Text style={styles.infoVal}>Swiggy Engineering</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Emergency Contact</Text>
            <Text style={styles.infoVal}>Rajesh Verma (+91 94480 12345)</Text>
          </View>
        </View>

        {/* Preferences & Living Style */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Living Preferences</Text>

          <View style={styles.prefTagsRow}>
            <View style={styles.prefTag}>
              <Text style={styles.prefTagText}>Night Owl (Works Late)</Text>
            </View>
            <View style={styles.prefTag}>
              <Text style={styles.prefTagText}>Non-Vegetarian</Text>
            </View>
            <View style={styles.prefTag}>
              <Text style={styles.prefTagText}>Silent Study Hours</Text>
            </View>
            <View style={styles.prefTag}>
              <Text style={styles.prefTagText}>Non-Smoker</Text>
            </View>
          </View>
        </View>

        {/* Security & Notification Settings */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Security &amp; Notifications</Text>

          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingTitle}>Biometric App Lock</Text>
              <Text style={styles.settingSub}>Face ID / Fingerprint required to open</Text>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingTitle}>Rent &amp; SLA Compensation Alerts</Text>
              <Text style={styles.settingSub}>Immediate notifications when SLA breach credit applies</Text>
            </View>
            <Switch
              value={slaAlertsEnabled}
              onValueChange={setSlaAlertsEnabled}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>
        </View>

        {/* Sign Out Button */}
        <Button
          title="Sign Out of Stayra"
          variant="danger"
          onPress={handleLogout}
          iconLeft="LogOut"
          size="lg"
          style={{ marginTop: spacing.xs, marginBottom: spacing.xl }}
        />
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
  idPassCard: {
    backgroundColor: '#0F172A',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.lg,
  },
  idPassHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    paddingBottom: spacing.sm,
    marginBottom: spacing.sm,
  },
  idPassHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(30, 91, 240, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  idPassTitle: {
    color: '#93C5FD',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  idNumber: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 1,
  },
  idPassBody: {
    marginBottom: spacing.md,
  },
  residentName: {
    ...typography.heading1,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  residentEmail: {
    fontSize: 11,
    color: '#94A3B8',
    marginBottom: spacing.md,
  },
  idStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: spacing.sm,
    borderRadius: borderRadius.md,
  },
  idStatItem: {
    alignItems: 'center',
    flex: 1,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  idStatNum: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  idStatLabel: {
    fontSize: 9,
    color: '#94A3B8',
    marginTop: 2,
    fontWeight: '600',
  },
  idStatDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#334155',
  },
  qrSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 91, 240, 0.1)',
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  qrPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  qrTitle: {
    ...typography.caption,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  qrSub: {
    fontSize: 10,
    color: '#94A3B8',
    lineHeight: 14,
    marginTop: 1,
  },
  privacyShieldNote: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  privacyText: {
    fontSize: 10,
    color: '#94A3B8',
    flex: 1,
    lineHeight: 14,
  },
  ownerSwitchBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
    borderColor: colors.primary,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  ownerSwitchIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  ownerSwitchTitle: {
    ...typography.bodyBold,
    color: colors.text,
  },
  ownerSwitchSub: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 15,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  cardTitle: {
    ...typography.heading3,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceSecondary,
  },
  infoLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  infoVal: {
    ...typography.bodySmall,
    fontWeight: '700',
    color: colors.text,
  },
  prefTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  prefTag: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
    borderRadius: borderRadius.full,
  },
  prefTagText: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '600',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  settingTitle: {
    ...typography.bodyBold,
    color: colors.text,
  },
  settingSub: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
});
