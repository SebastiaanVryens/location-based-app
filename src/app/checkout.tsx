import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { BottomBar } from '@/components/bottom-bar';
import { Button } from '@/components/button';
import { Icon, Icons } from '@/components/icon';
import { PaymentBadge } from '@/components/payment-badge';
import { PriceSummary } from '@/components/price-summary';
import { RadioOption } from '@/components/radio-option';
import { RowCard } from '@/components/row-card';
import { TextButton } from '@/components/text-button';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { getPaymentMethodLabel, PAYMENT_METHODS } from '@/data/payment-methods';
import { useCart } from '@/state/cart-context';
import { useOrders } from '@/state/orders-context';
import { useSettings } from '@/state/settings-context';
import { formatPrice } from '@/utils/format';

export default function CheckoutScreen() {
  const cart = useCart();
  const { placeOrder } = useOrders();
  const { settings } = useSettings();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // Starts on the default chosen in Profile, Payment methods.
  const [paymentMethod, setPaymentMethod] = useState(settings.defaultPaymentMethod);
  const venue = cart.venue;

  // Empty right after paying, while this screen closes.
  if (!venue) {
    return <ThemedView style={styles.screen} />;
  }

  const total = formatPrice(cart.totalCents);

  function handlePay() {
    if (!venue) return;
    // Pretends the payment worked. Later Stripe takes the payment and the server confirms it.
    placeOrder({ venue, lines: cart.lines, spot: cart.spot, totalCents: cart.totalCents });
    cart.clear();
    // Close the whole order flow, then open the Orders tab.
    router.dismissAll();
    router.navigate('/orders');
  }

  return (
    <ThemedView style={styles.screen}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        automaticallyAdjustKeyboardInsets
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.content}
      >
        <RowCard
          image={cart.spot.photoUri ?? venue.image}
          accessory={<Icon name={Icons.check} color="primary" />}
        >
          <ThemedText type="overline" color="primary">
            Deliver to
          </ThemedText>
          <ThemedText type="itemTitle">
            {venue.name} · {cart.spot.label}
          </ThemedText>
          <ThemedText type="label" color="primary">
            Photo added ✓
          </ThemedText>
        </RowCard>

        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <ThemedText type="section">Your details</ThemedText>
            <ThemedText type="caption" color="textTertiary">
              Optional
            </ThemedText>
          </View>
          <TextField
            label="Name"
            placeholder="Your name"
            autoComplete="name"
            textContentType="name"
            value={name}
            onChangeText={setName}
          />
          <TextField
            label="Receipt email"
            placeholder="you@example.com"
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.section}>
          <ThemedText type="section">Payment method</ThemedText>
          {PAYMENT_METHODS.map((method) => (
            <RadioOption
              key={method}
              label={getPaymentMethodLabel(method)}
              leading={<PaymentBadge method={method} />}
              selected={paymentMethod === method}
              onPress={() => setPaymentMethod(method)}
            />
          ))}
          {/* Not working yet: will open Stripe's card form. */}
          <View style={styles.centered}>
            <TextButton icon={Icons.plus} label="Add another card" />
          </View>
        </View>

        <PriceSummary subtotalCents={cart.subtotalCents} serviceFeeCents={cart.serviceFeeCents} />

        <ThemedText type="small" color="textTertiary" style={styles.footnote}>
          Payment is encrypted and processed securely.
        </ThemedText>
      </ScrollView>

      <BottomBar>
        <Button
          label={
            paymentMethod === 'wallet'
              ? `Pay ${total} with ${getPaymentMethodLabel('wallet')}`
              : `Pay ${total}`
          }
          onPress={handlePay}
        />
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
  sectionTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centered: {
    alignItems: 'center',
  },
  footnote: {
    textAlign: 'center',
  },
});
