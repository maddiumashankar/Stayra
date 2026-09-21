import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '../src/theme/tokens';
import { useStayraStore } from '../src/stores/useStayraStore';

export default function SplashScreen() {
  const router = useRouter();
  const { currentRole, isAuthenticated } = useStayraStore();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isAuthenticated) {
        router.replace('/(auth)/login');
      } else if (currentRole === 'OWNER') {
        router.replace('/(owner)');
      } else {
        router.replace('/(resident)');
      }
    }, 1200);

    return () => clearTimeout(timeout);
  }, [router, currentRole, isAuthenticated]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/stayra-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.brandTitle}>Stayra</Text>
      <Text style={styles.tagline}>Smart stays. Fair rent. Better living.</Text>

      <View style={styles.badgeRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>AI-NATIVE LIVING ECOSYSTEM</Text>
        </View>
      </View>

      <ActivityIndicator size="small" color={colors.primary} style={styles.loader} />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Verified Tenancies • Guaranteed Rent Credits</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090D16',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 22,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    ...shadows.primaryGlow,
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 22,
  },
  brandTitle: {
    ...typography.display,
    color: '#FFFFFF',
    marginBottom: spacing.xs,
    letterSpacing: -0.8,
  },
  tagline: {
    ...typography.body,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  badgeRow: {
    marginBottom: spacing.xxl,
  },
  badge: {
    backgroundColor: 'rgba(30, 91, 240, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(30, 91, 240, 0.4)',
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    borderRadius: borderRadius.full,
  },
  badgeText: {
    color: '#60A5FA',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  loader: {
    marginTop: spacing.md,
  },
  footer: {
    position: 'absolute',
    bottom: spacing.xxl,
  },
  footerText: {
    ...typography.caption,
    color: '#64748B',
    fontSize: 11,
    letterSpacing: 0.3,
  },
});
