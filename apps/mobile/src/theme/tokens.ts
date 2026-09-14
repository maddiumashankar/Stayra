/**
 * Stayra Design System Tokens
 * Derived from the official Stayra brand icon:
 * - Brand Blue: #1E5BF0
 * - Trust Shield Gradient: #06B6D4 -> #10B981
 * - Warm Accent: #F59E0B
 * - Premium Canvas: Slate #0F172A (dark) & #F8FAFC (light)
 */

export const colors = {
  // Core Brand Tokens
  primary: '#1E5BF0',
  primaryHover: '#1648C7',
  primaryActive: '#0F3BB8',
  primaryLight: '#EFF6FF',
  primaryMuted: '#93C5FD',

  // Shield Trust Accents
  shieldEmerald: '#10B981',
  shieldCyan: '#06B6D4',
  shieldGradient: ['#06B6D4', '#10B981'] as const,

  // Warm Accents (Windows / Ratings / Warnings)
  amber: '#F59E0B',
  amberLight: '#FFFBEB',
  amberDark: '#D97706',

  // Semantic Status Tokens
  success: '#10B981',
  successLight: '#ECFDF5',
  successDark: '#059669',

  warning: '#F59E0B',
  warningLight: '#FFFBEB',
  warningDark: '#D97706',

  danger: '#EF4444',
  dangerLight: '#FEF2F2',
  dangerDark: '#DC2626',

  info: '#0284C7',
  infoLight: '#F0F9FF',
  infoDark: '#0369A1',

  // Light Mode Surfaces & Neutrals
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceSecondary: '#F1F5F9',
  surfaceTertiary: '#E2E8F0',
  border: '#E2E8F0',
  borderStrong: '#CBD5E1',

  text: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#94A3B8',

  // Dark Mode Tokens
  dark: {
    background: '#090D16',
    surface: '#111827',
    surfaceSecondary: '#1E293B',
    surfaceTertiary: '#334155',
    border: '#1F2937',
    borderStrong: '#374151',
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
  },
};

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
};

export const borderRadius = {
  xs: 4,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  xxl: 28,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  md: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  lg: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 6,
  },
  primaryGlow: {
    shadowColor: '#1E5BF0',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
    elevation: 6,
  },
};

export const typography = {
  display: {
    fontSize: 28,
    fontWeight: '800' as const,
    lineHeight: 34,
    letterSpacing: -0.7,
  },
  heading1: {
    fontSize: 23,
    fontWeight: '700' as const,
    lineHeight: 29,
    letterSpacing: -0.5,
  },
  heading2: {
    fontSize: 19,
    fontWeight: '700' as const,
    lineHeight: 25,
    letterSpacing: -0.4,
  },
  heading3: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 22,
    letterSpacing: -0.2,
  },
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  bodyMedium: {
    fontSize: 15,
    fontWeight: '500' as const,
    lineHeight: 22,
  },
  bodyBold: {
    fontSize: 15,
    fontWeight: '600' as const,
    lineHeight: 22,
  },
  bodySmall: {
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 18,
  },
  bodySmallMedium: {
    fontSize: 13,
    fontWeight: '500' as const,
    lineHeight: 18,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
  },
  label: {
    fontSize: 11,
    fontWeight: '700' as const,
    lineHeight: 14,
    letterSpacing: 0.6,
    textTransform: 'uppercase' as const,
  },
  button: {
    fontSize: 15,
    fontWeight: '600' as const,
    lineHeight: 20,
  },
  metric: {
    fontSize: 26,
    fontWeight: '800' as const,
    lineHeight: 32,
    letterSpacing: -0.5,
  },
};
