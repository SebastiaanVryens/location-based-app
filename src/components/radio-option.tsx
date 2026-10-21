import { type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type RadioOptionProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  // Shown before the label, e.g. a payment logo.
  leading?: ReactNode;
};

// One choice in a list where only one can be picked.
export function RadioOption({ label, selected, onPress, leading }: RadioOptionProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={[
        styles.option,
        { backgroundColor: theme.surface, borderColor: selected ? theme.primary : theme.border },
      ]}
    >
      {leading}
      <ThemedText type="section" style={styles.label}>
        {label}
      </ThemedText>
      <View style={[styles.radio, { borderColor: selected ? theme.primary : theme.textTertiary }]}>
        {selected ? <View style={[styles.radioDot, { backgroundColor: theme.primary }]} /> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.lg,
    borderWidth: 1.5,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
  },
  label: {
    flex: 1,
  },
  radio: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: Radius.full,
  },
});
