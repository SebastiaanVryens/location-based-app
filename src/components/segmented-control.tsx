import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Shadow, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SegmentedControlProps<T extends string> = {
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  const theme = useTheme();

  return (
    <View style={[styles.track, { backgroundColor: theme.surfaceMuted }]}>
      {options.map((option) => {
        const isSelected = option.value === value;

        return (
          <Pressable
            key={option.value}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            onPress={() => onChange(option.value)}
            style={[
              styles.segment,
              isSelected && [styles.selected, { backgroundColor: theme.surface }],
            ]}
          >
            <ThemedText type="label" color={isSelected ? 'text' : 'textSecondary'}>
              {option.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}

const TRACK_PADDING = 3;

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    padding: TRACK_PADDING,
    borderRadius: Radius.sm,
    borderCurve: 'continuous',
  },
  segment: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    // Inner radius = outer radius - padding, so both corners curve around the same point.
    borderRadius: Radius.sm - TRACK_PADDING,
    borderCurve: 'continuous',
  },
  selected: {
    boxShadow: Shadow.sm,
  },
});
