import { StyleSheet, View } from 'react-native';

import { Divider } from '@/components/divider';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatPrice } from '@/utils/format';

type PriceSummaryProps = {
  subtotalCents: number;
  serviceFeeCents: number;
};

export function PriceSummary({ subtotalCents, serviceFeeCents }: PriceSummaryProps) {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.surfaceMuted }]}>
      <SummaryLine label="Subtotal" cents={subtotalCents} />
      <SummaryLine label="Service fee" cents={serviceFeeCents} />
      <Divider />
      <View style={styles.line}>
        <ThemedText type="section">Total</ThemedText>
        <ThemedText type="section" weight="bold">
          {formatPrice(subtotalCents + serviceFeeCents)}
        </ThemedText>
      </View>
    </View>
  );
}

function SummaryLine({ label, cents }: { label: string; cents: number }) {
  return (
    <View style={styles.line}>
      <ThemedText type="caption" color="textSecondary">
        {label}
      </ThemedText>
      <ThemedText type="caption" color="textSecondary">
        {formatPrice(cents)}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
