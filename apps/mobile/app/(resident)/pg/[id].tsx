import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '../../../src/theme/tokens';
import { HeaderBar, Icon, Badge, Button, BedPill } from '../../../src/components/common';
import {
  mockProperties,
  mockRooms,
  mockWeeklyFoodMenu,
} from '../../../src/data/mockData';

export default function PropertyDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const propertyId = (params.id as string) || 'prop-hsr-01';

  const property =
    mockProperties.find((p) => p.id === propertyId) || mockProperties[0];
  const rooms = mockRooms.filter((r) => r.propertyId === property.id);

  const [activeTab, setActiveTab] = useState<'ROOMS' | 'REPUTATION' | 'FOOD' | 'RULES'>('ROOMS');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBar
        title={property.name}
        subtitle={property.neighborhood}
        showBack
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Photo Gallery Carousel */}
        <View style={styles.galleryContainer}>
          <Image
            source={{ uri: property.photos[selectedPhotoIndex] || property.photos[0] }}
            style={styles.mainPhoto}
          />
          <View style={styles.photoTagOverlay}>
            <Badge label="VERIFIED RESIDENT PHOTOS" variant="success" icon="ShieldCheck" size="sm" />
            <Text style={styles.photoIndexText}>
              {selectedPhotoIndex + 1} / {property.photos.length}
            </Text>
          </View>

          {/* Photo Thumbnails */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thumbnailsScroll}>
            {property.photos.map((photo, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => setSelectedPhotoIndex(idx)}
                style={[
                  styles.thumbnailWrapper,
                  selectedPhotoIndex === idx && styles.thumbnailWrapperActive,
                ]}
              >
                <Image source={{ uri: photo }} style={styles.thumbnail} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Property Title & Rating Summary */}
        <View style={styles.titleSection}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{property.name}</Text>
          </View>
          <Text style={styles.tagline}>{property.tagline}</Text>

          <View style={styles.addressRow}>
            <Icon name="MapPin" size={14} color={colors.primary} style={{ marginRight: 4 }} />
            <Text style={styles.address}>{property.address}</Text>
          </View>

          {/* Key Score Highlights */}
          <View style={styles.scoreHighlightCard}>
            <View style={styles.scoreHighlightItem}>
              <View style={styles.starRow}>
                <Icon name="Star" size={14} color={colors.amber} style={{ marginRight: 3 }} />
                <Text style={styles.scoreNumber}>{property.rating.toFixed(1)}</Text>
              </View>
              <Text style={styles.scoreLabel}>{property.reviewCount} Verified Reviews</Text>
            </View>

            <View style={styles.scoreDivider} />

            <View style={styles.scoreHighlightItem}>
              <View style={styles.starRow}>
                <Icon name="ShieldCheck" size={14} color={colors.shieldEmerald} style={{ marginRight: 3 }} />
                <Text style={styles.scoreNumber}>{property.slaAdherenceRate}%</Text>
              </View>
              <Text style={styles.scoreLabel}>SLA Compliance</Text>
            </View>

            <View style={styles.scoreDivider} />

            <View style={styles.scoreHighlightItem}>
              <View style={styles.starRow}>
                <Icon name="Clock" size={14} color={colors.primary} style={{ marginRight: 3 }} />
                <Text style={styles.scoreNumber}>{property.avgResolutionHours}h</Text>
              </View>
              <Text style={styles.scoreLabel}>Avg Resolution</Text>
            </View>
          </View>
        </View>

        {/* Navigation Tabs */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'ROOMS' && styles.tabBtnActive]}
            onPress={() => setActiveTab('ROOMS')}
          >
            <Text style={[styles.tabText, activeTab === 'ROOMS' && styles.tabTextActive]}>
              Rooms ({rooms.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'REPUTATION' && styles.tabBtnActive]}
            onPress={() => setActiveTab('REPUTATION')}
          >
            <Text style={[styles.tabText, activeTab === 'REPUTATION' && styles.tabTextActive]}>
              SLA &amp; Rating
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'FOOD' && styles.tabBtnActive]}
            onPress={() => setActiveTab('FOOD')}
          >
            <Text style={[styles.tabText, activeTab === 'FOOD' && styles.tabTextActive]}>
              Food Menu
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'RULES' && styles.tabBtnActive]}
            onPress={() => setActiveTab('RULES')}
          >
            <Text style={[styles.tabText, activeTab === 'RULES' && styles.tabTextActive]}>
              Rules
            </Text>
          </TouchableOpacity>
        </View>

        {/* TAB 1: ROOMS & BEDS */}
        {activeTab === 'ROOMS' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionHeading}>Available Room Types &amp; Beds</Text>
            {rooms.map((room) => {
              const vacantBeds = room.beds.filter((b) => b.status === 'VACANT').length;
              return (
                <View key={room.id} style={styles.roomCard}>
                  <View style={styles.roomCardHeader}>
                    <View>
                      <Text style={styles.roomNumber}>Room {room.roomNumber}</Text>
                      <Text style={styles.roomSub}>
                        Floor {room.floorNumber} • {room.sharingType.replace('_', ' ')}
                      </Text>
                    </View>
                    <Badge
                      label={vacantBeds > 0 ? `${vacantBeds} BEDS VACANT` : 'FULLY OCCUPIED'}
                      variant={vacantBeds > 0 ? 'success' : 'neutral'}
                      size="sm"
                    />
                  </View>

                  <View style={styles.roomAmenitiesRow}>
                    {room.hasAttachedBathroom && (
                      <View style={styles.chip}>
                        <Icon name="Droplets" size={11} color={colors.primary} style={{ marginRight: 3 }} />
                        <Text style={styles.chipText}>Attached Washroom</Text>
                      </View>
                    )}
                    {room.hasAc && (
                      <View style={styles.chip}>
                        <Icon name="Wind" size={11} color={colors.primary} style={{ marginRight: 3 }} />
                        <Text style={styles.chipText}>Split AC</Text>
                      </View>
                    )}
                    {room.hasBalcony && (
                      <View style={styles.chip}>
                        <Icon name="Building2" size={11} color={colors.primary} style={{ marginRight: 3 }} />
                        <Text style={styles.chipText}>Balcony</Text>
                      </View>
                    )}
                  </View>

                  {/* Beds in this room */}
                  <Text style={styles.bedMatrixLabel}>SELECT BED ALLOCATION</Text>
                  <View style={styles.bedsGrid}>
                    {room.beds.map((bed) => (
                      <BedPill
                        key={bed.id}
                        bed={bed}
                        onPress={() => {
                          if (bed.status === 'VACANT') {
                            router.push({
                              pathname: '/(resident)/book/[id]',
                              params: {
                                id: property.id,
                                roomId: room.id,
                                bedId: bed.id,
                                roomNum: room.roomNumber,
                                bedName: bed.bedIdentifier,
                                rent: room.baseRentPerBed,
                                deposit: room.securityDeposit,
                              },
                            } as any);
                          }
                        }}
                      />
                    ))}
                  </View>

                  <View style={styles.roomPricingRow}>
                    <View>
                      <Text style={styles.roomPrice}>
                        ₹{room.baseRentPerBed.toLocaleString('en-IN')}{' '}
                        <Text style={styles.roomPriceUnit}>/ bed / month</Text>
                      </Text>
                      <Text style={styles.depositText}>
                        Deposit: ₹{room.securityDeposit.toLocaleString('en-IN')} (100% Refundable)
                      </Text>
                    </View>

                    {vacantBeds > 0 ? (
                      <Button
                        title="Book Bed"
                        size="sm"
                        onPress={() => {
                          const firstVacant = room.beds.find((b) => b.status === 'VACANT');
                          router.push({
                            pathname: '/(resident)/book/[id]',
                            params: {
                              id: property.id,
                              roomId: room.id,
                              bedId: firstVacant?.id || room.beds[0].id,
                              roomNum: room.roomNumber,
                              bedName: firstVacant?.bedIdentifier || 'Bed-A',
                              rent: room.baseRentPerBed,
                              deposit: room.securityDeposit,
                            },
                          } as any);
                        }}
                        iconRight="ChevronRight"
                      />
                    ) : (
                      <Button title="Join Waitlist" variant="secondary" size="sm" onPress={() => {}} />
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* TAB 2: REPUTATION & SLA GUARANTEES */}
        {activeTab === 'REPUTATION' && (
          <View style={styles.tabContent}>
            <View style={styles.slaPolicyCard}>
              <View style={styles.slaPolicyHeader}>
                <Icon name="ShieldCheck" size={20} color={colors.shieldEmerald} style={{ marginRight: spacing.xs }} />
                <Text style={styles.slaPolicyTitle}>Guaranteed Rent Compensation SLA</Text>
              </View>
              <Text style={styles.slaPolicyDesc}>
                This PG contractually guarantees service resolution times. If any outage is not fixed within the stated SLA, Stayra automatically credits your next rent invoice without negotiation.
              </Text>

              <View style={styles.slaTable}>
                {property.slaPolicies.map((policy, idx) => (
                  <View key={idx} style={styles.slaTableRow}>
                    <View style={styles.slaTableCol1}>
                      <Text style={styles.slaCategory}>{policy.category}</Text>
                      <Text style={styles.slaSeverity}>{policy.severity} SEVERITY</Text>
                    </View>
                    <View style={styles.slaTableCol2}>
                      <Text style={styles.slaHours}>{policy.hours} Hours</Text>
                      <Text style={styles.slaSub}>Target Resolution</Text>
                    </View>
                    <View style={styles.slaTableCol3}>
                      <Text style={styles.slaCredit}>₹{policy.compensationPerDay}/day</Text>
                      <Text style={styles.slaSub}>Auto Rent Credit</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Multidimensional Rating Indices */}
            <Text style={styles.sectionHeading}>Multidimensional Reputation Score</Text>
            <View style={styles.indexCard}>
              <View style={styles.indexRow}>
                <Text style={styles.indexLabel}>Cleanliness &amp; Hygiene</Text>
                <Text style={styles.indexVal}>4.9 / 5.0</Text>
              </View>
              <View style={styles.barBackground}>
                <View style={[styles.barFill, { width: '98%' }]} />
              </View>

              <View style={styles.indexRow}>
                <Text style={styles.indexLabel}>Food &amp; Dining Quality</Text>
                <Text style={styles.indexVal}>4.6 / 5.0</Text>
              </View>
              <View style={styles.barBackground}>
                <View style={[styles.barFill, { width: '92%' }]} />
              </View>

              <View style={styles.indexRow}>
                <Text style={styles.indexLabel}>WiFi &amp; Network Stability</Text>
                <Text style={styles.indexVal}>4.8 / 5.0</Text>
              </View>
              <View style={styles.barBackground}>
                <View style={[styles.barFill, { width: '96%' }]} />
              </View>

              <View style={styles.indexRow}>
                <Text style={styles.indexLabel}>Staff Professionalism</Text>
                <Text style={styles.indexVal}>4.9 / 5.0</Text>
              </View>
              <View style={styles.barBackground}>
                <View style={[styles.barFill, { width: '98%' }]} />
              </View>
            </View>
          </View>
        )}

        {/* TAB 3: FOOD MENU */}
        {activeTab === 'FOOD' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionHeading}>Weekly Dining Schedule &amp; Menu</Text>
            {mockWeeklyFoodMenu.map((dayMenu) => (
              <View key={dayMenu.day} style={styles.foodDayCard}>
                <Text style={styles.foodDayTitle}>{dayMenu.day}</Text>

                <View style={styles.mealRow}>
                  <View style={styles.mealTimeCol}>
                    <Text style={styles.mealName}>Breakfast</Text>
                    <Text style={styles.mealTime}>{dayMenu.breakfast.time}</Text>
                  </View>
                  <View style={styles.mealItemCol}>
                    <Text style={styles.mealItemText}>{dayMenu.breakfast.item}</Text>
                    <Badge label={dayMenu.breakfast.isVeg ? 'VEG' : 'EGG/NON-VEG'} variant={dayMenu.breakfast.isVeg ? 'success' : 'warning'} size="sm" />
                  </View>
                </View>

                <View style={styles.mealRow}>
                  <View style={styles.mealTimeCol}>
                    <Text style={styles.mealName}>Lunch</Text>
                    <Text style={styles.mealTime}>{dayMenu.lunch.time}</Text>
                  </View>
                  <View style={styles.mealItemCol}>
                    <Text style={styles.mealItemText}>{dayMenu.lunch.item}</Text>
                    <Badge label={dayMenu.lunch.isVeg ? 'VEG' : 'NON-VEG'} variant={dayMenu.lunch.isVeg ? 'success' : 'danger'} size="sm" />
                  </View>
                </View>

                <View style={styles.mealRow}>
                  <View style={styles.mealTimeCol}>
                    <Text style={styles.mealName}>Dinner</Text>
                    <Text style={styles.mealTime}>{dayMenu.dinner.time}</Text>
                  </View>
                  <View style={styles.mealItemCol}>
                    <Text style={styles.mealItemText}>{dayMenu.dinner.item}</Text>
                    <Badge label={dayMenu.dinner.isVeg ? 'VEG' : 'SPECIAL NON-VEG'} variant={dayMenu.dinner.isVeg ? 'success' : 'danger'} size="sm" />
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* TAB 4: RULES */}
        {activeTab === 'RULES' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionHeading}>House Rules &amp; Policies</Text>
            <View style={styles.rulesCard}>
              {property.rules.map((rule, idx) => (
                <View key={idx} style={styles.ruleRow}>
                  <Icon name="CheckCircle2" size={16} color={colors.primary} style={{ marginRight: spacing.sm, marginTop: 2 }} />
                  <Text style={styles.ruleText}>{rule}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.sectionHeading}>Verified Property Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {property.amenities.map((amenity) => (
                <View key={amenity.code} style={styles.amenityBox}>
                  <Icon name="ShieldCheck" size={16} color={colors.shieldEmerald} style={{ marginRight: 6 }} />
                  <Text style={styles.amenityBoxText}>{amenity.label}</Text>
                </View>
              ))}
            </View>
          </View>
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
    paddingBottom: spacing.xxl,
  },
  galleryContainer: {
    width: '100%',
    backgroundColor: colors.dark.background,
  },
  mainPhoto: {
    width: '100%',
    height: 240,
  },
  photoTagOverlay: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    right: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  photoIndexText: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
  },
  thumbnailsScroll: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
  },
  thumbnailWrapper: {
    width: 60,
    height: 44,
    borderRadius: borderRadius.sm,
    marginRight: spacing.xs,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  thumbnailWrapperActive: {
    borderColor: colors.primary,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  titleSection: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  title: {
    ...typography.heading1,
    color: colors.text,
  },
  tagline: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  address: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  scoreHighlightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.surfaceSecondary,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  scoreHighlightItem: {
    alignItems: 'center',
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreNumber: {
    ...typography.heading3,
    color: colors.text,
  },
  scoreLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
  scoreDivider: {
    width: 1,
    height: 28,
    backgroundColor: colors.border,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: spacing.sm,
  },
  tabBtn: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabBtnActive: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  tabContent: {
    padding: spacing.md,
  },
  sectionHeading: {
    ...typography.heading3,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  roomCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  roomCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  roomNumber: {
    ...typography.heading2,
    color: colors.text,
  },
  roomSub: {
    ...typography.caption,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
  roomAmenitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSecondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
  },
  chipText: {
    fontSize: 11,
    color: colors.text,
    fontWeight: '500',
  },
  bedMatrixLabel: {
    ...typography.label,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  bedsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  roomPricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  roomPrice: {
    ...typography.heading2,
    color: colors.primary,
  },
  roomPriceUnit: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '400',
  },
  depositText: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 1,
  },
  slaPolicyCard: {
    backgroundColor: '#0F172A',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  slaPolicyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  slaPolicyTitle: {
    ...typography.heading3,
    color: '#FFFFFF',
  },
  slaPolicyDesc: {
    ...typography.bodySmall,
    color: '#94A3B8',
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  slaTable: {
    backgroundColor: '#1E293B',
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  slaTableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  slaTableCol1: {
    flex: 2,
  },
  slaCategory: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  slaSeverity: {
    color: '#60A5FA',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  slaTableCol2: {
    flex: 2,
    alignItems: 'center',
  },
  slaHours: {
    color: '#F8FAFC',
    fontWeight: '700',
    fontSize: 13,
  },
  slaSub: {
    color: '#94A3B8',
    fontSize: 9,
  },
  slaTableCol3: {
    flex: 2,
    alignItems: 'flex-end',
  },
  slaCredit: {
    color: colors.shieldEmerald,
    fontWeight: '800',
    fontSize: 13,
  },
  indexCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  indexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
    marginTop: spacing.xs,
  },
  indexLabel: {
    ...typography.bodySmall,
    color: colors.text,
    fontWeight: '600',
  },
  indexVal: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
  },
  barBackground: {
    height: 6,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  barFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  foodDayCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  foodDayTitle: {
    ...typography.heading3,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  mealRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceSecondary,
  },
  mealTimeCol: {
    width: 90,
  },
  mealName: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
  },
  mealTime: {
    fontSize: 10,
    color: colors.textMuted,
  },
  mealItemCol: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealItemText: {
    ...typography.bodySmall,
    color: colors.text,
    flex: 1,
    paddingRight: spacing.xs,
  },
  rulesCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  ruleText: {
    ...typography.bodySmall,
    color: colors.text,
    flex: 1,
    lineHeight: 20,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  amenityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
    borderRadius: borderRadius.md,
    width: '48%',
  },
  amenityBoxText: {
    ...typography.caption,
    color: colors.text,
    fontWeight: '600',
    flex: 1,
  },
});
