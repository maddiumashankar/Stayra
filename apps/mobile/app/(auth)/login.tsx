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

export default function LoginScreen() {
  const [email, setEmail] = useState('rohan.verma@example.com');
  const [password, setPassword] = useState('StayraPass123!');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { setRole, login } = useStayraStore();

  const handleSignIn = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Please enter your password');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await authApi.signIn({
        email: email.trim().toLowerCase(),
        password,
      });

      setRole(response.user.role === 'OWNER' ? 'OWNER' : 'RESIDENT');
      login(response.user);

      if (response.user.role === 'OWNER') {
        router.replace('/(owner)');
      } else {
        router.replace('/(resident)');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (role: 'RESIDENT' | 'OWNER') => {
    if (role === 'OWNER') {
      setEmail('suresh.reddy@stayra.com');
      setPassword('StayraPass123!');
      setRole('OWNER');
      login({ role: 'OWNER', email: 'suresh.reddy@stayra.com', fullName: 'Suresh Reddy' });
      router.replace('/(owner)');
    } else {
      setEmail('rohan.verma@example.com');
      setPassword('StayraPass123!');
      setRole('RESIDENT');
      login({ role: 'RESIDENT', email: 'rohan.verma@example.com', fullName: 'Rohan Verma' });
      router.replace('/(resident)');
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
          {/* Brand Header */}
          <View style={styles.header}>
            <Image
              source={require('../../assets/stayra-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Sign in to manage your stay, view transparent rent, or track maintenance SLAs.
            </Text>
          </View>

          {/* Value Props Row */}
          <View style={styles.valuePropContainer}>
            <View style={styles.valuePropItem}>
              <Icon name="ShieldCheck" size={14} color={colors.shieldEmerald} style={{ marginRight: 6 }} />
              <Text style={styles.valuePropText}>Zero Deposit Disputes</Text>
            </View>
            <View style={styles.valuePropItem}>
              <Icon name="Zap" size={14} color={colors.primary} style={{ marginRight: 6 }} />
              <Text style={styles.valuePropText}>Auto Rent Credits</Text>
            </View>
            <View style={styles.valuePropItem}>
              <Icon name="CheckCircle2" size={14} color={colors.info} style={{ marginRight: 6 }} />
              <Text style={styles.valuePropText}>100% Verified PGs</Text>
            </View>
          </View>

          {/* Form Card */}
          <View style={styles.card}>
            <Text style={styles.cardHeader}>Sign In</Text>
            <Text style={styles.cardSub}>Enter your email and password to access your account</Text>

            {error ? (
              <View style={styles.errorBanner}>
                <Icon name="AlertCircle" size={16} color={colors.danger} style={{ marginRight: 8 }} />
                <Text style={styles.errorBannerText}>{error}</Text>
              </View>
            ) : null}

            <Input
              label="Email Address"
              placeholder="e.g. rohan.verma@example.com"
              iconLeft="Mail"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (error) setError('');
              }}
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              iconLeft="Lock"
              iconRight={showPassword ? 'EyeOff' : 'Eye'}
              onPressRightIcon={() => setShowPassword(!showPassword)}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (error) setError('');
              }}
            />

            <Button
              title="Sign In"
              onPress={handleSignIn}
              loading={loading}
              iconRight="ChevronRight"
              size="lg"
              style={{ marginTop: spacing.xs }}
            />

            {/* Switch to Sign Up */}
            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => router.push('/(auth)/signup' as any)}
                activeOpacity={0.7}
              >
                <Text style={styles.footerLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.legalNotice}>
              By signing in, you agree to Stayra's Living Standards Agreement, Fair Rent Policy, and Privacy Terms.
            </Text>
          </View>

          {/* Fast Prototype Shortcuts */}
          <View style={styles.demoSection}>
            <Text style={styles.demoSectionTitle}>FAST PROTOTYPE 1-TAP LOGIN</Text>
            <View style={styles.demoButtonsRow}>
              <Button
                title="Rohan (Resident)"
                onPress={() => handleQuickLogin('RESIDENT')}
                variant="outline"
                size="sm"
                iconLeft="User"
                style={{ flex: 1 }}
              />
              <Button
                title="Suresh (Owner)"
                onPress={() => handleQuickLogin('OWNER')}
                variant="secondary"
                size="sm"
                iconLeft="Building2"
                style={{ flex: 1 }}
              />
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
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
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
    borderRadius: 18,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.heading2,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: 320,
    lineHeight: 20,
  },
  valuePropContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  valuePropItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  valuePropText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.text,
    fontSize: 11,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.md,
    marginBottom: spacing.xl,
  },
  cardHeader: {
    ...typography.heading3,
    color: colors.text,
    marginBottom: 4,
  },
  cardSub: {
    ...typography.bodySmall,
    color: colors.textSecondary,
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
  legalNotice: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.md,
    lineHeight: 17,
  },
  demoSection: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.lg,
    alignItems: 'center',
  },
  demoSectionTitle: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textMuted,
    marginBottom: spacing.sm,
    letterSpacing: 0.5,
  },
  demoButtonsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    width: '100%',
  },
});
