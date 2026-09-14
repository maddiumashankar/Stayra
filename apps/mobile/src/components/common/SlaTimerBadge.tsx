import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, borderRadius } from '../../theme/tokens';
import { Icon } from './Icon';

interface SlaTimerBadgeProps {
  targetTime: string;
  isBreached: boolean;
  compensationCredit?: number;
  status?: string;
  style?: ViewStyle;
}

export const SlaTimerBadge: React.FC<SlaTimerBadgeProps> = ({
  targetTime,
  isBreached,
  compensationCredit,
  status,
  style,
}) => {
  if (status === 'RESOLVED' || status === 'VERIFIED_CLOSED') {
    return (
      <View style={[styles.container, styles.resolvedContainer, style]}>
        <Icon name="CheckCircle2" size={13} color={colors.success} style={{ marginRight: 4 }} />
        <Text style={[styles.text, styles.resolvedText]}>Resolved</Text>
      </View>
    );
  }

  if (isBreached) {
    return (
      <View style={[styles.container, styles.breachedContainer, style]}>
        <Icon name="AlertTriangle" size={13} color={colors.danger} style={{ marginRight: 4 }} />
        <Text style={[styles.text, styles.breachedText]}>
          SLA Breached {compensationCredit ? `(₹${compensationCredit} Credit Active)` : ''}
        </Text>
      </View>
    );
  }

  // Calculate remaining time
  const target = new Date(targetTime).getTime();
  const now = new Date().getTime();
  const diffMs = target - now;

  if (diffMs <= 0) {
    return (
      <View style={[styles.container, styles.breachedContainer, style]}>
        <Icon name="AlertTriangle" size={13} color={colors.danger} style={{ marginRight: 4 }} />
        <Text style={[styles.text, styles.breachedText]}>SLA Breached</Text>
      </View>
    );
  }

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const isUrgent = hours < 2;

  return (
    <View
      style={[
        styles.container,
        isUrgent ? styles.urgentContainer : styles.activeContainer,
        style,
      ]}
    >
      <Icon
        name="Clock"
        size={13}
        color={isUrgent ? colors.amberDark : colors.primary}
        style={{ marginRight: 4 }}
      />
      <Text
        style={[
          styles.text,
          isUrgent ? styles.urgentText : styles.activeText,
        ]}
      >
        {hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`} remaining
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
  },
  text: {
    ...typography.caption,
    fontWeight: '700',
    fontSize: 11,
  },
  activeContainer: {
    backgroundColor: colors.primaryLight,
  },
  activeText: {
    color: colors.primary,
  },
  urgentContainer: {
    backgroundColor: colors.amberLight,
  },
  urgentText: {
    color: colors.amberDark,
  },
  breachedContainer: {
    backgroundColor: colors.dangerLight,
  },
  breachedText: {
    color: colors.dangerDark,
  },
  resolvedContainer: {
    backgroundColor: colors.successLight,
  },
  resolvedText: {
    color: colors.successDark,
  },
});
