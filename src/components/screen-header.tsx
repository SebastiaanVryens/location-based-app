import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

type ScreenHeaderProps = {
  title: string;
  overline?: string;
  accessory?: ReactNode;
};

export function ScreenHeader({ title, overline, accessory }: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        {overline ? (
          <ThemedText type="overline" color="primary">
            {overline}
          </ThemedText>
        ) : null}
        <ThemedText type="display">{title}</ThemedText>
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
  },
});
