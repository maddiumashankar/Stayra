import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, borderRadius, spacing } from '../../theme/tokens';
import { Icon, IconName } from './Icon';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  iconLeft?: IconName;
  iconRight?: IconName;
  onPressRightIcon?: () => void;
  containerStyle?: ViewStyle;
  prefix?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  iconLeft,
  iconRight,
  onPressRightIcon,
  containerStyle,
  prefix,
  style,
  onFocus,
  onBlur,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          Boolean(error) && styles.inputContainerError,
        ]}
      >
        {iconLeft && (
          <Icon
            name={iconLeft}
            size={18}
            color={isFocused ? colors.primary : colors.textMuted}
            style={{ marginRight: spacing.sm }}
          />
        )}
        {prefix && <Text style={styles.prefix}>{prefix}</Text>}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={colors.textMuted}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          {...rest}
        />
        {iconRight && (
          <TouchableOpacity
            onPress={onPressRightIcon}
            disabled={!onPressRightIcon}
            style={{ padding: spacing.xs }}
          >
            <Icon
              name={iconRight}
              size={18}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    height: 48,
  },
  inputContainerFocused: {
    borderColor: colors.primary,
    backgroundColor: '#FFFFFF',
  },
  inputContainerError: {
    borderColor: colors.danger,
    backgroundColor: colors.dangerLight,
  },
  prefix: {
    ...typography.bodyBold,
    color: colors.text,
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.text,
    height: '100%',
  },
  errorText: {
    ...typography.caption,
    color: colors.danger,
    marginTop: spacing.xs,
  },
});
