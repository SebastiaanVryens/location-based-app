import { StyleSheet, View } from 'react-native';

import { Icon, Icons } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Shadow, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type MapPinProps = {
  label: string;
  selected?: boolean;
};

export function MapPin({ label, selected = false }: MapPinProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.pin, { backgroundColor: selected ? theme.primary : theme.surface }]}>
        <View style={styles.uprightIcon}>
          <Icon name={Icons.star} size="sm" color={selected ? 'onPrimary' : 'primary'} />
        </View>
      </View>
      <View style={[styles.label, { backgroundColor: theme.surface }]}>
        <ThemedText type="small" weight="bold">
          {label}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Spacing.sm,
    // Room for the rotated pin and shadows, which Android would otherwise clip.
    padding: Spacing.sm,
  },
  // A circle with one square corner, turned 45° so the square corner points down.
  pin: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    borderBottomLeftRadius: 0,
    transform: [{ rotate: '-45deg' }],
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: Shadow.sm,
  },
  uprightIcon: {
    transform: [{ rotate: '45deg' }],
  },
  label: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.full,
    boxShadow: Shadow.sm,
  },
});
