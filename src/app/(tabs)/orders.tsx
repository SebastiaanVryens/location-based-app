import { StyleSheet, View } from 'react-native';

import { ActiveOrderCard } from '@/components/active-order-card';
import { OrderRow } from '@/components/order-row';
import { ScreenHeader } from '@/components/screen-header';
import { ScreenScrollView } from '@/components/screen-scroll-view';
import { SectionHeader } from '@/components/section-header';
import { TextButton } from '@/components/text-button';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useOrders } from '@/state/orders-context';
import { isOrderActive } from '@/utils/order-status';

export default function OrdersScreen() {
  const { orders } = useOrders();
  const activeOrders = orders.filter(isOrderActive);
  const earlierOrders = orders.filter((order) => !isOrderActive(order));

  return (
    <ScreenScrollView contentContainerStyle={styles.content}>
      <ScreenHeader overline="Your orders" title="Orders" />

      {activeOrders.map((order) => (
        <ActiveOrderCard key={order.id} order={order} />
      ))}

      {earlierOrders.length > 0 ? (
        <View style={styles.section}>
          {/* "View all" is not working yet: it will open the full order history. */}
          <SectionHeader title="Earlier" accessory={<TextButton label="View all" />} />
          {earlierOrders.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </View>
      ) : null}

      {orders.length === 0 ? (
        <ThemedText color="textSecondary">No orders yet. Your orders will show up here.</ThemedText>
      ) : null}
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.xxl,
  },
  section: {
    gap: Spacing.md,
  },
});
