import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '../../src/theme/tokens';
import {
  HeaderBar,
  PropertyCard,
  Icon,
  EmptyState,
} from '../../src/components/common';
import { useStayraStore } from '../../src/stores/useStayraStore';

const CITIES = ['Bengaluru', 'Gurugram', 'Hyderabad', 'Pune'];
const NEIGHBORHOODS: Record<string, string[]> = {
  Bengaluru: ['All Neighborhoods', 'HSR Layout', 'Koramangala', 'Indiranagar', 'Electronic City'],
  Gurugram: ['All Neighborhoods', 'Cyber City', 'DLF Phase 2', 'Golf Course Road', 'Sohna Road'],
  Hyderabad: ['All Neighborhoods', 'Gachibowli', 'Hitec City', 'Madhapur', 'Kondapur'],
  Pune: ['All Neighborhoods', 'Kharadi', 'Hinjawadi', 'Viman Nagar', 'Baner'],
};

export default function DiscoverScreen() {
  const router = useRouter();
  const { properties, filters, setFilters, resetFilters } = useStayraStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilterPills, setActiveFilterPills] = useState<string[]>([]);

  const currentNeighborhoods = NEIGHBORHOODS[filters.city] || ['All Neighborhoods'];

  // Filter properties
  const filteredProperties = properties.filter((prop) => {
    // City match
    if (filters.city !== 'All' && prop.city !== filters.city) {
      return false;
    }
    // Neighborhood match
    if (
      filters.neighborhood !== 'All Neighborhoods' &&
      prop.neighborhood !== filters.neighborhood
    ) {
      return false;
    }
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        prop.name.toLowerCase().includes(q) ||
        prop.neighborhood.toLowerCase().includes(q) ||
        prop.address.toLowerCase().includes(q);
      if (!match) return false;
    }
    // Filter pills
    if (activeFilterPills.includes('UNDER_15K') && prop.startingPrice > 15000) return false;
    if (activeFilterPills.includes('HIGH_SLA') && prop.slaAdherenceRate < 95) return false;
    if (activeFilterPills.includes('NO_CURFEW') && prop.curfewTime !== null) return false;

    return true;
  });

  const togglePill = (pill: string) => {
    if (activeFilterPills.includes(pill)) {
      setActiveFilterPills(activeFilterPills.filter((p) => p !== pill));
    } else {
      setActiveFilterPills([...activeFilterPills, pill]);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBar showLocation />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* City Switcher Row */}
        <View style={styles.cityRow}>
          {CITIES.map((city) => (
            <TouchableOpacity
              key={city}
              onPress={() => setFilters({ city, neighborhood: 'All Neighborhoods' })}
              style={[
                styles.cityPill,
                filters.city === city && styles.cityPillActive,
              ]}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.cityText,
                  filters.city === city && styles.cityTextActive,
                ]}
              >
                {city}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Neighborhood Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.neighborhoodRow}
        >
          {currentNeighborhoods.map((nb) => (
            <TouchableOpacity
              key={nb}
              onPress={() => setFilters({ neighborhood: nb })}
              style={[
                styles.neighborhoodPill,
                filters.neighborhood === nb && styles.neighborhoodPillActive,
              ]}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.neighborhoodText,
                  filters.neighborhood === nb && styles.neighborhoodTextActive,
                ]}
              >
                {nb}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Natural Language AI Search Bar */}
        <View style={styles.searchBarContainer}>
          <Icon name="Search" size={18} color={colors.textSecondary} style={{ marginRight: spacing.sm }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by area, PG name, or landmark..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="X" size={16} color={colors.textMuted} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.aiSearchBtn}
              onPress={() => router.push('/(modals)/ai-assistant' as any)}
            >
              <Icon name="Sparkles" size={13} color={colors.primary} style={{ marginRight: 3 }} />
              <Text style={styles.aiSearchBtnText}>AI Search</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Quick Filter Chips & View Mode Toggle */}
        <View style={styles.filterAndToggleRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsScroll}>
            <TouchableOpacity
              onPress={() => togglePill('UNDER_15K')}
              style={[styles.filterChip, activeFilterPills.includes('UNDER_15K') && styles.filterChipActive]}
            >
              <Icon
                name="CreditCard"
                size={12}
                color={activeFilterPills.includes('UNDER_15K') ? '#FFFFFF' : colors.textSecondary}
                style={{ marginRight: 4 }}
              />
              <Text style={[styles.filterChipText, activeFilterPills.includes('UNDER_15K') && styles.filterChipTextActive]}>
                Under ₹15k
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => togglePill('HIGH_SLA')}
              style={[styles.filterChip, activeFilterPills.includes('HIGH_SLA') && styles.filterChipActive]}
            >
              <Icon
                name="ShieldCheck"
                size={12}
                color={activeFilterPills.includes('HIGH_SLA') ? '#FFFFFF' : colors.shieldEmerald}
                style={{ marginRight: 4 }}
              />
              <Text style={[styles.filterChipText, activeFilterPills.includes('HIGH_SLA') && styles.filterChipTextActive]}>
                SLA &gt;95%
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => togglePill('NO_CURFEW')}
              style={[styles.filterChip, activeFilterPills.includes('NO_CURFEW') && styles.filterChipActive]}
            >
              <Icon
                name="KeyRound"
                size={12}
                color={activeFilterPills.includes('NO_CURFEW') ? '#FFFFFF' : colors.amber}
                style={{ marginRight: 4 }}
              />
              <Text style={[styles.filterChipText, activeFilterPills.includes('NO_CURFEW') && styles.filterChipTextActive]}>
                No Curfew
              </Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Map / List View Toggle */}
          <View style={styles.viewModeToggle}>
            <TouchableOpacity
              style={[styles.viewModeBtn, filters.viewMode === 'LIST' && styles.viewModeBtnActive]}
              onPress={() => setFilters({ viewMode: 'LIST' })}
            >
              <Icon
                name="Menu"
                size={14}
                color={filters.viewMode === 'LIST' ? colors.primary : colors.textMuted}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.viewModeBtn, filters.viewMode === 'MAP' && styles.viewModeBtnActive]}
              onPress={() => setFilters({ viewMode: 'MAP' })}
            >
              <Icon
                name="MapPin"
                size={14}
                color={filters.viewMode === 'MAP' ? colors.primary : colors.textMuted}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stayra Guarantee Banner */}
        <View style={styles.guaranteeBanner}>
          <View style={styles.guaranteeTop}>
            <View style={styles.guaranteeBadge}>
              <Icon name="ShieldCheck" size={13} color="#60A5FA" style={{ marginRight: 4 }} />
              <Text style={styles.guaranteeBadgeText}>STAYRA FAIR LIVING GUARANTEE</Text>
            </View>
          </View>
          <Text style={styles.guaranteeTitle}>Zero Deductions. Guaranteed SLA Rent Credits.</Text>
          <Text style={styles.guaranteeBody}>
            If WiFi, AC, or power outages exceed your PG owner's agreed SLA, you receive automatic deterministic rent credits right on your next bill.
          </Text>
        </View>

        {/* MAP VIEW MODE */}
        {filters.viewMode === 'MAP' ? (
          <View style={styles.mapContainer}>
            <View style={styles.mapCanvas}>
              {/* Simulated interactive map surface */}
              <View style={styles.mapGridLine1} />
              <View style={styles.mapGridLine2} />
              <View style={styles.mapRadiusCircle}>
                <Text style={styles.radiusLabel}>5 km Radius</Text>
              </View>

              {/* Map Property Pins */}
              {filteredProperties.map((prop, idx) => (
                <TouchableOpacity
                  key={prop.id}
                  style={[
                    styles.mapPin,
                    idx === 0 && { top: '32%', left: '28%' },
                    idx === 1 && { top: '55%', left: '60%' },
                    idx === 2 && { top: '20%', left: '72%' },
                  ]}
                  onPress={() => router.push(`/(resident)/pg/${prop.id}` as any)}
                  activeOpacity={0.8}
                >
                  <View style={styles.pinBubble}>
                    <Text style={styles.pinPrice}>₹{(prop.startingPrice / 1000).toFixed(1)}k</Text>
                    <Icon name="ShieldCheck" size={10} color={colors.shieldEmerald} style={{ marginLeft: 2 }} />
                  </View>
                  <View style={styles.pinPointer} />
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.mapHint}>Tap any pin to view property rooms and SLA guarantees</Text>
          </View>
        ) : null}

        {/* LIST VIEW MODE */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              {filters.city} PGs &amp; Hostels
            </Text>
            <Text style={styles.sectionCount}>
              {filteredProperties.length} verified accommodations available
            </Text>
          </View>
        </View>

        {filteredProperties.length === 0 ? (
          <EmptyState
            icon="Search"
            title="No PGs Match Your Filters"
            description="Try changing your budget, neighborhood, or clearing your active filters to see available rooms."
            actionTitle="Reset All Filters"
            onAction={() => {
              resetFilters();
              setActiveFilterPills([]);
              setSearchQuery('');
            }}
          />
        ) : (
          filteredProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))
        )}
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
  cityRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  cityPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cityPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  cityText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '700',
  },
  cityTextActive: {
    color: '#FFFFFF',
  },
  neighborhoodRow: {
    gap: spacing.xs,
    paddingVertical: spacing.xs,
    marginBottom: spacing.sm,
  },
  neighborhoodPill: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceSecondary,
  },
  neighborhoodPillActive: {
    backgroundColor: colors.primaryLight,
  },
  neighborhoodText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  neighborhoodTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    height: 48,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    color: colors.text,
    height: '100%',
  },
  aiSearchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  aiSearchBtnText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
    fontSize: 11,
  },
  filterAndToggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  chipsScroll: {
    flexDirection: 'row',
    gap: spacing.xs,
    flex: 1,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
    borderRadius: borderRadius.full,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  viewModeToggle: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceSecondary,
    borderRadius: borderRadius.sm,
    padding: 2,
    marginLeft: spacing.sm,
  },
  viewModeBtn: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: borderRadius.xs,
  },
  viewModeBtnActive: {
    backgroundColor: colors.surface,
    ...shadows.sm,
  },
  guaranteeBanner: {
    backgroundColor: '#0F172A',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  guaranteeTop: {
    marginBottom: spacing.xs,
  },
  guaranteeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 91, 240, 0.25)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
  },
  guaranteeBadgeText: {
    color: '#93C5FD',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  guaranteeTitle: {
    ...typography.heading3,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  guaranteeBody: {
    ...typography.caption,
    color: '#94A3B8',
    lineHeight: 18,
  },
  mapContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  mapCanvas: {
    height: 220,
    backgroundColor: '#E2E8F0',
    borderRadius: borderRadius.md,
    position: 'relative',
    overflow: 'hidden',
  },
  mapGridLine1: {
    position: 'absolute',
    left: '40%',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#CBD5E1',
  },
  mapGridLine2: {
    position: 'absolute',
    top: '45%',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#CBD5E1',
  },
  mapRadiusCircle: {
    position: 'absolute',
    top: '20%',
    left: '25%',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: 'rgba(30, 91, 240, 0.4)',
    backgroundColor: 'rgba(30, 91, 240, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radiusLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  mapPin: {
    position: 'absolute',
    alignItems: 'center',
  },
  pinBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    borderWidth: 1.5,
    borderColor: colors.primary,
    ...shadows.md,
  },
  pinPrice: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  pinPointer: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 0,
    borderTopWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.primary,
  },
  mapHint: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xs,
    fontSize: 11,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    ...typography.heading2,
    color: colors.text,
  },
  sectionCount: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
