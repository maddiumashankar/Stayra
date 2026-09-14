import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme/tokens';
import { Icon, IconName } from './Icon';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
  isPositiveTrend?: boolean;
  icon?: IconName;
  iconColor?: string;
  style?: ViewStyle;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtitle,
  trend,
  isPositiveTrend = true,
  icon,
  iconColor = colors.primary,
  style,
}) => {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.topRow}>
        <Text style={styles.label}>{label}</Text>
        {icon && (
          <View style={[styles.iconBox, { backgroundColor: `${iconColor}15` }]}>
            <Icon name={icon} size={16} color={iconColor} />
          </View>
        )}
      </View>

      <Text style={styles.value}>{value}</Text>

      {(trend || subtitle) && (
        <View style={styles.bottomRow}>
          {trend && (
            <View style={styles.trendRow}>
              <Icon
                name={isPositiveTrend ? 'TrendingUp' : 'TrendingDown'}
                size={12}
                color={isPositiveTrend ? colors.success : colors.danger}
                style={{ marginRight: 2 }}
              />
              <Text
                style={[
                  styles.trendText,
                  { color: isPositiveTrend ? colors.success : colors.danger },
                ]}
              >
                {trend}
              </Text>
            </View>
          )}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  iconBox: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    ...typography.metric,
    color: colors.text,
    marginBottom: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendText: {
    ...typography.caption,
    fontWeight: '700',
    fontSize: 11,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 11,
  },
});
