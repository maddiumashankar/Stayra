import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '../../src/theme/tokens';
import { Button, Icon } from '../../src/components/common';

export default function OtpScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const phone = (params.phone as string) || '9876543210';

  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const [timer, setTimer] = useState(28);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleVerify = () => {
    const fullCode = otp.join('');
    if (fullCode.length < 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      router.push('/(auth)/select-role' as any);
    }, 600);
  };

  const handleDigitChange = (index: number, val: string) => {
    if (val.length > 1) {
      val = val.slice(-1);
    }
    const updated = [...otp];
    updated[index] = val;
    setOtp(updated);
    if (error) setError('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Icon name="ChevronLeft" size={24} color={colors.text} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Verify Phone</Text>
          <Text style={styles.subtitle}>
            Enter the 6-digit verification code sent to{' '}
            <Text style={styles.phoneBold}>+91 {phone}</Text>
          </Text>
        </View>

        {/* 6 Digit OTP Input Boxes */}
        <View style={styles.otpRow}>
          {otp.map((digit, idx) => (
            <View
              key={idx}
              style={[
                styles.otpBox,
                digit.length > 0 && styles.otpBoxFilled,
                Boolean(error) && styles.otpBoxError,
              ]}
            >
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(val) => handleDigitChange(idx, val)}
                selectTextOnFocus
              />
            </View>
          ))}
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Resend & Timer */}
        <View style={styles.timerRow}>
          {timer > 0 ? (
            <Text style={styles.timerText}>
              Resend code in <Text style={styles.timerBold}>{timer}s</Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={() => setTimer(30)}>
              <Text style={styles.resendAction}>Resend OTP SMS</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Verify Button */}
        <Button
          title="Verify & Continue"
          onPress={handleVerify}
          loading={loading}
          size="lg"
          style={{ marginBottom: spacing.md }}
        />

        {/* Test Autofill Shortcut */}
        <TouchableOpacity
          style={styles.shortcutBtn}
          onPress={() => {
            setOtp(['1', '2', '3', '4', '5', '6']);
            setError('');
          }}
        >
          <Icon name="Sparkles" size={14} color={colors.primary} style={{ marginRight: 6 }} />
          <Text style={styles.shortcutText}>Autofill Test OTP (123456)</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.heading1,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  phoneBold: {
    fontWeight: '700',
    color: colors.text,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  otpBox: {
    flex: 1,
    height: 56,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  otpBoxFilled: {
    borderColor: colors.primary,
    backgroundColor: '#FFFFFF',
  },
  otpBoxError: {
    borderColor: colors.danger,
    backgroundColor: colors.dangerLight,
  },
  otpText: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    width: '100%',
  },
  errorText: {
    ...typography.caption,
    color: colors.danger,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  timerRow: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  timerText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  timerBold: {
    fontWeight: '700',
    color: colors.text,
  },
  resendAction: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.primary,
  },
  shortcutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
  },
  shortcutText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.primary,
  },
});
