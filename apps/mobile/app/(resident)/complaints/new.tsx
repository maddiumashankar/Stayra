import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, spacing, borderRadius } from '../../../src/theme/tokens';
import { HeaderBar, Icon, Button, Input } from '../../../src/components/common';
import { useStayraStore } from '../../../src/stores/useStayraStore';
import { Complaint } from '../../../src/data/mockData';

const CATEGORIES: { code: Complaint['category']; label: string; icon: any; defaultSla: number }[] = [
  { code: 'WIFI', label: 'WiFi / Internet', icon: 'Wifi', defaultSla: 24 },
  { code: 'ELECTRICITY', label: 'Power & Appliances', icon: 'Zap', defaultSla: 4 },
  { code: 'WATER', label: 'Water Supply', icon: 'Droplets', defaultSla: 4 },
  { code: 'AC', label: 'Air Conditioning', icon: 'Wind', defaultSla: 24 },
  { code: 'PLUMBING', label: 'Plumbing & Leakage', icon: 'Wrench', defaultSla: 24 },
  { code: 'HOUSEKEEPING', label: 'Room Cleaning', icon: 'Sparkles', defaultSla: 12 },
];

export default function NewComplaintScreen() {
  const router = useRouter();
  const { activeTenancy, addComplaint } = useStayraStore();

  const [category, setCategory] = useState<Complaint['category']>('ELECTRICITY');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Quick suggestions
  const handleQuickSuggestion = (suggestedTitle: string, suggestedDesc: string, cat: Complaint['category']) => {
    setTitle(suggestedTitle);
    setDescription(suggestedDesc);
    setCategory(cat);
  };

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Required Fields', 'Please provide a brief title and issue description.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);

      const targetDate = new Date();
      targetDate.setHours(targetDate.getHours() + (category === 'ELECTRICITY' || category === 'WATER' ? 4 : 24));

      addComplaint({
        tenancyId: activeTenancy.id,
        propertyId: activeTenancy.propertyId,
        propertyName: activeTenancy.propertyName,
        roomNumber: activeTenancy.roomNumber,
        residentName: activeTenancy.residentName,
        category,
        severity: category === 'ELECTRICITY' || category === 'WATER' ? 'CRITICAL' : 'HIGH',
        status: 'ASSIGNED',
        title,
        description,
        slaTargetTime: targetDate.toISOString(),
        assignedStaff: {
          name: category === 'ELECTRICITY' ? 'Ramesh Sharma' : 'Manoj Kumar',
          role: category === 'ELECTRICITY' ? 'Certified Electrician' : 'Senior Maintenance',
          phone: '+91 98451 99887',
          avatarUrl: '',
        },
        photoAttachments: hasPhoto ? ['https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80'] : [],
      });

      Alert.alert(
        'Ticket Created & SLA Active!',
        `Your ticket has been logged and assigned. The SLA resolution countdown is now live.`
      );
      router.back();
    }, 800);
  };

  const selectedCategoryObj = CATEGORIES.find((c) => c.code === category) || CATEGORIES[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBar title="Raise Maintenance Ticket" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Quick Suggestion Chips */}
        <Text style={styles.sectionHeader}>Quick Issue Templates</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickScroll}>
          <TouchableOpacity
            style={styles.quickChip}
            onPress={() =>
              handleQuickSuggestion(
                'Geyser sparking and tripping MCB',
                'Water heater in bathroom tripped the main fuse and smells burnt.',
                'ELECTRICITY'
              )
            }
          >
            <Text style={styles.quickChipText}>⚡ Geyser Tripping</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickChip}
            onPress={() =>
              handleQuickSuggestion(
                'WiFi high packet loss & dropouts',
                'Floor 2 router keeps dropping connection during office video calls.',
                'WIFI'
              )
            }
          >
            <Text style={styles.quickChipText}>📶 WiFi Dropout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickChip}
            onPress={() =>
              handleQuickSuggestion(
                'AC not cooling in Room 204',
                'Split AC compressor is running but only blowing room-temperature air.',
                'AC'
              )
            }
          >
            <Text style={styles.quickChipText}>❄️ AC Cooling Low</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Category Picker */}
        <Text style={[styles.sectionHeader, { marginTop: spacing.md }]}>Select Category</Text>
        <View style={styles.categoryGrid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.code}
              onPress={() => setCategory(cat.code)}
              style={[
                styles.categoryCard,
                category === cat.code && styles.categoryCardActive,
              ]}
              activeOpacity={0.8}
            >
              <Icon
                name={cat.icon}
                size={20}
                color={category === cat.code ? '#FFFFFF' : colors.primary}
                style={{ marginBottom: 4 }}
              />
              <Text
                style={[
                  styles.categoryText,
                  category === cat.code && styles.categoryTextActive,
                ]}
              >
                {cat.label}
              </Text>
              <Text
                style={[
                  styles.categorySla,
                  category === cat.code && styles.categorySlaActive,
                ]}
              >
                {cat.defaultSla}h SLA
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* AI Classifier Smart Triage Banner */}
        <View style={styles.aiTriageBanner}>
          <View style={styles.aiHeaderRow}>
            <Icon name="Sparkles" size={14} color={colors.primary} style={{ marginRight: 4 }} />
            <Text style={styles.aiTitle}>AI TICKET TRIAGE &amp; AUTO-ASSIGNMENT</Text>
          </View>
          <Text style={styles.aiBody}>
            Mapped to <Text style={{ fontWeight: '700' }}>{category}</Text> • Guaranteed Target SLA:{' '}
            <Text style={{ fontWeight: '700', color: colors.primary }}>{selectedCategoryObj.defaultSla} Hours</Text> • If unresolved, ₹100/day credit automatically triggers.
          </Text>
        </View>

        {/* Form Inputs */}
        <Input
          label="Issue Title"
          placeholder="Brief summary of the issue"
          value={title}
          onChangeText={setTitle}
        />

        <View style={{ marginBottom: spacing.md }}>
          <Text style={styles.inputLabel}>Detailed Description</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Explain what happened, room location, and urgency..."
            placeholderTextColor={colors.textMuted}
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />
        </View>

        {/* Photo Attachment Simulation */}
        <Text style={styles.inputLabel}>Media Proof (Optional)</Text>
        <TouchableOpacity
          style={[styles.attachBox, hasPhoto && styles.attachBoxActive]}
          onPress={() => setHasPhoto(!hasPhoto)}
          activeOpacity={0.8}
        >
          <Icon
            name={hasPhoto ? 'CheckCircle2' : 'Camera'}
            size={22}
            color={hasPhoto ? colors.success : colors.primary}
            style={{ marginRight: spacing.sm }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.attachTitle}>
              {hasPhoto ? 'Photo Attached (evidence_01.jpg)' : 'Take Photo or Upload Image'}
            </Text>
            <Text style={styles.attachSub}>
              Helps assigned technician bring correct replacement parts
            </Text>
          </View>
        </TouchableOpacity>

        {/* Submit */}
        <Button
          title="Submit Ticket &amp; Start SLA Countdown"
          onPress={handleSubmit}
          loading={submitting}
          size="lg"
          iconRight="ChevronRight"
          style={{ marginTop: spacing.md }}
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
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
  },
  sectionHeader: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
    letterSpacing: 0.5,
  },
  quickScroll: {
    gap: spacing.xs,
    paddingVertical: 2,
    marginBottom: spacing.xs,
  },
  quickChip: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
  },
  quickChipText: {
    fontSize: 11,
    color: colors.text,
    fontWeight: '600',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  categoryCard: {
    width: '31.5%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingVertical: spacing.sm,
    paddingHorizontal: 4,
    alignItems: 'center',
  },
  categoryCardActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  categorySla: {
    fontSize: 9,
    color: colors.textMuted,
    marginTop: 2,
  },
  categorySlaActive: {
    color: '#BFDBFE',
  },
  aiTriageBanner: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: 'rgba(30, 91, 240, 0.2)',
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  aiHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  aiTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  aiBody: {
    fontSize: 11,
    color: colors.text,
    lineHeight: 16,
  },
  inputLabel: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  textArea: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    height: 100,
    textAlignVertical: 'top',
    ...typography.body,
    color: colors.text,
  },
  attachBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  attachBoxActive: {
    borderColor: colors.success,
    backgroundColor: colors.successLight,
  },
  attachTitle: {
    ...typography.bodyBold,
    color: colors.text,
  },
  attachSub: {
    fontSize: 10,
    color: colors.textMuted,
  },
});
