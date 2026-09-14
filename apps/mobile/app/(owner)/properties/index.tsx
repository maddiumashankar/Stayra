import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '../../../src/theme/tokens';
import { HeaderBar, Badge, Button } from '../../../src/components/common';
import { mockProperties } from '../../../src/data/mockData';

export default function OwnerPropertiesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBar title="Properties &amp; Inventory" subtitle="Multi-Branch Management" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.topActionsRow}>
          <Text style={styles.pageTitle}>Managed PG Properties ({mockProperties.length})</Text>
          <Button
            title="Add Property"
            size="sm"
            iconLeft="Plus"
            onPress={() => {}}
          />
        </View>

        {mockProperties.map((prop) => {
          const occupancy = Math.round((prop.occupiedBeds / prop.totalBeds) * 100);
          return (
            <View key={prop.id} style={styles.card}>
              <View style={styles.cardImageContainer}>
                <Image source={{ uri: prop.photos[0] }} style={styles.cardImage} />
                <View style={styles.imageOverlay}>
                  <Badge
                    label={`${occupancy}% OCCUPIED`}
                    variant={occupancy > 90 ? 'success' : 'warning'}
                    size="sm"
                  />
                  <Text style={styles.bedCountText}>
                    {prop.occupiedBeds} / {prop.totalBeds} Beds
                  </Text>
                </View>
              </View>

              <View style={styles.cardBody}>
                <Text style={styles.propName}>{prop.name}</Text>
                <Text style={styles.propAddress}>{prop.address}</Text>

                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Text style={styles.statVal}>{prop.roomsCount}</Text>
                    <Text style={styles.statLabel}>Total Rooms</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statVal}>{prop.totalBeds - prop.occupiedBeds}</Text>
                    <Text style={[styles.statLabel, { color: colors.shieldEmerald, fontWeight: '700' }]}>
                      Vacant Beds
                    </Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statVal}>{prop.slaAdherenceRate}%</Text>
                    <Text style={styles.statLabel}>SLA Score</Text>
                  </View>
                </View>

                <View style={styles.actionButtonsRow}>
                  <Button
                    title="Open Bed Grid Matrix"
                    onPress={() => router.push(`/(owner)/properties/${prop.id}/rooms` as any)}
                    iconLeft="Bed"
                    size="md"
                    style={{ flex: 1 }}
                  />
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
  },
  topActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  pageTitle: {
    ...typography.heading3,
    color: colors.text,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  cardImageContainer: {
    height: 140,
    width: '100%',
    position: 'relative',
    backgroundColor: colors.surfaceTertiary,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bedCountText: {
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
  },
  cardBody: {
    padding: spacing.md,
  },
  propName: {
    ...typography.heading3,
    color: colors.text,
  },
  propAddress: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.surfaceSecondary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statVal: {
    ...typography.heading3,
    color: colors.text,
  },
  statLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 20,
    backgroundColor: colors.border,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
});
