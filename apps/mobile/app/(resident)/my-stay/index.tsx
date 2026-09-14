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
import { HeaderBar, Icon, Badge } from '../../../src/components/common';
import { useStayraStore } from '../../../src/stores/useStayraStore';
import { mockWeeklyFoodMenu } from '../../../src/data/mockData';

export default function MyStayScreen() {
  const router = useRouter();
  const { activeTenancy } = useStayraStore();
  const [copiedWifi, setCopiedWifi] = useState(false);

  const handleCopyWifi = () => {
    setCopiedWifi(true);
    setTimeout(() => setCopiedWifi(false), 2000);
  };

  const todayMenu = mockWeeklyFoodMenu[0]; // Monday

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBar title="My Stay" subtitle={activeTenancy.propertyName} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Active Tenancy Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <View>
              <Text style={styles.heroPropertyName}>{activeTenancy.propertyName}</Text>
              <Text style={styles.heroRoom}>
                Room {activeTenancy.roomNumber} • {activeTenancy.bedIdentifier}
              </Text>
            </View>
            <Badge label="ACTIVE TENANCY" variant="success" icon="ShieldCheck" size="sm" />
          </View>

          <View style={styles.heroDivider} />

          {/* WiFi & Digital Key Quick Access */}
          <View style={styles.quickAccessRow}>
            <View style={styles.wifiBlock}>
              <View style={styles.wifiHeader}>
                <Icon name="Wifi" size={16} color={colors.primary} style={{ marginRight: 6 }} />
                <Text style={styles.wifiLabel}>Room WiFi Credentials</Text>
              </View>
              <Text style={styles.wifiSsid}>SSID: {activeTenancy.wifiSsid}</Text>
              <View style={styles.passwordRow}>
                <Text style={styles.wifiPassword}>Key: {activeTenancy.wifiPassword}</Text>
                <TouchableOpacity onPress={handleCopyWifi} style={styles.copyBtn}>
                  <Icon
                    name={copiedWifi ? 'Check' : 'Copy'}
                    size={12}
                    color={copiedWifi ? colors.success : colors.primary}
                  />
                  <Text style={[styles.copyBtnText, copiedWifi && { color: colors.success }]}>
                    {copiedWifi ? 'Copied' : 'Copy'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.keyBlock}>
              <Icon name="KeyRound" size={24} color={colors.shieldEmerald} style={{ marginBottom: 4 }} />
              <Text style={styles.keyText}>Biometric Door</Text>
              <Badge label="Active 24/7" variant="success" size="sm" />
            </View>
          </View>
        </View>

        {/* Roommates Card */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Roommates (Room {activeTenancy.roomNumber})</Text>
            <Badge label="VERIFIED RESIDENTS" variant="info" size="sm" />
          </View>

          {activeTenancy.roommates.map((rm, idx) => (
            <View key={idx} style={styles.roommateCard}>
              <View style={styles.avatarCircle}>
                <Icon name="User" size={18} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.roommateName}>{rm.name}</Text>
                <Text style={styles.roommateWork}>{rm.workplace}</Text>
              </View>
              <Badge label={rm.bed} variant="neutral" size="sm" />
            </View>
          ))}
        </View>

        {/* Today's Dining / Food Schedule */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Food Menu ({todayMenu.day})</Text>
            <TouchableOpacity onPress={() => router.push(`/(resident)/pg/${activeTenancy.propertyId}` as any)}>
              <Text style={styles.linkText}>Weekly Menu</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.mealCard}>
            <View style={styles.mealHeader}>
              <Icon name="Utensils" size={16} color={colors.amber} style={{ marginRight: 6 }} />
              <Text style={styles.mealTitle}>Lunch ({todayMenu.lunch.time})</Text>
            </View>
            <Text style={styles.mealItem}>{todayMenu.lunch.item}</Text>
            <View style={styles.mealFooter}>
              <Badge label={todayMenu.lunch.isVeg ? 'VEG' : 'NON-VEG'} variant={todayMenu.lunch.isVeg ? 'success' : 'warning'} size="sm" />
              <Text style={styles.buffetText}>Dining Hall • Floor 4 Terrace</Text>
            </View>
          </View>

          <View style={styles.mealCard}>
            <View style={styles.mealHeader}>
              <Icon name="Coffee" size={16} color={colors.amber} style={{ marginRight: 6 }} />
              <Text style={styles.mealTitle}>Dinner ({todayMenu.dinner.time})</Text>
            </View>
            <Text style={styles.mealItem}>{todayMenu.dinner.item}</Text>
            <View style={styles.mealFooter}>
              <Badge label={todayMenu.dinner.isVeg ? 'VEG' : 'NON-VEG'} variant={todayMenu.dinner.isVeg ? 'success' : 'warning'} size="sm" />
              <Text style={styles.buffetText}>Dining Hall • Floor 4 Terrace</Text>
            </View>
          </View>
        </View>

        {/* Digital Tenancy Contract & Notice Period */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tenancy Agreement &amp; Move-Out</Text>

          <View style={styles.actionsCard}>
            <TouchableOpacity
              style={styles.actionRow}
              onPress={() => router.push('/(resident)/my-stay/agreement' as any)}
            >
              <View style={styles.actionIcon}>
                <Icon name="FileText" size={18} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.actionTitle}>Digital Tenancy Agreement</Text>
                <Text style={styles.actionSub}>Signed contract, terms, and billing rules</Text>
              </View>
              <Icon name="ChevronRight" size={18} color={colors.textMuted} />
            </TouchableOpacity>

            <View style={styles.actionDivider} />

            <TouchableOpacity
              style={styles.actionRow}
              onPress={() => router.push('/(resident)/my-stay/move-out' as any)}
            >
              <View style={[styles.actionIcon, { backgroundColor: colors.amberLight }]}>
                <Icon name="Calendar" size={18} color={colors.amberDark} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.actionTitle}>Serve 30-Day Move-Out Notice</Text>
                <Text style={styles.actionSub}>Transparent deposit refund &amp; settlement calculation</Text>
              </View>
              <Icon name="ChevronRight" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Noticeboard Announcements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Noticeboard</Text>

          <View style={styles.noticeCard}>
            <View style={styles.noticeHeader}>
              <Icon name="AlertCircle" size={16} color={colors.info} style={{ marginRight: 6 }} />
              <Text style={styles.noticeTitle}>Rooftop Water Tank Maintenance</Text>
            </View>
            <Text style={styles.noticeBody}>
              Routine quarterly deep cleaning of main storage tanks scheduled for Thursday 10:00 AM – 1:00 PM. Backup geyser supply available.
            </Text>
            <Text style={styles.noticeTime}>Posted 2 days ago by Property Ops</Text>
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
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heroPropertyName: {
    ...typography.heading2,
    color: colors.text,
  },
  heroRoom: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '700',
    marginTop: 2,
  },
  heroDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  quickAccessRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  wifiBlock: {
    flex: 2,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
  },
  wifiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  wifiLabel: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.text,
  },
  wifiSsid: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wifiPassword: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.text,
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.xs,
    gap: 3,
  },
  copyBtnText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  keyBlock: {
    flex: 1,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
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
  roommateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xs,
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  roommateName: {
    ...typography.bodyBold,
    color: colors.text,
  },
  roommateWork: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  mealCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xs,
  },
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  mealTitle: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.text,
  },
  mealItem: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  mealFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buffetText: {
    fontSize: 10,
    color: colors.textMuted,
  },
  actionsCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  actionTitle: {
    ...typography.bodyBold,
    color: colors.text,
  },
  actionSub: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  actionDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
  noticeCard: {
    backgroundColor: colors.infoLight,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: '#BAE6FD',
    padding: spacing.md,
  },
  noticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  noticeTitle: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.infoDark,
  },
  noticeBody: {
    ...typography.bodySmall,
    color: colors.text,
    lineHeight: 18,
    marginBottom: 4,
  },
  noticeTime: {
    fontSize: 10,
    color: colors.textMuted,
  },
});
