import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '../../src/theme/tokens';
import { Icon } from '../../src/components/common';
import { useStayraStore } from '../../src/stores/useStayraStore';

interface Message {
  id: string;
  sender: 'USER' | 'AI';
  text: string;
  cardType?: 'PROPERTY' | 'CREDIT' | 'OCCUPANCY';
}

export default function AiAssistantModal() {
  const router = useRouter();
  const { currentRole } = useStayraStore();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'AI',
      text:
        currentRole === 'RESIDENT'
          ? "Hello Rohan! I'm your Stayra Living Copilot. You can ask me to search PGs, check food menus, explain bill line items, or track SLA compensation credits."
          : "Hello! I'm your Stayra Owner Copilot. Ask me about occupancy projections, top recurring maintenance issues, or cash flow forecasts across your properties.",
    },
  ]);

  const handleSend = (userText?: string) => {
    const textToSend = userText || input;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'USER',
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Generate intelligent contextual AI response
    setTimeout(() => {
      let aiReply: Message;
      const lower = textToSend.toLowerCase();

      if (lower.includes('credit') || lower.includes('bill') || lower.includes('100')) {
        aiReply = {
          id: (Date.now() + 1).toString(),
          sender: 'AI',
          text:
            'A ₹100 Service Level Compensation Credit was automatically credited to your September invoice (#INV-2026-09-0012) because Ticket #TKT-00392 (WiFi downtime) exceeded the 24h SLA by 4 hours. No manual intervention was required.',
          cardType: 'CREDIT',
        };
      } else if (lower.includes('hsr') || lower.includes('search') || lower.includes('pg')) {
        aiReply = {
          id: (Date.now() + 1).toString(),
          sender: 'AI',
          text:
            'I found 2 top-ranked accommodations in HSR Layout matching your preferences. Stayra Prime (Sector 4) has a 95.8% SLA adherence score, 250 Mbps fiber WiFi, and 2-sharing rooms starting at ₹12,500/mo.',
          cardType: 'PROPERTY',
        };
      } else if (lower.includes('occupancy') || lower.includes('revenue')) {
        aiReply = {
          id: (Date.now() + 1).toString(),
          sender: 'AI',
          text:
            'Your portfolio is operating at 91.7% occupancy (88 occupied out of 96 total beds across 3 branches). Projected revenue for next month is ₹11.2L with only 8 beds currently vacant.',
          cardType: 'OCCUPANCY',
        };
      } else {
        aiReply = {
          id: (Date.now() + 1).toString(),
          sender: 'AI',
          text:
            "Today's dinner at Stayra Prime is Kadai Veg, Paneer Butter Masala, Fresh Rotis, Jeera Rice, and Gulab Jamun (8:00 PM – 10:00 PM on Floor 4 Terrace).",
        };
      }

      setMessages((prev) => [...prev, aiReply]);
    }, 700);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Modal Header */}
        <View style={styles.header}>
          <View style={styles.headerTitleRow}>
            <View style={styles.aiAvatar}>
              <Icon name="Sparkles" size={16} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.title}>Stayra Copilot</Text>
              <Text style={styles.subtitle}>AI-Native Accommodations Assistant</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
            <Icon name="X" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Conversation Stream */}
        <ScrollView contentContainerStyle={styles.chatStream} showsVerticalScrollIndicator={false}>
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageRow,
                msg.sender === 'USER' ? styles.userRow : styles.aiRow,
              ]}
            >
              {msg.sender === 'AI' && (
                <View style={styles.botIcon}>
                  <Icon name="Sparkles" size={14} color={colors.primary} />
                </View>
              )}
              <View
                style={[
                  styles.bubble,
                  msg.sender === 'USER' ? styles.userBubble : styles.aiBubble,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    msg.sender === 'USER' && styles.userText,
                  ]}
                >
                  {msg.text}
                </Text>

                {/* Rich Card Attachment in AI Message */}
                {msg.cardType === 'CREDIT' && (
                  <View style={styles.richCard}>
                    <View style={styles.richCardHeader}>
                      <Icon name="ShieldCheck" size={14} color={colors.shieldEmerald} style={{ marginRight: 4 }} />
                      <Text style={styles.richCardTitle}>₹100 Rent Credit Applied</Text>
                    </View>
                    <Text style={styles.richCardSub}>Posted to ledger: 12th Sep 2026 • Ticket #TKT-00392</Text>
                  </View>
                )}

                {msg.cardType === 'OCCUPANCY' && (
                  <View style={styles.richCard}>
                    <View style={styles.richCardHeader}>
                      <Icon name="TrendingUp" size={14} color={colors.primary} style={{ marginRight: 4 }} />
                      <Text style={styles.richCardTitle}>Portfolio: 91.7% Occupancy</Text>
                    </View>
                    <Text style={styles.richCardSub}>88 of 96 beds occupied • ₹11.2L projected revenue</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Quick Suggestion Prompts */}
        <View style={styles.suggestionsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestionsScroll}>
            {currentRole === 'RESIDENT' ? (
              <>
                <TouchableOpacity
                  style={styles.suggestionPill}
                  onPress={() => handleSend('Why was ₹100 deducted from my bill?')}
                >
                  <Text style={styles.suggestionText}>Why was ₹100 deducted?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.suggestionPill}
                  onPress={() => handleSend('What is today dinner menu?')}
                >
                  <Text style={styles.suggestionText}>What is today's dinner?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.suggestionPill}
                  onPress={() => handleSend('Find 2-sharing room in HSR')}
                >
                  <Text style={styles.suggestionText}>Find 2-sharing in HSR</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.suggestionPill}
                  onPress={() => handleSend('Show my occupancy and revenue metrics')}
                >
                  <Text style={styles.suggestionText}>Show occupancy metrics</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.suggestionPill}
                  onPress={() => handleSend('Check pending rent balances')}
                >
                  <Text style={styles.suggestionText}>Check pending rent</Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </View>

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <TextInput
            style={styles.textInput}
            placeholder="Ask Copilot anything..."
            placeholderTextColor={colors.textMuted}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => handleSend()}
          />
          <TouchableOpacity
            style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
            onPress={() => handleSend()}
            disabled={!input.trim()}
          >
            <Icon name="ArrowUpRight" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  title: {
    ...typography.bodyBold,
    color: colors.text,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 10,
  },
  closeBtn: {
    padding: spacing.xs,
  },
  chatStream: {
    padding: spacing.md,
    paddingBottom: spacing.sm,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    alignItems: 'flex-start',
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  aiRow: {
    justifyContent: 'flex-start',
  },
  botIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.xs,
    marginTop: 2,
  },
  bubble: {
    maxWidth: '82%',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
  },
  userBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 2,
  },
  aiBubble: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomLeftRadius: 2,
    ...shadows.sm,
  },
  messageText: {
    ...typography.bodySmall,
    color: colors.text,
    lineHeight: 20,
  },
  userText: {
    color: '#FFFFFF',
  },
  richCard: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginTop: spacing.sm,
  },
  richCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  richCardTitle: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.text,
  },
  richCardSub: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  suggestionsContainer: {
    paddingVertical: spacing.xs,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  suggestionsScroll: {
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
  },
  suggestionPill: {
    backgroundColor: colors.surfaceSecondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  suggestionText: {
    ...typography.caption,
    color: colors.primary,
    fontSize: 11,
    fontWeight: '600',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.sm,
  },
  textInput: {
    flex: 1,
    height: 44,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    ...typography.body,
    color: colors.text,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: colors.surfaceTertiary,
  },
});
