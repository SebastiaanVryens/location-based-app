import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Icons } from '@/components/icon';
import { ScreenHeader } from '@/components/screen-header';
import { ScreenScrollView } from '@/components/screen-scroll-view';
import { SettingsTileSection } from '@/components/settings-tile-section';
import { SignInCard } from '@/components/sign-in-card';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useOnForeground } from '@/hooks/use-on-foreground';
import { useSettings, type Settings } from '@/state/settings-context';
import { changePermission, describePermission } from '@/utils/permissions';

const APP_VERSION = Constants.expoConfig?.version;

function describeNotifications({ orderUpdates, offers }: Settings) {
  if (orderUpdates && offers) return 'All';
  if (orderUpdates) return 'Order updates';
  if (offers) return 'Offers only';
  return 'Off';
}

export default function Profile() {
  const { settings } = useSettings();
  const [locationPermission, requestLocation, refreshLocation] =
    Location.useForegroundPermissions();
  // The user may change the permission in the Settings app, so check again when they return.
  useOnForeground(refreshLocation);

  return (
    <ScreenScrollView contentContainerStyle={styles.content}>
      <ScreenHeader overline="Your account" title="Profile" />

      {/* "Sign in" is not working yet: it needs accounts from the backend. */}
      <SignInCard />

      <View style={styles.sections}>
        <SettingsTileSection
          title="Preferences"
          tiles={[
            {
              name: 'Notifications',
              icon: Icons.bell,
              value: describeNotifications(settings),
              onPress: () => router.push('/settings/notifications'),
            },
            {
              name: 'Location',
              icon: Icons.location,
              value: describePermission(locationPermission, 'While using the app'),
              onPress: () => changePermission(locationPermission, requestLocation),
            },
            {
              name: 'Payment methods',
              icon: Icons.card,
              onPress: () => router.push('/settings/payment-methods'),
            },
          ]}
        />
        <SettingsTileSection
          title="More"
          tiles={[
            {
              name: 'Language',
              icon: Icons.language,
              value: 'English',
              onPress: () => router.push('/settings/language'),
            },
            {
              name: 'Help & support',
              icon: Icons.help,
              onPress: () => router.push('/settings/help'),
            },
            {
              name: 'Privacy',
              icon: Icons.privacy,
              onPress: () => router.push('/settings/privacy'),
            },
          ]}
        />
      </View>

      <ThemedText type="small" color="textTertiary" style={styles.version}>
        Version {APP_VERSION}
      </ThemedText>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.xxl,
  },
  sections: {
    gap: Spacing.xxl,
  },
  version: {
    textAlign: 'center',
  },
});
