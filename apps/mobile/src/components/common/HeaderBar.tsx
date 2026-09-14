import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, spacing, borderRadius } from '../../theme/tokens';
import { Icon } from './Icon';
import { useStayraStore } from '../../stores/useStayraStore';

interface HeaderBarProps {
  title?: string;
  subtitle?: string;
  showLocation?: boolean;
  showBack?: boolean;
  onPressBack?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  title,
  subtitle,
  showLocation = false,
  showBack = false,
  onPressBack,
}) => {
  const router = useRouter();
  const { currentRole, setRole, unreadNotificationsCount, filters } = useStayraStore();

  const toggleRole = () => {
    if (currentRole === 'RESIDENT') {
      setRole('OWNER');
      router.replace('/(owner)');
    } else {
      setRole('RESIDENT');
      router.replace('/(resident)');
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.leftRow}>
        {showBack ? (
          <TouchableOpacity
            onPress={onPressBack || (() => router.back())}
            style={styles.backButton}
          >
            <Icon name="ChevronLeft" size={22} color={colors.text} />
          </TouchableOpacity>
        ) : (
          <View style={styles.brandRow}>
            <Image
              source={require('../../../assets/stayra-logo.png')}
              style={styles.logoImage}
            />
            <View>
              <Text style={styles.brandName}>Stayra</Text>
              {showLocation ? (
                <View style={styles.locationPill}>
                  <Icon name="MapPin" size={11} color={colors.primary} style={{ marginRight: 2 }} />
                  <Text style={styles.locationText}>
                    {filters.city} • {filters.neighborhood === 'All Neighborhoods' ? 'Top Areas' : filters.neighborhood}
                  </Text>
                </View>
              ) : subtitle ? (
                <Text style={styles.subtitleText}>{subtitle}</Text>
              ) : null}
            </View>
          </View>
        )}

        {title && showBack && (
          <View style={styles.titleWrapper}>
            <Text style={styles.screenTitle} numberOfLines={1}>
              {title}
            </Text>
            {subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
          </View>
        )}
      </View>

      <View style={styles.actionsRow}>
        {/* Role Switcher Pill */}
        <TouchableOpacity style={styles.rolePill} onPress={toggleRole} activeOpacity={0.8}>
          <Icon
            name={currentRole === 'RESIDENT' ? 'Building2' : 'Home'}
            size={13}
            color={colors.primary}
            style={{ marginRight: 4 }}
          />
          <Text style={styles.roleText}>
            {currentRole === 'RESIDENT' ? 'Owner Mode' : 'Resident Mode'}
          </Text>
        </TouchableOpacity>

        {/* AI Copilot Button */}
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => router.push('/(modals)/ai-assistant' as any)}
          activeOpacity={0.7}
        >
          <Icon name="Sparkles" size={18} color={colors.primary} />
        </TouchableOpacity>

        {/* Notifications Button */}
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => router.push('/(modals)/notifications' as any)}
          activeOpacity={0.7}
        >
          <Icon name="Bell" size={18} color={colors.text} />
          {unreadNotificationsCount > 0 && (
            <View style={styles.notifBadge}>
              <Text style={styles.notifBadgeText}>{unreadNotificationsCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    padding: spacing.xs,
    marginRight: spacing.sm,
  },
  titleWrapper: {
    flex: 1,
  },
  screenTitle: {
    ...typography.heading3,
    color: colors.text,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 32,
    height: 32,
    borderRadius: 8,
    marginRight: spacing.sm,
  },
  brandName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  locationText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  subtitleText: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 11,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  rolePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: borderRadius.full,
  },
  roleText: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
