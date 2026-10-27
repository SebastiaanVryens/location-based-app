import { StyleSheet, View } from 'react-native';

import { Photo } from '@/components/photo';
import { QuantityStepper } from '@/components/quantity-stepper';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { type MenuItem } from '@/types/menu';
import { formatPrice } from '@/utils/format';

type MenuItemRowProps = {
  item: MenuItem;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  compact?: boolean;
};

export function MenuItemRow({
  item,
  quantity,
  onAdd,
  onRemove,
  compact = false,
}: MenuItemRowProps) {
  return (
    <View style={styles.row}>
      <Photo
        source={item.image}
        style={[styles.image, compact ? styles.imageCompact : styles.imageLarge]}
      />

      <View style={styles.info}>
        <ThemedText type="itemTitle">{item.name}</ThemedText>
        {compact ? null : (
          <ThemedText type="small" color="textSecondary">
            {item.description}
          </ThemedText>
        )}
        <ThemedText type="body" weight="bold" style={styles.price}>
          {formatPrice(item.priceCents)}
        </ThemedText>
      </View>

      <QuantityStepper quantity={quantity} onIncrease={onAdd} onDecrease={onRemove} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
  },
  image: {
    borderRadius: Radius.md,
    borderCurve: 'continuous',
  },
  imageLarge: {
    width: 88,
    height: 88,
  },
  imageCompact: {
    width: 56,
    height: 56,
  },
  info: {
    flex: 1,
    gap: Spacing.xs,
  },
  price: {
    marginTop: Spacing.xs,
  },
});
