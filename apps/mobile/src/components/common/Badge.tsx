import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, borderRadius, spacing } from '../../theme/tokens';
import { Icon, IconName } from './Icon';

export type BadgeVariant = 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  icon?: IconName;
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'neutral',
  icon,
  size = 'md',
  style,
}) => {
  const getColors = () => {
    switch (variant) {
      case 'brand':
        return { bg: colors.primaryLight, text: colors.primary, iconColor: colors.primary };
      case 'success':
        return { bg: colors.successLight, text: colors.successDark, iconColor: colors.success };
      case 'warning':
        return { bg: colors.amberLight, text: colors.amberDark, iconColor: colors.amber };
      case 'danger':
        return { bg: colors.dangerLight, text: colors.dangerDark, iconColor: colors.danger };
      case 'info':
        return { bg: colors.infoLight, text: colors.infoDark, iconColor: colors.info };
      case 'neutral':
      default:
        return { bg: colors.surfaceSecondary, text: colors.textSecondary, iconColor: colors.textSecondary };
    }
  };

  const { bg, text, iconColor } = getColors();
  const isSm = size === 'sm';

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: bg },
        isSm ? styles.badgeSm : styles.badgeMd,
        style,
      ]}
    >
      {icon && (
        <Icon
          name={icon}
          size={isSm ? 12 : 14}
          color={iconColor}
          style={{ marginRight: spacing.xs }}
        />
      )}
      <Text
        style={[
          styles.text,
          { color: text },
          isSm ? styles.textSm : styles.textMd,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
  },
  badgeSm: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeMd: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  text: {
    fontWeight: '700',
  },
  textSm: {
    fontSize: 10,
    lineHeight: 13,
  },
  textMd: {
    fontSize: 12,
    lineHeight: 16,
  },
});
