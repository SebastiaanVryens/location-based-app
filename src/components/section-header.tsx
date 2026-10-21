import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

type SectionHeaderProps = {
  title: string;
  overline?: string;
  subtitle?: string;
  accessory?: ReactNode;
};

export function SectionHeader({ title, overline, subtitle, accessory }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        {overline ? (
          <ThemedText type="overline" color="primary">
            {overline}
          </ThemedText>
        ) : null}
        <ThemedText type="title">{title}</ThemedText>
        {subtitle ? (
          <ThemedText type="caption" color="textSecondary">
            {subtitle}
          </ThemedText>
        ) : null}
      </View>
      {accessory}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  text: {
    flex: 1,
    gap: Spacing.xs,
  },
});
