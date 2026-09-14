import React from 'react';
import { Tabs } from 'expo-router';
import { colors } from '../../src/theme/tokens';
import { Icon } from '../../src/components/common';

export default function ResidentTabsLayout() {
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
      {/* 5 Main Bottom Navigation Tabs */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, size }) => (
            <Icon name="Search" size={size || 20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-stay/index"
        options={{
          title: 'My Stay',
          tabBarIcon: ({ color, size }) => (
            <Icon name="Home" size={size || 20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bills/index"
        options={{
          title: 'Bills',
          tabBarIcon: ({ color, size }) => (
            <Icon name="CreditCard" size={size || 20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="complaints/index"
        options={{
          title: 'Tickets',
          tabBarIcon: ({ color, size }) => (
            <Icon name="Wrench" size={size || 20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="User" size={size || 20} color={color} />
          ),
        }}
      />

      {/* Sub-screens (Hidden from bottom tab bar) */}
      <Tabs.Screen
        name="pg/[id]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="book/[id]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="my-stay/agreement"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="my-stay/move-out"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="bills/[id]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="complaints/new"
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
