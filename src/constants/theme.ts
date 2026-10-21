import type { TextStyle } from 'react-native';

export const Colors = {
  light: {
    text: '#18332C',
    textSecondary: '#6F7F7A',
    textTertiary: '#A1ABA7',
    primary: '#176B52',
    onPrimary: '#FFFFFF',
    onPrimarySecondary: 'rgba(255, 255, 255, 0.75)',
    onPrimaryTint: 'rgba(255, 255, 255, 0.15)',
    primarySoft: '#E5F2EC',
    success: '#2D9D72',
    surfaceInverse: '#18332C',
    onInverse: '#FFFFFF',
    onInverseSecondary: 'rgba(255, 255, 255, 0.6)',
    accentCream: '#F6EEE1',
    onAccent: '#18332C',
    background: '#FAFBF9',
    surface: '#FFFFFF',
    surfaceMuted: '#EEF2EF',
    border: '#E4E9E6',
  },
  dark: {
    text: '#E8EFEC',
    textSecondary: '#9AABA5',
    textTertiary: '#6B7A75',
    primary: '#4CBF95',
    onPrimary: '#0B1F18',
    onPrimarySecondary: 'rgba(11, 31, 24, 0.7)',
    onPrimaryTint: 'rgba(11, 31, 24, 0.12)',
    primarySoft: '#1C3A30',
    success: '#4CC795',
    surfaceInverse: '#1F3A31',
    onInverse: '#FFFFFF',
    onInverseSecondary: 'rgba(255, 255, 255, 0.6)',
    accentCream: '#E9DFCE',
    onAccent: '#18332C',
    background: '#0E1412',
    surface: '#18201D',
    surfaceMuted: '#202A26',
    border: '#2A3531',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const FontFamily = {
  regular: 'DMSans_400Regular',
  bold: 'DMSans_700Bold',
  extraBold: 'DMSans_800ExtraBold',
} as const;

export const Typography = {
  display: { fontFamily: FontFamily.regular, fontSize: 28, lineHeight: 34, letterSpacing: -1.1 },
  title: { fontFamily: FontFamily.regular, fontSize: 20, lineHeight: 26, letterSpacing: -0.6 },
  section: { fontFamily: FontFamily.regular, fontSize: 16, lineHeight: 22 },
  button: { fontFamily: FontFamily.bold, fontSize: 16, lineHeight: 22 },
  itemTitle: { fontFamily: FontFamily.bold, fontSize: 14, lineHeight: 20 },
  body: { fontFamily: FontFamily.regular, fontSize: 13, lineHeight: 18 },
  label: { fontFamily: FontFamily.bold, fontSize: 12, lineHeight: 16 },
  caption: { fontFamily: FontFamily.regular, fontSize: 12, lineHeight: 16 },
  small: { fontFamily: FontFamily.regular, fontSize: 11, lineHeight: 15 },
  overline: {
    fontFamily: FontFamily.extraBold,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 1.3,
    textTransform: 'uppercase',
  },
} as const satisfies Record<string, TextStyle>;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const Radius = {
  sm: 10,
  md: 16,
  lg: 22,
  full: 999,
} as const;

export const Shadow = {
  sm: '0 1px 3px rgba(24, 51, 44, 0.12)',
  md: '0 8px 24px rgba(24, 51, 44, 0.14)',
} as const;

export const IconSize = {
  sm: 12,
  md: 18,
  lg: 22,
} as const;
