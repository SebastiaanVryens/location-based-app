import { ScrollView, StyleSheet } from 'react-native';

import { Card } from '@/components/card';
import { Divider } from '@/components/divider';
import { SwitchRow } from '@/components/switch-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useSettings } from '@/state/settings-context';

export default function NotificationsScreen() {
  const { settings, updateSettings } = useSettings();

  return (
    <ThemedView style={styles.screen}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.content}>
        <Card>
          <SwitchRow
            title="Order updates"
            description="When your order is being prepared and on its way."
            value={settings.orderUpdates}
            onValueChange={(orderUpdates) => updateSettings({ orderUpdates })}
          />
          <Divider />
          <SwitchRow
            title="Offers and news"
            description="Now and then, deals from places near you."
            value={settings.offers}
            onValueChange={(offers) => updateSettings({ offers })}
          />
        </Card>
        <ThemedText type="small" color="textSecondary" style={styles.note}>
          You can also turn off all notifications for the app in your phone&apos;s settings.
        </ThemedText>
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
  note: {
    marginHorizontal: Spacing.xs,
  },
});
