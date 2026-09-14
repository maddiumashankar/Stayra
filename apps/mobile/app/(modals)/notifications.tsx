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
import { Icon, Badge } from '../../src/components/common';
import { useStayraStore } from '../../src/stores/useStayraStore';

export default function NotificationsModal() {
  const router = useRouter();
  const { clearNotifications, unreadNotificationsCount } = useStayraStore();

  const notifications = [
    {
      id: 'n1',
      title: '₹100 Rent Credit Applied to Ledger',
      message: 'Ticket #TKT-00392 (WiFi downtime) exceeded 24h SLA by 4h. The ₹100 credit has been deducted from your September bill.',
      time: '2 hours ago',
      type: 'SLA_CREDIT',
      unread: true,
    },
    {
      id: 'n2',
      title: 'September 2026 Rent Bill Issued',
      message: 'Invoice #INV-2026-09-0012 for ₹13,400 has been published. Due on 5th Oct 2026 via UPI.',
      time: '1 day ago',
      type: 'BILL',
      unread: true,
    },
    {
      id: 'n3',
      title: 'Water Tank Deep Cleaning Notice',
      message: 'Routine maintenance scheduled for Thursday 10:00 AM – 1:00 PM at Stayra Prime.',
      time: '2 days ago',
      type: 'ANNOUNCEMENT',
      unread: false,
    },
    {
      id: 'n4',
      title: 'Stayra Resident ID Synced',
      message: 'Your universal profile (STR-RES-202609-0842) KYC status is active and verified.',
      time: '5 days ago',
      type: 'IDENTITY',
      unread: false,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Notifications</Text>
          {unreadNotificationsCount > 0 && (
            <Badge label={`${unreadNotificationsCount} NEW`} variant="brand" size="sm" />
          )}
        </View>

        <View style={styles.headerRight}>
          {unreadNotificationsCount > 0 && (
            <TouchableOpacity onPress={clearNotifications} style={styles.markReadBtn}>
              <Text style={styles.markReadText}>Mark all as read</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
            <Icon name="X" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {notifications.map((item) => (
          <View
            key={item.id}
            style={[styles.notificationCard, item.unread && styles.notificationCardUnread]}
          >
            <View
              style={[
                styles.iconCircle,
                item.type === 'SLA_CREDIT' && { backgroundColor: colors.successLight },
                item.type === 'BILL' && { backgroundColor: colors.primaryLight },
                item.type === 'ANNOUNCEMENT' && { backgroundColor: colors.infoLight },
              ]}
            >
              <Icon
                name={
                  item.type === 'SLA_CREDIT'
                    ? 'ShieldCheck'
                    : item.type === 'BILL'
                    ? 'Receipt'
                    : item.type === 'ANNOUNCEMENT'
                    ? 'AlertCircle'
                    : 'CheckCircle2'
                }
                size={18}
                color={
                  item.type === 'SLA_CREDIT'
                    ? colors.shieldEmerald
                    : item.type === 'BILL'
                    ? colors.primary
                    : colors.infoDark
                }
              />
            </View>

            <View style={{ flex: 1 }}>
              <View style={styles.cardTop}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                {item.unread && <View style={styles.unreadDot} />}
              </View>
              <Text style={styles.cardMessage}>{item.message}</Text>
              <Text style={styles.cardTime}>{item.time}</Text>
            </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  title: {
    ...typography.heading2,
    color: colors.text,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  markReadBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  markReadText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
  },
  closeBtn: {
    padding: spacing.xs,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xs,
    ...shadows.sm,
  },
  notificationCardUnread: {
    borderColor: colors.primary,
    backgroundColor: '#FFFFFF',
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  cardTitle: {
    ...typography.bodyBold,
    color: colors.text,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginLeft: spacing.xs,
  },
  cardMessage: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 16,
    marginBottom: 4,
  },
  cardTime: {
    fontSize: 10,
    color: colors.textMuted,
  },
});
