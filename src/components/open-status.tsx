import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function OpenStatus({ isOpen }: { isOpen: boolean }) {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      <View
        style={[styles.dot, { backgroundColor: isOpen ? theme.success : theme.textTertiary }]}
      />
      <ThemedText type="label" color={isOpen ? 'primary' : 'textSecondary'}>
        {isOpen ? 'Open' : 'Closed'}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: Radius.full,
  },
});
