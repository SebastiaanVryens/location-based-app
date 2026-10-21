import { ScrollView, StyleSheet, View } from 'react-native';

import { Icons } from '@/components/icon';
import { PaymentBadge } from '@/components/payment-badge';
import { RadioOption } from '@/components/radio-option';
import { SectionHeader } from '@/components/section-header';
import { TextButton } from '@/components/text-button';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { getPaymentMethodLabel, PAYMENT_METHODS } from '@/data/payment-methods';
import { useSettings } from '@/state/settings-context';

export default function PaymentMethodsScreen() {
  const { settings, updateSettings } = useSettings();

  return (
    <ThemedView style={styles.screen}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.content}>
        <SectionHeader
          title="Default payment method"
          subtitle="Selected for you at checkout. You can still switch there."
        />
        {PAYMENT_METHODS.map((method) => (
          <RadioOption
            key={method}
            label={getPaymentMethodLabel(method)}
            leading={<PaymentBadge method={method} />}
            selected={settings.defaultPaymentMethod === method}
            onPress={() => updateSettings({ defaultPaymentMethod: method })}
          />
        ))}
        {/* Not working yet: will open Stripe's card form. */}
        <View style={styles.centered}>
          <TextButton icon={Icons.plus} label="Add a card" />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    gap: Spacing.md,
    padding: Spacing.xl,
  },
  centered: {
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
});
