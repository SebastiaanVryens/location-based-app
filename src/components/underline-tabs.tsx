import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type UnderlineTabsProps<T extends string> = {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
};

// A row of text tabs that scrolls sideways when there are many. The selected one is underlined.
export function UnderlineTabs<T extends string>({
  options,
  value,
  onChange,
}: UnderlineTabsProps<T>) {
  const theme = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.container, { borderBottomColor: theme.border }]}
      contentContainerStyle={styles.tabs}
    >
      {options.map((option) => {
        const isSelected = option === value;

        return (
          <Pressable
            key={option}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected }}
            onPress={() => onChange(option)}
            style={[styles.tab, { borderBottomColor: isSelected ? theme.primary : 'transparent' }]}
          >
            <ThemedText type="label" color={isSelected ? 'text' : 'textSecondary'}>
              {option}
            </ThemedText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tabs: {
    gap: Spacing.xl,
  },
  tab: {
    paddingVertical: Spacing.sm,
    borderBottomWidth: 2,
  },
});
