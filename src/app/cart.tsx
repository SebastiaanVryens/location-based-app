import { router } from 'expo-router';
import { Fragment } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { BottomBar } from '@/components/bottom-bar';
import { Button } from '@/components/button';
import { Divider } from '@/components/divider';
import { Icon, Icons } from '@/components/icon';
import { MenuItemRow } from '@/components/menu-item-row';
import { PriceSummary } from '@/components/price-summary';
import { RowCard } from '@/components/row-card';
import { TextButton } from '@/components/text-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useCart } from '@/state/cart-context';

export default function CartScreen() {
  const theme = useTheme();
  const cart = useCart();
  const venue = cart.venue;

  if (!venue || cart.lines.length === 0) {
    return (
      <ThemedView style={styles.empty}>
        <ThemedText color="textSecondary">Your cart is empty.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.screen}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.content}>
        <RowCard image={venue.image}>
          <ThemedText type="itemTitle">{venue.name}</ThemedText>
          <ThemedText type="caption" color="textSecondary">
            Location confirmed at next step
          </ThemedText>
        </RowCard>

        <View style={[styles.lines, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          {cart.lines.map(({ item, quantity }, index) => (
            <Fragment key={item.id}>
              {index > 0 ? <Divider /> : null}
              <MenuItemRow
                compact
                item={item}
                quantity={quantity}
                onAdd={() => cart.addItem(venue, item)}
                onRemove={() => cart.removeItem(item.id)}
              />
            </Fragment>
          ))}
        </View>

        <View style={styles.centered}>
          <TextButton icon={Icons.plus} label="Add more items" onPress={() => router.back()} />
        </View>

        {/* Not working yet: will open a text box for the kitchen. */}
        <RowCard accessory={<Icon name={Icons.chevronRight} />}>
          <ThemedText>Add a note for the kitchen</ThemedText>
        </RowCard>

        <PriceSummary subtotalCents={cart.subtotalCents} serviceFeeCents={cart.serviceFeeCents} />
      </ScrollView>

      <BottomBar>
        <Button
          label="Confirm your spot"
          icon={Icons.chevronRight}
          onPress={() => router.push('/spot')}
        />
      </BottomBar>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    gap: Spacing.lg,
    padding: Spacing.xl,
  },
  lines: {
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
  },
  centered: {
    alignItems: 'center',
  },
});
