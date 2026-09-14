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
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '../../src/theme/tokens';
import { Input, Button, Icon } from '../../src/components/common';
import { useStayraStore } from '../../src/stores/useStayraStore';

export default function LoginScreen() {
  const [phone, setPhone] = useState('9876543210');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setRole } = useStayraStore();

  const handleSendOtp = () => {
    if (phone.trim().length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push({
        pathname: '/(auth)/otp',
        params: { phone },
      } as any);
    }, 600);
  };

  const handleQuickLogin = (role: 'RESIDENT' | 'OWNER') => {
    setRole(role);
    if (role === 'OWNER') {
      router.replace('/(owner)');
    } else {
      router.replace('/(resident)');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Brand Header */}
          <View style={styles.header}>
            <Image
              source={require('../../assets/stayra-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Welcome to Stayra</Text>
            <Text style={styles.subtitle}>
              Smart stays, fair rent, and automated SLA rent compensation.
            </Text>
          </View>

          {/* Value Props Row */}
          <View style={styles.valuePropContainer}>
            <View style={styles.valuePropItem}>
              <Icon name="ShieldCheck" size={16} color={colors.shieldEmerald} style={{ marginRight: 6 }} />
              <Text style={styles.valuePropText}>Zero Deposit Disputes</Text>
            </View>
            <View style={styles.valuePropItem}>
              <Icon name="Zap" size={16} color={colors.primary} style={{ marginRight: 6 }} />
              <Text style={styles.valuePropText}>Auto Rent Credits</Text>
            </View>
            <View style={styles.valuePropItem}>
              <Icon name="CheckCircle2" size={16} color={colors.info} style={{ marginRight: 6 }} />
              <Text style={styles.valuePropText}>100% Verified PGs</Text>
            </View>
          </View>

          {/* Form Card */}
          <View style={styles.card}>
            <Text style={styles.cardHeader}>Sign in or Create Account</Text>
            <Text style={styles.cardSub}>We will send a 6-digit OTP to verify your mobile</Text>

            <Input
              label="Mobile Number"
              prefix="+91 "
              placeholder="98765 43210"
              keyboardType="phone-pad"
              maxLength={10}
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
                if (error) setError('');
              }}
              error={error}
              iconLeft="Phone"
            />

            <Button
              title="Continue with OTP"
              onPress={handleSendOtp}
              loading={loading}
              iconRight="ChevronRight"
              size="lg"
              style={{ marginTop: spacing.xs }}
            />

            <Text style={styles.legalNotice}>
              By signing in, you agree to Stayra's Living Standards Agreement, Fair Rent Policy, and Privacy Terms.
            </Text>
          </View>

          {/* Quick Demo Logins for Pair Programming & Review */}
          <View style={styles.demoSection}>
            <Text style={styles.demoSectionTitle}>FAST PROTOTYPE SHORTCUTS</Text>
            <View style={styles.demoButtonsRow}>
              <Button
                title="Resident Demo"
                onPress={() => handleQuickLogin('RESIDENT')}
                variant="outline"
                size="sm"
                iconLeft="User"
                style={{ flex: 1 }}
              />
              <Button
                title="PG Owner Demo"
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
    ...typography.heading1,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: 320,
    lineHeight: 22,
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
    backgroundColor: colors.surface,
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
    ...typography.label,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  demoButtonsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    width: '100%',
  },
});
