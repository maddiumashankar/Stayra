import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Property } from '../../data/mockData';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme/tokens';
import { Icon } from './Icon';
import { Badge } from './Badge';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={() => router.push(`/(resident)/pg/${property.id}` as any)}
      style={styles.card}
    >
      {/* Property Cover Photo */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: property.photos[0] }} style={styles.image} />
        <View style={styles.imageOverlayTop}>
          <Badge
            label="VERIFIED STAYRA GUARANTEE"
            variant="success"
            icon="ShieldCheck"
            size="sm"
          />
          <View style={styles.scorePill}>
            <Icon name="Star" size={12} color={colors.amber} style={{ marginRight: 3 }} />
            <Text style={styles.scoreText}>{property.rating.toFixed(1)}</Text>
          </View>
        </View>

        <View style={styles.imageOverlayBottom}>
          <Text style={styles.sharingTag}>
            {property.genderCategory} • {property.roomsCount} Rooms
          </Text>
        </View>
      </View>

      {/* Card Content */}
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text style={styles.propertyName} numberOfLines={1}>
            {property.name}
          </Text>
        </View>

        <View style={styles.addressRow}>
          <Icon name="MapPin" size={13} color={colors.textSecondary} style={{ marginRight: 4 }} />
          <Text style={styles.addressText} numberOfLines={1}>
            {property.address}
          </Text>
        </View>

        {/* SLA Guarantee & Reputation Metrics */}
        <View style={styles.slaMetricsRow}>
          <View style={styles.metricItem}>
            <Icon name="Clock" size={12} color={colors.primary} style={{ marginRight: 4 }} />
            <Text style={styles.metricText}>
              SLA Fix: <Text style={styles.metricBold}>{property.avgResolutionHours}h avg</Text>
            </Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricItem}>
            <Icon name="ShieldCheck" size={12} color={colors.success} style={{ marginRight: 4 }} />
            <Text style={styles.metricText}>
              SLA Adherence: <Text style={styles.metricBold}>{property.slaAdherenceRate}%</Text>
            </Text>
          </View>
        </View>

        {/* Key Amenities */}
        <View style={styles.amenitiesRow}>
          {property.amenities.slice(0, 3).map((amenity) => (
            <View key={amenity.code} style={styles.amenityChip}>
              <Text style={styles.amenityText}>{amenity.label.split(' ')[0]} {amenity.label.split(' ')[1] || ''}</Text>
            </View>
          ))}
          {property.amenities.length > 3 && (
            <View style={styles.amenityMore}>
              <Text style={styles.amenityMoreText}>+{property.amenities.length - 3} more</Text>
            </View>
          )}
        </View>

        {/* Pricing and Action */}
        <View style={styles.footerRow}>
          <View>
            <Text style={styles.priceLabel}>Starting from</Text>
            <Text style={styles.priceValue}>
              ₹{property.startingPrice.toLocaleString('en-IN')}{' '}
              <Text style={styles.priceUnit}>/ month</Text>
            </Text>
          </View>

          <TouchableOpacity
            style={styles.viewRoomsBtn}
            onPress={() => router.push(`/(resident)/pg/${property.id}` as any)}
            activeOpacity={0.8}
          >
            <Text style={styles.viewRoomsText}>Explore Rooms</Text>
            <Icon name="ChevronRight" size={14} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: spacing.md,
    ...shadows.md,
  },
  imageContainer: {
    height: 180,
    width: '100%',
    position: 'relative',
    backgroundColor: colors.surfaceTertiary,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlayTop: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scorePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
  },
  scoreText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  imageOverlayBottom: {
    position: 'absolute',
    bottom: spacing.sm,
    left: spacing.sm,
  },
  sharingTag: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    color: '#FFFFFF',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.xs,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  body: {
    padding: spacing.md,
  },
  titleRow: {
    marginBottom: 4,
  },
  propertyName: {
    ...typography.heading3,
    color: colors.text,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  addressText: {
    ...typography.caption,
    color: colors.textSecondary,
    flex: 1,
  },
  slaMetricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSecondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.sm,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  metricBold: {
    fontWeight: '700',
    color: colors.text,
  },
  metricDivider: {
    width: 1,
    height: 12,
    backgroundColor: colors.border,
    marginHorizontal: spacing.sm,
  },
  amenitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  amenityChip: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.xs,
  },
  amenityText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.primary,
    fontWeight: '600',
  },
  amenityMore: {
    paddingHorizontal: 4,
    paddingVertical: 3,
    justifyContent: 'center',
  },
  amenityMoreText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.textMuted,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  priceLabel: {
    fontSize: 10,
    color: colors.textMuted,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  priceValue: {
    ...typography.heading2,
    color: colors.primary,
  },
  priceUnit: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '400',
  },
  viewRoomsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: borderRadius.md,
    gap: 4,
  },
  viewRoomsText: {
    ...typography.caption,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
