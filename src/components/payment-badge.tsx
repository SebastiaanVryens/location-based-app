import { Platform, StyleSheet, View } from 'react-native';

import { Icon, Icons } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { type PaymentMethod } from '@/types/payment';

// A small logo for a payment method. The wallet one stands in for the official
// Apple Pay or Google Pay mark.
export function PaymentBadge({ method }: { method: PaymentMethod }) {
  const theme = useTheme();

  if (method === 'card') {
    return (
      <View style={[styles.badge, { backgroundColor: theme.primarySoft }]}>
        <Icon name={Icons.card} color="primary" />
      </View>
    );
  }

  return (
    <View style={[styles.badge, { backgroundColor: theme.text }]}>
      {Platform.OS === 'ios' ? (
        <Icon name={{ ios: 'apple.logo' }} size="sm" color="background" />
      ) : null}
      <ThemedText type="label" color="background">
        {Platform.OS === 'ios' ? 'Pay' : 'G Pay'}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    width: 52,
    height: 34,
    borderRadius: Radius.sm,
    borderCurve: 'continuous',
  },
});
