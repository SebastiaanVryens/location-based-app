import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { Icon, Icons } from '@/components/icon';
import { QuantityStepper } from '@/components/quantity-stepper';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { type MenuItem } from '@/types/menu';
import { formatPrice } from '@/utils/format';

type MenuItemRowProps = {
  item: MenuItem;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  // Smaller photo and no description, for the cart.
  compact?: boolean;
};

export function MenuItemRow({
  item,
  quantity,
  onAdd,
  onRemove,
  compact = false,
}: MenuItemRowProps) {
  const theme = useTheme();
  const imageStyle = [styles.image, compact ? styles.imageCompact : styles.imageLarge];

  return (
    <View style={styles.row}>
      {item.image ? (
        <Image source={item.image} contentFit="cover" style={imageStyle} />
      ) : (
        <View style={[imageStyle, styles.placeholder, { backgroundColor: theme.surfaceMuted }]}>
          <Icon name={Icons.food} color="textTertiary" />
        </View>
      )}

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
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    gap: Spacing.xs,
  },
  price: {
    marginTop: Spacing.xs,
  },
});
