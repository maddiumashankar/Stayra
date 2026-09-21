import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '../../src/theme/tokens';
import { Input, Button, Icon } from '../../src/components/common';
import { useStayraStore } from '../../src/stores/useStayraStore';
import { authApi } from '../../src/services/auth.api';

export default function SignUpScreen() {
  const [role, setRoleState] = useState<'RESIDENT' | 'OWNER'>('RESIDENT');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { setRole, login } = useStayraStore();

  const handleSignUp = async () => {
    // Validation
    if (!fullName.trim() || fullName.trim().length < 2) {
      setError('Please enter your full name (at least 2 characters)');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await authApi.signUp({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phoneNumber: `+91${cleanPhone}`,
        password,
        role,
      });

      setRole(response.user.role === 'OWNER' ? 'OWNER' : 'RESIDENT');
      login(response.user);

      if (response.user.role === 'OWNER') {
        router.replace('/(owner)');
      } else {
        router.replace('/(resident)');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header & Brand */}
          <View style={styles.header}>
            <Image
              source={require('../../assets/stayra-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Create Your Account</Text>
            <Text style={styles.subtitle}>
              Join Stayra for fair rent, verified co-living, and automated SLA rent protection.
            </Text>
          </View>

          {/* Role Selection Segmented Pill */}
          <View style={styles.roleCard}>
            <Text style={styles.roleLabel}>I AM JOINING AS A</Text>
            <View style={styles.roleToggleRow}>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  role === 'RESIDENT' && styles.roleButtonActive,
                ]}
                onPress={() => {
                  setRoleState('RESIDENT');
                  if (error) setError('');
                }}
                activeOpacity={0.8}
              >
                <Icon
                  name="Home"
                  size={16}
                  color={role === 'RESIDENT' ? colors.primary : colors.textMuted}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={[
                    styles.roleButtonText,
                    role === 'RESIDENT' && styles.roleButtonTextActive,
                  ]}
                >
                  Resident / Tenant
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.roleButton,
                  role === 'OWNER' && styles.roleButtonActive,
                ]}
                onPress={() => {
                  setRoleState('OWNER');
                  if (error) setError('');
                }}
                activeOpacity={0.8}
              >
                <Icon
                  name="Building2"
                  size={16}
                  color={role === 'OWNER' ? colors.primary : colors.textMuted}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={[
                    styles.roleButtonText,
                    role === 'OWNER' && styles.roleButtonTextActive,
                  ]}
                >
                  PG Owner / Operator
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Card */}
          <View style={styles.card}>
            {error ? (
              <View style={styles.errorBanner}>
                <Icon name="AlertCircle" size={16} color={colors.danger} style={{ marginRight: 8 }} />
                <Text style={styles.errorBannerText}>{error}</Text>
              </View>
            ) : null}

            <Input
              label="Full Name"
              placeholder="e.g. Rohan Verma"
              iconLeft="User"
              value={fullName}
              onChangeText={(val) => {
                setFullName(val);
                if (error) setError('');
              }}
            />

            <Input
              label="Email Address"
              placeholder="e.g. rohan.verma@example.com"
              iconLeft="Mail"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={(val) => {
                setEmail(val);
                if (error) setError('');
              }}
            />

            <Input
              label="Mobile Number"
              prefix="+91 "
              placeholder="98765 43210"
              iconLeft="Phone"
              keyboardType="phone-pad"
              maxLength={10}
              value={phoneNumber}
              onChangeText={(val) => {
                setPhoneNumber(val);
                if (error) setError('');
              }}
            />

            <Input
              label="Password (min 8 characters)"
              placeholder="Enter secure password"
              iconLeft="Lock"
              iconRight={showPassword ? 'EyeOff' : 'Eye'}
              onPressRightIcon={() => setShowPassword(!showPassword)}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              value={password}
              onChangeText={(val) => {
                setPassword(val);
                if (error) setError('');
              }}
            />

            <Text style={styles.passwordHint}>
              Must be at least 8 characters. Used to securely access your agreements, invoices, and deposits.
            </Text>

            <Button
              title="Create Stayra Account"
              onPress={handleSignUp}
              loading={loading}
              style={styles.submitButton}
            />

            {/* Switch to Sign In */}
            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => router.push('/(auth)/login' as any)}
                activeOpacity={0.7}
              >
                <Text style={styles.footerLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Value Props Row */}
          <View style={styles.valuePropContainer}>
            <View style={styles.valuePropItem}>
              <Icon name="ShieldCheck" size={14} color={colors.shieldEmerald} style={{ marginRight: 6 }} />
              <Text style={styles.valuePropText}>Safe Escrow Deposits</Text>
            </View>
            <View style={styles.valuePropItem}>
              <Icon name="Zap" size={14} color={colors.primary} style={{ marginRight: 6 }} />
              <Text style={styles.valuePropText}>Live SLA Guarantees</Text>
            </View>
            <View style={styles.valuePropItem}>
              <Icon name="CheckCircle2" size={14} color={colors.info} style={{ marginRight: 6 }} />
              <Text style={styles.valuePropText}>Verified PGs</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logo: {
    width: 68,
    height: 68,
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.heading2,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: spacing.md,
  },
  roleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  roleLabel: {
    ...typography.caption,
    fontWeight: '800',
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    letterSpacing: 0.6,
  },
  roleToggleRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  roleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  roleButtonActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  roleButtonText: {
    ...typography.bodySmallMedium,
    color: colors.textMuted,
  },
  roleButtonTextActive: {
    color: colors.primary,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.md,
    marginBottom: spacing.lg,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dangerLight,
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  errorBannerText: {
    ...typography.caption,
    color: colors.danger,
    flex: 1,
    fontWeight: '600',
  },
  passwordHint: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: -spacing.xs,
    marginBottom: spacing.lg,
    lineHeight: 16,
  },
  submitButton: {
    marginTop: spacing.xs,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  footerText: {
    ...typography.bodySmall,
    color: colors.textMuted,
  },
  footerLink: {
    ...typography.bodySmallMedium,
    color: colors.primary,
    fontWeight: '700',
  },
  valuePropContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    marginBottom: spacing.xl,
  },
  valuePropItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valuePropText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
});
