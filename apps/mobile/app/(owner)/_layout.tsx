import React from 'react';
import { Tabs } from 'expo-router';
import { colors } from '../../src/theme/tokens';
import { Icon } from '../../src/components/common';

export default function OwnerTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Overview',
          tabBarIcon: ({ color, size }) => (
            <Icon name="Building2" size={size || 20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="properties/index"
        options={{
          title: 'Properties',
          tabBarIcon: ({ color, size }) => (
            <Icon name="Bed" size={size || 20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="billing/index"
        options={{
          title: 'Billing',
          tabBarIcon: ({ color, size }) => (
            <Icon name="Receipt" size={size || 20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="complaints/index"
        options={{
          title: 'Maintenance',
          tabBarIcon: ({ color, size }) => (
            <Icon name="Wrench" size={size || 20} color={color} />
          ),
        }}
      />

      {/* Sub-screens (Hidden from bottom tab bar) */}
      <Tabs.Screen
        name="properties/[id]/rooms"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="billing/record-meter"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="complaints/[id]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
