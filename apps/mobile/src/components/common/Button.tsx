import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { colors, typography, borderRadius, spacing, shadows } from '../../theme/tokens';
import { Icon, IconName } from './Icon';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'accent';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: IconName;
  iconRight?: IconName;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const getVariantStyles = (): { btn: ViewStyle; text: TextStyle; iconColor: string } => {
    switch (variant) {
      case 'secondary':
        return {
          btn: { backgroundColor: colors.surfaceSecondary, borderWidth: 1, borderColor: colors.border },
          text: { color: colors.text },
          iconColor: colors.text,
        };
      case 'outline':
        return {
          btn: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.primary },
          text: { color: colors.primary },
          iconColor: colors.primary,
        };
      case 'ghost':
        return {
          btn: { backgroundColor: 'transparent' },
          text: { color: colors.textSecondary },
          iconColor: colors.textSecondary,
        };
      case 'danger':
        return {
          btn: { backgroundColor: colors.danger },
          text: { color: '#FFFFFF' },
          iconColor: '#FFFFFF',
        };
      case 'accent':
        return {
          btn: { backgroundColor: colors.shieldEmerald },
          text: { color: '#FFFFFF' },
          iconColor: '#FFFFFF',
        };
      case 'primary':
      default:
        return {
          btn: { backgroundColor: colors.primary, ...shadows.primaryGlow },
          text: { color: '#FFFFFF' },
          iconColor: '#FFFFFF',
        };
    }
  };

  const getSizeStyles = (): { btn: ViewStyle; text: TextStyle; iconSize: number } => {
    switch (size) {
      case 'sm':
        return {
          btn: { height: 36, paddingHorizontal: spacing.sm, borderRadius: borderRadius.sm },
          text: { ...typography.caption, fontWeight: '700' },
          iconSize: 14,
        };
      case 'lg':
        return {
          btn: { height: 54, paddingHorizontal: spacing.xl, borderRadius: borderRadius.md },
          text: { ...typography.button, fontSize: 16 },
          iconSize: 20,
        };
      case 'md':
      default:
        return {
          btn: { height: 46, paddingHorizontal: spacing.md, borderRadius: borderRadius.md },
          text: { ...typography.button },
          iconSize: 18,
        };
    }
  };

  const vStyle = getVariantStyles();
  const sStyle = getSizeStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.78}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.baseButton,
        vStyle.btn,
        sStyle.btn,
        disabled && styles.disabledButton,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={vStyle.text.color} />
      ) : (
        <View style={styles.contentRow}>
          {iconLeft && (
            <Icon
              name={iconLeft}
              size={sStyle.iconSize}
              color={disabled ? colors.textMuted : vStyle.iconColor}
              style={{ marginRight: spacing.xs }}
            />
          )}
          <Text
            style={[
              sStyle.text,
              vStyle.text,
              disabled && styles.disabledText,
              textStyle,
            ]}
          >
            {title}
          </Text>
          {iconRight && (
            <Icon
              name={iconRight}
              size={sStyle.iconSize}
              color={disabled ? colors.textMuted : vStyle.iconColor}
              style={{ marginLeft: spacing.xs }}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: colors.surfaceTertiary,
    borderColor: colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  disabledText: {
    color: colors.textMuted,
  },
});
