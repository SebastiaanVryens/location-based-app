import { Chip } from '@/components/chip';
import { RowCard } from '@/components/row-card';
import { ThemedText } from '@/components/themed-text';
import { type Order } from '@/types/order';
import { formatItemCount, formatPrice, formatShortDate } from '@/utils/format';
import { countItems, getStatusLabel } from '@/utils/order-status';

type OrderRowProps = {
  order: Order;
  onPress?: () => void;
};

// A finished order in the "Earlier" list.
export function OrderRow({ order, onPress }: OrderRowProps) {
  return (
    <RowCard
      image={order.venue.image}
      accessory={<Chip label={getStatusLabel(order.status)} variant="neutral" />}
      onPress={onPress}
    >
      <ThemedText type="itemTitle">{order.venue.name}</ThemedText>
      <ThemedText type="caption" color="textSecondary">
        {formatShortDate(order.createdAt)} · {formatItemCount(countItems(order.items))}
      </ThemedText>
      <ThemedText type="body" weight="bold">
        {formatPrice(order.totalCents)}
      </ThemedText>
    </RowCard>
  );
}
