import { useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Icons } from '@/components/icon';
import { RowCard } from '@/components/row-card';
import { SettingsTileSection } from '@/components/settings-tile-section';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useOnForeground } from '@/hooks/use-on-foreground';
import { changePermission, describePermission } from '@/utils/permissions';

const DATA_USES = [
  {
    title: 'Your location',
    text: 'Used to show places near you and to find your spot while you order.',
  },
  {
    title: 'Photos of your spot',
    text: 'Only shared with the venue you order from, and only for that order.',
  },
  {
    title: 'Payment details',
    text: 'Handled by our payment provider. We never store your card number.',
  },
];

export default function PrivacyScreen() {
  const [locationPermission, requestLocation, refreshLocation] =
    Location.useForegroundPermissions();
  const [cameraPermission, requestCamera, refreshCamera] = useCameraPermissions();
  // The user may change permissions in the Settings app, so check again when they return.
  useOnForeground(refreshLocation);
  useOnForeground(refreshCamera);

  return (
    <ThemedView style={styles.screen}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.content}>
        <SettingsTileSection
          title="Permissions"
          tiles={[
            {
              name: 'Location',
              icon: Icons.location,
              value: describePermission(locationPermission, 'While using the app'),
              onPress: () => changePermission(locationPermission, requestLocation),
            },
            {
              name: 'Camera',
              icon: Icons.camera,
              value: describePermission(cameraPermission, 'Allowed'),
              onPress: () => changePermission(cameraPermission, requestCamera),
            },
          ]}
        />

        <View style={styles.section}>
          <ThemedText type="section" style={styles.sectionTitle}>
            How we use your data
          </ThemedText>
          {DATA_USES.map(({ title, text }) => (
            <RowCard key={title}>
              <ThemedText type="itemTitle">{title}</ThemedText>
              <ThemedText type="caption" color="textSecondary">
                {text}
              </ThemedText>
            </RowCard>
          ))}
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
    gap: Spacing.xxl,
    padding: Spacing.xl,
  },
  section: {
    gap: Spacing.sm,
  },
  sectionTitle: {
    marginLeft: Spacing.xs,
  },
});
