import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { Chip } from '@/components/chip';
import { Icon, Icons } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Shadow, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { type Order } from '@/types/order';
import { formatDeliveryTime, formatItemCount } from '@/utils/format';
import { countItems, getStatusLabel, ORDER_PROGRESS } from '@/utils/order-status';

type ActiveOrderCardProps = {
  order: Order;
  onPress?: () => void;
};

// The dark card for an order that is still on its way.
export function ActiveOrderCard({ order, onPress }: ActiveOrderCardProps) {
  const theme = useTheme();
  const currentStep = ORDER_PROGRESS.indexOf(order.status);

  return (
    <Pressable
      accessibilityRole="button"
      disabled={!onPress}
      onPress={onPress}
      style={[styles.card, { backgroundColor: theme.surfaceInverse }]}
    >
      <View style={styles.header}>
        <Chip label="In progress" />
        <ThemedText type="caption" color="onInverseSecondary">
          Order #{order.number}
        </ThemedText>
      </View>

      <View style={styles.venue}>
        <Image source={order.venue.image} contentFit="cover" style={styles.thumbnail} />
        <View style={styles.venueText}>
          <ThemedText type="section" color="onInverse">
            {order.venue.name}
          </ThemedText>
          <ThemedText type="caption" color="onInverseSecondary">
            {formatItemCount(countItems(order.items))} · {order.spot.label}
          </ThemedText>
          <ThemedText type="label" color="success">
            {getStatusLabel(order.status)}
          </ThemedText>
        </View>
        <Icon name={Icons.chevronRight} color="onInverse" />
      </View>

      <View style={styles.progress}>
        {ORDER_PROGRESS.map((status, index) => (
          <View
            key={status}
            style={[
              styles.segment,
              index <= currentStep
                ? { backgroundColor: theme.success }
                : [styles.segmentUpcoming, { backgroundColor: theme.onInverseSecondary }],
            ]}
          />
        ))}
      </View>

      <ThemedText type="caption" color="onInverseSecondary">
        Estimated arrival in {formatDeliveryTime(order.venue.deliveryMinutes)}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
    boxShadow: Shadow.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  venue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  thumbnail: {
    width: 56,
    height: 56,
    borderRadius: Radius.sm,
  },
  venueText: {
    flex: 1,
    gap: 2,
  },
  progress: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  segment: {
    flex: 1,
    height: 4,
    borderRadius: Radius.full,
  },
  segmentUpcoming: {
    opacity: 0.3,
  },
});
