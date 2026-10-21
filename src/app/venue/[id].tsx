import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { Fragment, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CartBar } from '@/components/cart-bar';
import { Chip } from '@/components/chip';
import { Divider } from '@/components/divider';
import { Icons } from '@/components/icon';
import { IconButton } from '@/components/icon-button';
import { MenuItemRow } from '@/components/menu-item-row';
import { OpenStatus } from '@/components/open-status';
import { SectionHeader } from '@/components/section-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { UnderlineTabs } from '@/components/underline-tabs';
import { Radius, Spacing } from '@/constants/theme';
import { getMenu } from '@/data/menu';
import { getVenue } from '@/data/venues';
import { useCart } from '@/state/cart-context';
import { formatDeliveryTime } from '@/utils/format';

const POPULAR = 'Popular';
// Room at the bottom so the last menu item can scroll above the cart bar.
const CART_BAR_SPACE = 96;

export default function VenueScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const cart = useCart();
  const [category, setCategory] = useState(POPULAR);

  const venue = getVenue(id);
  if (!venue) {
    return (
      <ThemedView style={styles.notFound}>
        <ThemedText color="textSecondary">This place could not be found.</ThemedText>
      </ThemedView>
    );
  }

  const menu = getMenu(venue.id);
  const categories = [POPULAR, ...new Set(menu.map((item) => item.category))];
  const items =
    category === POPULAR
      ? menu.filter((item) => item.isPopular)
      : menu.filter((item) => item.category === category);
  const showCartBar = cart.venue?.id === venue.id && cart.itemCount > 0;

  return (
    <ThemedView style={styles.screen}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom + (showCartBar ? CART_BAR_SPACE : Spacing.xl),
        }}
      >
        <Image source={venue.image} contentFit="cover" style={styles.hero} />

        <ThemedView style={styles.sheet}>
          <View style={styles.titleRow}>
            <ThemedText type="display" style={styles.title}>
              {venue.name}
            </ThemedText>
            <Chip label="Nearby" icon={Icons.pin} />
          </View>
          <View style={styles.statusRow}>
            <OpenStatus isOpen={venue.isOpen} />
            <ThemedText type="caption" color="textSecondary">
              · {formatDeliveryTime(venue.deliveryMinutes)}
            </ThemedText>
          </View>
          <ThemedText color="textSecondary">{venue.description}</ThemedText>

          <UnderlineTabs options={categories} value={category} onChange={setCategory} />

          <SectionHeader
            title={category === POPULAR ? 'Popular right now' : category}
            subtitle={category === POPULAR ? 'Our most-loved picks' : undefined}
          />

          <View>
            {items.map((item, index) => (
              <Fragment key={item.id}>
                {index > 0 ? <Divider /> : null}
                <MenuItemRow
                  item={item}
                  quantity={cart.getQuantity(item.id)}
                  onAdd={() => cart.addItem(venue, item)}
                  onRemove={() => cart.removeItem(item.id)}
                />
              </Fragment>
            ))}
          </View>
        </ThemedView>
      </ScrollView>

      <View style={[styles.backButton, { top: insets.top + Spacing.sm }]}>
        <IconButton
          icon={Icons.chevronLeft}
          accessibilityLabel="Back"
          background="surface"
          borderColor="surface"
          onPress={() => router.back()}
        />
      </View>

      {showCartBar ? (
        <View style={[styles.cartBar, { bottom: insets.bottom + Spacing.md }]}>
          <CartBar
            itemCount={cart.itemCount}
            totalCents={cart.totalCents}
            onPress={() => router.push('/cart')}
          />
        </View>
      ) : null}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hero: {
    height: 260,
  },
  // The white sheet slides up over the bottom of the photo, with rounded top corners.
  sheet: {
    gap: Spacing.lg,
    marginTop: -Spacing.xxl,
    paddingTop: Spacing.xxl,
    paddingHorizontal: Spacing.xl,
    borderTopLeftRadius: Radius.lg,
    borderTopRightRadius: Radius.lg,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  title: {
    flex: 1,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: -Spacing.sm,
  },
  backButton: {
    position: 'absolute',
    left: Spacing.xl,
  },
  cartBar: {
    position: 'absolute',
    left: Spacing.xl,
    right: Spacing.xl,
  },
});
