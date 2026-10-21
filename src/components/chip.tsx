import { StyleSheet, View } from 'react-native';

import { Icon, type IconName } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing, type ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ChipVariant = 'primary' | 'neutral';

const VARIANTS: Record<ChipVariant, { background: ThemeColor; text: ThemeColor }> = {
  primary: { background: 'primarySoft', text: 'primary' },
  neutral: { background: 'surfaceMuted', text: 'textSecondary' },
};

type ChipProps = {
  label: string;
  icon?: IconName;
  variant?: ChipVariant;
};

export function Chip({ label, icon, variant = 'primary' }: ChipProps) {
  const theme = useTheme();
  const colors = VARIANTS[variant];

  return (
    <View style={[styles.chip, { backgroundColor: theme[colors.background] }]}>
      {icon ? <Icon name={icon} size="sm" color={colors.text} /> : null}
      <ThemedText type="label" color={colors.text}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
  },
});
