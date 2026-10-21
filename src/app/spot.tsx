import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { BottomBar } from '@/components/bottom-bar';
import { Button } from '@/components/button';
import { Icon, Icons } from '@/components/icon';
import { LocationCard } from '@/components/location-card';
import { SectionHeader } from '@/components/section-header';
import { SpotPhotoField } from '@/components/spot-photo-field';
import { StepIndicator } from '@/components/step-indicator';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useCurrentLocation } from '@/hooks/use-current-location';
import { useCart } from '@/state/cart-context';
import { formatPrice } from '@/utils/format';

const CHECKOUT_STEPS = ['Cart', 'Spot', 'Payment'] as const;

export default function SpotScreen() {
  const cart = useCart();
  const { location, accuracyMeters, refresh } = useCurrentLocation();
  const [hint, setHint] = useState(cart.spot.hint);
  const hasPhoto = cart.spot.photoUri !== null;

  function handleContinue() {
    cart.updateSpot({ location, hint });
    router.push('/checkout');
  }

  return (
    <ThemedView style={styles.screen}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        automaticallyAdjustKeyboardInsets
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.content}
      >
        <StepIndicator steps={CHECKOUT_STEPS} current={1} />

        <View style={styles.section}>
          <SectionHeader overline="Delivering to" title="We'll find you here" />
          <LocationCard location={location} accuracyMeters={accuracyMeters} onUpdate={refresh} />
        </View>

        <View style={styles.section}>
          <SectionHeader
            overline="Required"
            title="Add a photo of your spot"
            subtitle="Help the café team recognise exactly where you're sitting."
          />
          <SpotPhotoField
            photoUri={cart.spot.photoUri}
            onTakePhoto={() => router.push('/spot-camera')}
          />
          <View style={styles.privacy}>
            <Icon name={Icons.lock} size="sm" color="textSecondary" />
            <ThemedText type="small" color="textSecondary">
              Your photo is only shared with this venue for this order.
            </ThemedText>
          </View>
          <TextField
            label="Help us recognise you"
            optional
            placeholder="For example: blue jacket, by the window"
            value={hint}
            onChangeText={setHint}
          />
        </View>
      </ScrollView>

      <BottomBar>
        <View style={styles.footer}>
          <View>
            <ThemedText type="caption" color="textSecondary">
              Total
            </ThemedText>
            <ThemedText type="title" weight="bold">
              {formatPrice(cart.totalCents)}
            </ThemedText>
          </View>
          <View style={styles.footerButton}>
            <Button
              label="Continue to payment"
              icon={Icons.chevronRight}
              disabled={!hasPhoto}
              onPress={handleContinue}
            />
          </View>
        </View>
      </BottomBar>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    gap: Spacing.xxl,
    padding: Spacing.xl,
  },
  section: {
    gap: Spacing.md,
  },
  privacy: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  footerButton: {
    flex: 1,
  },
});
