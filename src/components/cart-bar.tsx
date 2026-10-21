import { Pressable, StyleSheet, View } from 'react-native';

import { Icon, Icons } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Shadow, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatPrice } from '@/utils/format';

type CartBarProps = {
  itemCount: number;
  totalCents: number;
  onPress: () => void;
};

export function CartBar({ itemCount, totalCents, onPress }: CartBarProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`View cart, ${itemCount} items, ${formatPrice(totalCents)}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.bar,
        { backgroundColor: theme.primary },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.count}>
        <Icon name={Icons.bag} color="onPrimary" />
        <ThemedText type="button" color="onPrimary">
          {itemCount}
        </ThemedText>
      </View>
      <ThemedText type="button" color="onPrimary" style={styles.label}>
        View cart
      </ThemedText>
      <ThemedText type="button" color="onPrimary">
        {formatPrice(totalCents)}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
    boxShadow: Shadow.md,
  },
  pressed: {
    opacity: 0.8,
  },
  count: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  label: {
    flex: 1,
    textAlign: 'center',
  },
});
