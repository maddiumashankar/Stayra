import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '../../src/theme/tokens';
import { Button, Icon, Badge } from '../../src/components/common';
import { useStayraStore, UserRole } from '../../src/stores/useStayraStore';

export default function SelectRoleScreen() {
  const router = useRouter();
  const { setRole } = useStayraStore();
  const [selected, setSelected] = useState<UserRole>('RESIDENT');

  const handleContinue = () => {
    setRole(selected);
    if (selected === 'OWNER') {
      router.replace('/(owner)');
    } else {
      router.replace('/(resident)');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Badge label="ACCOUNT SETUP" variant="brand" size="sm" style={{ marginBottom: spacing.xs }} />
          <Text style={styles.title}>Choose Your Stayra Experience</Text>
          <Text style={styles.subtitle}>
            Select how you will be using Stayra today. You can always toggle between modes anytime.
          </Text>
        </View>

        {/* Option 1: Resident / Tenant */}
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={() => setSelected('RESIDENT')}
          style={[
            styles.roleCard,
            selected === 'RESIDENT' && styles.roleCardActive,
          ]}
        >
          <View style={styles.cardHeaderRow}>
            <View style={[styles.iconBox, selected === 'RESIDENT' && styles.iconBoxActive]}>
              <Icon
                name="Home"
                size={22}
                color={selected === 'RESIDENT' ? '#FFFFFF' : colors.primary}
              />
            </View>
            <View style={styles.radioOuter}>
              {selected === 'RESIDENT' && <View style={styles.radioInner} />}
            </View>
          </View>

          <Text style={styles.cardTitle}>I am a Resident / Tenant</Text>
          <Text style={styles.cardDesc}>
            Discover verified PGs, enjoy automated digital tenancy, SLA-backed maintenance with rent compensation, and a persistent digital Stayra ID.
          </Text>

          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Icon name="ShieldCheck" size={14} color={colors.shieldEmerald} style={{ marginRight: 6 }} />
              <Text style={styles.featureText}>Automatic rent credit for WiFi/AC outage</Text>
            </View>
            <View style={styles.featureItem}>
              <Icon name="CreditCard" size={14} color={colors.primary} style={{ marginRight: 6 }} />
              <Text style={styles.featureText}>Itemized electricity &amp; zero hidden charges</Text>
            </View>
            <View style={styles.featureItem}>
              <Icon name="Award" size={14} color={colors.amber} style={{ marginRight: 6 }} />
              <Text style={styles.featureText}>Lifetime Stayra Resident ID (STR-RES-0842)</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Option 2: PG Owner / Operator */}
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={() => setSelected('OWNER')}
          style={[
            styles.roleCard,
            selected === 'OWNER' && styles.roleCardActive,
          ]}
        >
          <View style={styles.cardHeaderRow}>
            <View style={[styles.iconBox, selected === 'OWNER' && styles.iconBoxActive]}>
              <Icon
                name="Building2"
                size={22}
                color={selected === 'OWNER' ? '#FFFFFF' : colors.text}
              />
            </View>
            <View style={styles.radioOuter}>
              {selected === 'OWNER' && <View style={styles.radioInner} />}
            </View>
          </View>

          <Text style={styles.cardTitle}>I am a PG Owner / Operator</Text>
          <Text style={styles.cardDesc}>
            Automate monthly rent runs, track double-entry ledgers, manage room/bed allocations with visual grids, and dispatch staff with proof.
          </Text>

          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Icon name="Bed" size={14} color={colors.primary} style={{ marginRight: 6 }} />
              <Text style={styles.featureText}>Interactive floor-by-floor bed grid matrix</Text>
            </View>
            <View style={styles.featureItem}>
              <Icon name="Zap" size={14} color={colors.amber} style={{ marginRight: 6 }} />
              <Text style={styles.featureText}>AI Billing Anomaly Detector for sub-meters</Text>
            </View>
            <View style={styles.featureItem}>
              <Icon name="Wrench" size={14} color={colors.shieldEmerald} style={{ marginRight: 6 }} />
              <Text style={styles.featureText}>SLA dispatching with photo resolution proof</Text>
            </View>
          </View>
        </TouchableOpacity>

        <Button
          title={selected === 'RESIDENT' ? 'Enter as Resident' : 'Enter as PG Owner'}
          onPress={handleContinue}
          size="lg"
          iconRight="ChevronRight"
          style={{ marginTop: spacing.md, marginBottom: spacing.xl }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
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
  roleCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.border,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  roleCardActive: {
    borderColor: colors.primary,
    backgroundColor: '#FFFFFF',
    ...shadows.md,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBoxActive: {
    backgroundColor: colors.primary,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  cardTitle: {
    ...typography.heading2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  cardDesc: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  featureList: {
    gap: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceSecondary,
    paddingTop: spacing.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    ...typography.caption,
    color: colors.text,
    fontWeight: '600',
  },
});
