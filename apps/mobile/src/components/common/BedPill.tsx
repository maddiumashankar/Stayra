import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Bed } from '../../data/mockData';
import { colors, typography, borderRadius, spacing } from '../../theme/tokens';
import { Icon } from './Icon';

interface BedPillProps {
  bed: Bed;
  isSelected?: boolean;
  onPress?: () => void;
  showTenantName?: boolean;
}

export const BedPill: React.FC<BedPillProps> = ({
  bed,
  isSelected = false,
  onPress,
  showTenantName = false,
}) => {
  const getStatusStyles = () => {
    switch (bed.status) {
      case 'VACANT':
        return {
          bg: colors.successLight,
          border: colors.success,
          text: colors.successDark,
          label: 'Vacant',
          icon: 'Check' as const,
        };
      case 'OCCUPIED':
        return {
          bg: colors.primaryLight,
          border: colors.primary,
          text: colors.primary,
          label: 'Occupied',
          icon: 'User' as const,
        };
      case 'RESERVED':
        return {
          bg: colors.amberLight,
          border: colors.amber,
          text: colors.amberDark,
          label: 'Reserved',
          icon: 'Clock' as const,
        };
      case 'MAINTENANCE':
      default:
        return {
          bg: colors.surfaceTertiary,
          border: colors.borderStrong,
          text: colors.textSecondary,
          label: 'Repair',
          icon: 'Wrench' as const,
        };
    }
  };

  const statusStyle = getStatusStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={!onPress}
      style={[
        styles.container,
        {
          backgroundColor: isSelected ? colors.primary : statusStyle.bg,
          borderColor: isSelected ? colors.primaryHover : statusStyle.border,
        },
      ]}
    >
      <View style={styles.headerRow}>
        <Icon
          name="Bed"
          size={14}
          color={isSelected ? '#FFFFFF' : statusStyle.text}
          style={{ marginRight: 4 }}
        />
        <Text
          style={[
            styles.bedName,
            { color: isSelected ? '#FFFFFF' : colors.text },
          ]}
        >
          {bed.bedIdentifier}
        </Text>
      </View>

      <View style={styles.statusRow}>
        <View
          style={[
            styles.dot,
            { backgroundColor: isSelected ? '#FFFFFF' : statusStyle.border },
          ]}
        />
        <Text
          style={[
            styles.statusLabel,
            { color: isSelected ? '#FFFFFF' : statusStyle.text },
          ]}
        >
          {statusStyle.label}
        </Text>
      </View>

      {showTenantName && bed.tenant && (
        <Text
          style={[
            styles.tenantText,
            { color: isSelected ? '#FFFFFF' : colors.textSecondary },
          ]}
          numberOfLines={1}
        >
          {bed.tenant.name}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    minWidth: 100,
    marginBottom: spacing.xs,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  bedName: {
    ...typography.caption,
    fontWeight: '700',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  statusLabel: {
    fontSize: 10,
    fontWeight: '600',
  },
  tenantText: {
    fontSize: 10,
    marginTop: 2,
  },
});
