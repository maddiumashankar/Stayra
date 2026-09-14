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
import { useRouter } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '../../../src/theme/tokens';
import { HeaderBar, Icon, Button, Input } from '../../../src/components/common';

export default function RecordMeterScreen() {
  const router = useRouter();

  const [selectedRoom, setSelectedRoom] = useState('Room 102');
  const [previousUnits, setPreviousUnits] = useState(1420);
  const [currentUnits, setCurrentUnits] = useState('1698'); // Represents a +278 unit spike!
  const [hasPhoto, setHasPhoto] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const unitsDiff = Math.max(0, (parseInt(currentUnits) || 0) - previousUnits);
  const unitRate = 10;
  const totalCost = unitsDiff * unitRate;
  const isSpike = unitsDiff > 120; // 3-month avg is ~50 units

  const handleSaveReading = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      Alert.alert(
        'Reading Verified & Saved',
        `${selectedRoom} sub-meter recorded at ${currentUnits} kWh (₹${totalCost.toLocaleString('en-IN')}). Ingested into upcoming monthly bill.`
      );
      router.back();
    }, 800);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBar title="Record Sub-Meter" subtitle="Utility Meter Ingestion" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Room Selector */}
        <View style={styles.card}>
          <Text style={styles.inputLabel}>Select Room</Text>
          <View style={styles.roomSelectorRow}>
            {['Room 102', 'Room 204', 'Room 301'].map((r) => (
              <TouchableOpacity
                key={r}
                onPress={() => {
                  setSelectedRoom(r);
                  if (r === 'Room 102') {
                    setPreviousUnits(1420);
                    setCurrentUnits('1698');
                  } else {
                    setPreviousUnits(1350);
                    setCurrentUnits('1415');
                  }
                }}
                style={[styles.roomPill, selectedRoom === r && styles.roomPillActive]}
              >
                <Text style={[styles.roomText, selectedRoom === r && styles.roomTextActive]}>
                  {r}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Meter Readings */}
          <View style={styles.readingsRow}>
            <View style={styles.readingCol}>
              <Text style={styles.readingLabel}>PREVIOUS READING</Text>
              <Text style={styles.readingVal}>{previousUnits} kWh</Text>
              <Text style={styles.readingDate}>Recorded 1st Aug</Text>
            </View>
            <Icon name="ChevronRight" size={18} color={colors.textMuted} style={{ marginTop: 10 }} />
            <View style={styles.readingCol}>
              <Text style={styles.readingLabel}>NEW READING</Text>
              <Text style={[styles.readingVal, { color: colors.primary }]}>
                {currentUnits || '0'} kWh
              </Text>
              <Text style={styles.readingDate}>Current Cycle</Text>
            </View>
          </View>

          <Input
            label="Enter New Meter Units (kWh)"
            value={currentUnits}
            onChangeText={setCurrentUnits}
            keyboardType="number-pad"
            iconLeft="Zap"
          />

          {/* AI Billing Anomaly Detector Warning */}
          {isSpike && (
            <View style={styles.anomalyCard}>
              <View style={styles.anomalyTop}>
                <Icon name="AlertTriangle" size={16} color={colors.amberDark} style={{ marginRight: 6 }} />
                <Text style={styles.anomalyTitle}>AI BILLING ANOMALY DETECTOR</Text>
              </View>
              <Text style={styles.anomalyMessage}>
                Electricity consumption jumped 320% from 3-month average of 65 units to {unitsDiff} units (₹{totalCost.toLocaleString('en-IN')}).
              </Text>
              <Text style={styles.anomalyRecommendation}>
                Recommendation: Inspect meter photo reading or check for geyser/AC power leakage before publishing invoice.
              </Text>
            </View>
          )}

          {/* Cost Preview */}
          <View style={styles.costBox}>
            <View style={styles.costRow}>
              <Text style={styles.costLabel}>Consumption Delta</Text>
              <Text style={styles.costVal}>{unitsDiff} kWh units</Text>
            </View>
            <View style={styles.costRow}>
              <Text style={styles.costLabel}>Commercial Unit Tariff</Text>
              <Text style={styles.costVal}>₹{unitRate}.00 / unit</Text>
            </View>
            <View style={styles.costDivider} />
            <View style={styles.costRow}>
              <Text style={styles.costTotalLabel}>Total Electricity Charge</Text>
              <Text style={styles.costTotalAmount}>₹{totalCost.toLocaleString('en-IN')}</Text>
            </View>
          </View>

          {/* Camera Photo Upload */}
          <Text style={styles.inputLabel}>Sub-Meter Dial Photo Proof</Text>
          <TouchableOpacity
            style={[styles.cameraBox, hasPhoto && styles.cameraBoxActive]}
            onPress={() => setHasPhoto(!hasPhoto)}
          >
            <Icon
              name={hasPhoto ? 'CheckCircle2' : 'Camera'}
              size={24}
              color={hasPhoto ? colors.success : colors.primary}
              style={{ marginBottom: 4 }}
            />
            <Text style={styles.cameraTitle}>
              {hasPhoto ? 'Dial Photo Verified (reading_1698_ocr.jpg)' : 'Take Photo of Physical Dial'}
            </Text>
            <Text style={styles.cameraSub}>AI OCR extracts numbers automatically</Text>
          </TouchableOpacity>

          <Button
            title="Confirm &amp; Attach to Resident Bill"
            onPress={handleSaveReading}
            loading={submitting}
            size="lg"
            iconRight="Check"
            style={{ marginTop: spacing.md }}
          />
        </View>
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
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  inputLabel: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  roomSelectorRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  roomPill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    backgroundColor: colors.surfaceSecondary,
  },
  roomPillActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  roomText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  roomTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  readingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceSecondary,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  readingCol: {
    alignItems: 'center',
  },
  readingLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  readingVal: {
    ...typography.heading2,
    color: colors.text,
    marginTop: 2,
  },
  readingDate: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  anomalyCard: {
    backgroundColor: colors.amberLight,
    borderWidth: 1.5,
    borderColor: 'rgba(245, 158, 11, 0.4)',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  anomalyTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  anomalyTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.amberDark,
    letterSpacing: 0.6,
  },
  anomalyMessage: {
    ...typography.bodySmall,
    color: colors.text,
    fontWeight: '600',
    marginBottom: 4,
  },
  anomalyRecommendation: {
    ...typography.caption,
    color: colors.amberDark,
    lineHeight: 16,
  },
  costBox: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  costLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  costVal: {
    ...typography.bodySmall,
    fontWeight: '700',
    color: colors.text,
  },
  costDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
  costTotalLabel: {
    ...typography.heading3,
    color: colors.text,
  },
  costTotalAmount: {
    ...typography.heading2,
    color: colors.primary,
  },
  cameraBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.borderStrong,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
  },
  cameraBoxActive: {
    borderColor: colors.success,
    backgroundColor: colors.successLight,
  },
  cameraTitle: {
    ...typography.bodyBold,
    color: colors.text,
  },
  cameraSub: {
    fontSize: 10,
    color: colors.textMuted,
  },
});
