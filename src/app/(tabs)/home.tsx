import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { ActionCard } from '@/components/action-card';
import { Avatar } from '@/components/avatar';
import { Icons } from '@/components/icon';
import { ScreenHeader } from '@/components/screen-header';
import { ScreenScrollView } from '@/components/screen-scroll-view';
import { SearchField } from '@/components/search-field';
import { SectionHeader } from '@/components/section-header';
import { SegmentedControl } from '@/components/segmented-control';
import { ThemedText } from '@/components/themed-text';
import { VenueCard } from '@/components/venue-card';
import { VenueMap } from '@/components/venue-map';
import { Spacing } from '@/constants/theme';
import { getNearbyVenues } from '@/data/venues';
import { useCurrentLocation } from '@/hooks/use-current-location';
import { useTheme } from '@/hooks/use-theme';
import { type Venue } from '@/types/venue';

const VIEW_OPTIONS = [
  { value: 'list', label: 'List' },
  { value: 'map', label: 'Map' },
] as const;

type NearbyView = (typeof VIEW_OPTIONS)[number]['value'];

function getGreeting(hour = new Date().getHours()) {
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function openVenue(venue: Venue) {
  router.push({ pathname: '/venue/[id]', params: { id: venue.id } });
}

export default function HomeScreen() {
  const theme = useTheme();
  const [nearbyView, setNearbyView] = useState<NearbyView>('list');
  const [query, setQuery] = useState('');
  const { location } = useCurrentLocation();

  const normalizedQuery = query.trim().toLowerCase();
  const venues = location
    ? getNearbyVenues(location).filter((venue) =>
        venue.name.toLowerCase().includes(normalizedQuery),
      )
    : [];

  return (
    <ScreenScrollView keyboardDismissMode="on-drag" keyboardShouldPersistTaps="handled">
      <ScreenHeader
        overline={getGreeting()}
        title="What can we bring you?"
        accessory={<Avatar name="A" onPress={() => router.navigate('/profile')} />}
      />

      <ActionCard
        icon={Icons.qrCode}
        title="Scan QR code"
        subtitle="Order straight to your table or seat"
        onPress={() => router.push('/scan')}
      />

      <SearchField value={query} onChangeText={setQuery} placeholder="Search venues or places" />

      <View style={styles.nearby}>
        <SectionHeader
          title="Nearby"
          subtitle="Places delivering to your spot"
          accessory={
            <SegmentedControl options={VIEW_OPTIONS} value={nearbyView} onChange={setNearbyView} />
          }
        />

        {location ? (
          <>
            {nearbyView === 'map' ? (
              <VenueMap center={location} venues={venues} onVenuePress={openVenue} />
            ) : (
              venues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} onPress={() => openVenue(venue)} />
              ))
            )}

            {venues.length === 0 ? (
              <ThemedText color="textSecondary">No places match your search.</ThemedText>
            ) : null}
          </>
        ) : (
          <ActivityIndicator color={theme.primary} style={styles.loading} />
        )}
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  nearby: {
    gap: Spacing.lg,
    marginTop: Spacing.sm,
  },
  loading: {
    paddingVertical: Spacing.xxxl,
  },
});
