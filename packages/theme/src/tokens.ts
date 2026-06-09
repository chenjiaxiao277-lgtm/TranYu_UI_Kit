export const colorTokens = {
  // Primary
  primary: '#5E5CE6',
  primaryLight: '#7B7AF3',
  primaryDark: '#4845B8',

  // Neutral
  neutral0: '#FFFFFF',
  neutral50: '#F8F8FA',
  neutral100: '#F0F0F3',
  neutral200: '#E8E8ED',
  neutral300: '#DCDCE3',
  neutral400: '#BCBCC8',
  neutral500: '#9C9CA8',
  neutral600: '#7C7C88',
  neutral700: '#5C5C64',
  neutral800: '#3C3C40',
  neutral900: '#1C1C20',

  // Status
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3B82F6',

  // State
  disabled: '#D1D5DB',
  error: '#DC2626',
} as const;

export const radiusTokens = {
  none: '0',
  xs: '2px',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  full: '9999px',
} as const;

export const spacingTokens = {
  0: '0',
  1: '2px',
  2: '4px',
  3: '6px',
  4: '8px',
  5: '12px',
  6: '16px',
  7: '20px',
  8: '24px',
  9: '32px',
  10: '40px',
  11: '48px',
  12: '56px',
  13: '64px',
  14: '72px',
  15: '80px',
} as const;

export const shadowTokens = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
} as const;

export const typographyTokens = {
  // Headings
  h1: {
    fontSize: '32px',
    lineHeight: '40px',
    fontWeight: 600,
    letterSpacing: '-0.5px',
  },
  h2: {
    fontSize: '28px',
    lineHeight: '36px',
    fontWeight: 600,
    letterSpacing: '-0.25px',
  },
  h3: {
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: 600,
    letterSpacing: '0',
  },
  h4: {
    fontSize: '20px',
    lineHeight: '28px',
    fontWeight: 600,
    letterSpacing: '0',
  },
  // Body
  bodyLarge: {
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 400,
  },
  bodyMedium: {
    fontSize: '14px',
    lineHeight: '22px',
    fontWeight: 400,
  },
  bodySmall: {
    fontSize: '12px',
    lineHeight: '18px',
    fontWeight: 400,
  },
  // Label
  labelLarge: {
    fontSize: '14px',
    lineHeight: '22px',
    fontWeight: 500,
  },
  labelMedium: {
    fontSize: '12px',
    lineHeight: '18px',
    fontWeight: 500,
  },
  labelSmall: {
    fontSize: '11px',
    lineHeight: '16px',
    fontWeight: 500,
  },
} as const;

export const motionTokens = {
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  slowest: '500ms',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
} as const;

export type ColorToken = keyof typeof colorTokens;
export type RadiusToken = keyof typeof radiusTokens;
export type SpacingToken = keyof typeof spacingTokens;
export type ShadowToken = keyof typeof shadowTokens;
export type MotionToken = keyof typeof motionTokens;
