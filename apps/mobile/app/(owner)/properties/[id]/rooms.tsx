import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '../../../../src/theme/tokens';
import { HeaderBar, Badge, Button, BedPill } from '../../../../src/components/common';
import { mockProperties, mockRooms, Bed } from '../../../../src/data/mockData';

export default function BedGridScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const propertyId = (params.id as string) || 'prop-hsr-01';

  const property =
    mockProperties.find((p) => p.id === propertyId) || mockProperties[0];
  const allRooms = mockRooms.filter((r) => r.propertyId === property.id);

  const [selectedFloor, setSelectedFloor] = useState<number>(2);
  const [selectedBed, setSelectedBed] = useState<Bed | null>(allRooms[0]?.beds[0] || null);

  const floorRooms = allRooms.filter((r) => r.floorNumber === selectedFloor);

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBar title="Bed Allocation Matrix" subtitle={property.name} showBack />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Floor Switcher */}
        <View style={styles.floorRow}>
          {[1, 2, 3].map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setSelectedFloor(f)}
              style={[styles.floorPill, selectedFloor === f && styles.floorPillActive]}
            >
              <Text style={[styles.floorText, selectedFloor === f && styles.floorTextActive]}>
                Floor {f}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Legend */}
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.success }]} />
            <Text style={styles.legendText}>Vacant</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
            <Text style={styles.legendText}>Occupied</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.amber }]} />
            <Text style={styles.legendText}>Reserved</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.textMuted }]} />
            <Text style={styles.legendText}>Maintenance</Text>
          </View>
        </View>

        {/* Rooms Grid for Selected Floor */}
        <View style={styles.roomsContainer}>
          {floorRooms.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>No rooms configured for Floor {selectedFloor}.</Text>
            </View>
          ) : (
            floorRooms.map((room) => (
              <View key={room.id} style={styles.roomCard}>
                <View style={styles.roomHeader}>
                  <View>
                    <Text style={styles.roomTitle}>Room {room.roomNumber}</Text>
                    <Text style={styles.roomSub}>
                      {room.sharingType.replace('_', ' ')} • ₹{room.baseRentPerBed.toLocaleString('en-IN')}/bed
                    </Text>
                  </View>
                  <Badge
                    label={`${room.beds.filter((b) => b.status === 'VACANT').length} Vacant`}
                    variant={room.beds.some((b) => b.status === 'VACANT') ? 'success' : 'neutral'}
                    size="sm"
                  />
                </View>

                {/* Bed Pills */}
                <View style={styles.bedsGrid}>
                  {room.beds.map((bed) => (
                    <BedPill
                      key={bed.id}
                      bed={bed}
                      isSelected={selectedBed?.id === bed.id}
                      showTenantName
                      onPress={() => setSelectedBed(bed)}
                    />
                  ))}
                </View>
              </View>
            ))
          )}
        </View>

        {/* Bed Inspector Drawer / Bottom Card */}
        {selectedBed && (
          <View style={styles.inspectorCard}>
            <View style={styles.inspectorHeader}>
              <View>
                <Text style={styles.inspectorTitle}>{selectedBed.bedIdentifier}</Text>
                <Text style={styles.inspectorStatus}>Status: {selectedBed.status}</Text>
              </View>
              <Badge
                label={selectedBed.status}
                variant={
                  selectedBed.status === 'VACANT'
                    ? 'success'
                    : selectedBed.status === 'OCCUPIED'
                    ? 'brand'
                    : 'warning'
                }
                size="md"
              />
            </View>

            {selectedBed.tenant ? (
              <View style={styles.tenantInfoBox}>
                <Text style={styles.tenantSectionLabel}>CURRENT TENANT</Text>
                <Text style={styles.tenantName}>{selectedBed.tenant.name}</Text>
                <Text style={styles.tenantMeta}>
                  {selectedBed.tenant.workplace} • Resident ID: {selectedBed.tenant.residentId}
                </Text>
                <Text style={styles.tenantMoveIn}>Move-in Date: {selectedBed.tenant.moveInDate}</Text>

                <View style={styles.inspectorActions}>
                  <Button
                    title="View Ledger &amp; Agreement"
                    variant="outline"
                    size="sm"
                    onPress={() => router.push('/(owner)/billing' as any)}
                    style={{ flex: 1 }}
                  />
                  <Button
                    title="Raise Maintenance"
                    variant="secondary"
                    size="sm"
                    onPress={() => router.push('/(owner)/complaints' as any)}
                    style={{ flex: 1 }}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.vacantActionBox}>
                <Text style={styles.vacantPrompt}>This bed is currently vacant and ready for occupancy.</Text>
                <Button
                  title="Assign Incoming Tenant"
                  size="md"
                  onPress={() => Alert.alert('Tenant Allocation', 'Select an approved applicant from the tenancy queue.')}
                />
              </View>
            )}
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
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
  },
  floorRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  floorPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  floorPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  floorText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '700',
  },
  floorTextActive: {
    color: '#FFFFFF',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  legendText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  roomsContainer: {
    marginBottom: spacing.md,
  },
  emptyCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textSecondary,
  },
  roomCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  roomTitle: {
    ...typography.heading3,
    color: colors.text,
  },
  roomSub: {
    ...typography.caption,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
  bedsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  inspectorCard: {
    backgroundColor: '#0F172A',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.lg,
    marginTop: spacing.xs,
  },
  inspectorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    paddingBottom: spacing.sm,
    marginBottom: spacing.sm,
  },
  inspectorTitle: {
    ...typography.heading2,
    color: '#FFFFFF',
  },
  inspectorStatus: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
  tenantInfoBox: {},
  tenantSectionLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#60A5FA',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  tenantName: {
    ...typography.heading3,
    color: '#FFFFFF',
  },
  tenantMeta: {
    fontSize: 11,
    color: '#CBD5E1',
    marginTop: 1,
  },
  tenantMoveIn: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
    marginBottom: spacing.md,
  },
  inspectorActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  vacantActionBox: {
    paddingVertical: spacing.sm,
  },
  vacantPrompt: {
    color: '#94A3B8',
    fontSize: 12,
    marginBottom: spacing.md,
  },
});
