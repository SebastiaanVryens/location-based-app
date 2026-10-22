import { router, useLocalSearchParams } from 'expo-router';
import { Fragment, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CartBar } from '@/components/cart-bar';
import { Chip } from '@/components/chip';
import { Divider } from '@/components/divider';
import { Icons } from '@/components/icon';
import { IconButton } from '@/components/icon-button';
import { LoadError } from '@/components/load-error';
import { MenuItemRow } from '@/components/menu-item-row';
import { OpenStatus } from '@/components/open-status';
import { Photo } from '@/components/photo';
import { SectionHeader } from '@/components/section-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { UnderlineTabs } from '@/components/underline-tabs';
import { Radius, Spacing } from '@/constants/theme';
import { getMenu } from '@/data/menu';
import { getVenue } from '@/data/venues';
import { useLoad } from '@/hooks/use-load';
import { useTheme } from '@/hooks/use-theme';
import { useCart } from '@/state/cart-context';
import { type MenuItem } from '@/types/menu';
import { type Venue } from '@/types/venue';
import { formatDeliveryTime } from '@/utils/format';

const POPULAR = 'Popular';
// Room at the bottom so the last menu item can scroll above the cart bar.
const CART_BAR_SPACE = 96;

// The venue and its menu, loaded at the same time. Null if there is no such venue.
async function loadVenue(id: string) {
  const [venue, menu] = await Promise.all([getVenue(id), getMenu(id)]);
  return venue ? { venue, menu } : null;
}

export default function VenueScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const loaded = useLoad(loadVenue, id);

  return (
    <ThemedView style={styles.screen}>
      {loaded.status === 'loading' ? (
        <View style={styles.centered}>
          <ActivityIndicator color={theme.primary} />
        </View>
      ) : loaded.status === 'failed' ? (
        <View style={styles.centered}>
          <LoadError message="Couldn't load this place." onRetry={loaded.retry} />
        </View>
      ) : loaded.data === null ? (
        <View style={styles.centered}>
          <ThemedText color="textSecondary">This place could not be found.</ThemedText>
        </View>
      ) : (
        <VenueDetails venue={loaded.data.venue} menu={loaded.data.menu} />
      )}

      {/* Shown in every state, because this screen has no header to go back with. */}
      <View style={[styles.backButton, { top: insets.top + Spacing.sm }]}>
        <IconButton
          icon={Icons.chevronLeft}
          accessibilityLabel="Back"
          background="surface"
          borderColor="surface"
          onPress={() => router.back()}
        />
      </View>
    </ThemedView>
  );
}

function VenueDetails({ venue, menu }: { venue: Venue; menu: MenuItem[] }) {
  const insets = useSafeAreaInsets();
  const cart = useCart();
  const [category, setCategory] = useState(POPULAR);

  const categories = [POPULAR, ...new Set(menu.map((item) => item.category))];
  const items =
    category === POPULAR
      ? menu.filter((item) => item.isPopular)
      : menu.filter((item) => item.category === category);
  const showCartBar = cart.venue?.id === venue.id && cart.itemCount > 0;

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom + (showCartBar ? CART_BAR_SPACE : Spacing.xl),
        }}
      >
        <Photo source={venue.image} style={styles.hero} />

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

      {showCartBar ? (
        <View style={[styles.cartBar, { bottom: insets.bottom + Spacing.md }]}>
          <CartBar
            itemCount={cart.itemCount}
            totalCents={cart.totalCents}
            onPress={() => router.push('/cart')}
          />
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
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
