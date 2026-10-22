import { useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import MapView, { type LatLng } from 'react-native-maps';

import { MapPin } from '@/components/map-pin';
import { VenueRow } from '@/components/venue-row';
import { Radius, Shadow, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { type NearbyVenue } from '@/types/venue';

// How much of the map is visible, in degrees. Smaller is more zoomed in.
const ZOOM_DELTA = 0.005;
// The map takes this share of the screen height, so it fits above the tab bar on any phone.
const HEIGHT_RATIO = 0.35;
const MIN_HEIGHT = 240;
// Room for the venue card at the bottom, so the map centers your location above it.
const CARD_SPACE = 80;

type VenueMapProps = {
  center: LatLng;
  venues: NearbyVenue[];
  onVenuePress?: (venue: NearbyVenue) => void;
};

export function VenueMap({ center, venues, onVenuePress }: VenueMapProps) {
  const theme = useTheme();
  const { height: windowHeight } = useWindowDimensions();
  const [selectedId, setSelectedId] = useState(venues[0]?.id);
  const selectedVenue = venues.find((venue) => venue.id === selectedId) ?? venues[0];

  return (
    <View
      style={[
        styles.container,
        {
          height: Math.max(windowHeight * HEIGHT_RATIO, MIN_HEIGHT),
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}
    >
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{ ...center, latitudeDelta: ZOOM_DELTA, longitudeDelta: ZOOM_DELTA }}
        mapPadding={{ top: 0, right: 0, bottom: selectedVenue ? CARD_SPACE : 0, left: 0 }}
        showsUserLocation
        showsPointsOfInterests={false}
      >
        {venues.map((venue) => (
          <MapPin
            key={venue.id}
            coordinate={venue.coordinate}
            label={venue.name}
            selected={venue.id === selectedVenue?.id}
            onPress={() => setSelectedId(venue.id)}
          />
        ))}
      </MapView>

      {selectedVenue ? (
        <VenueRow
          venue={selectedVenue}
          onPress={onVenuePress ? () => onVenuePress(selectedVenue) : undefined}
          style={styles.selectedCard}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
  },
  selectedCard: {
    position: 'absolute',
    left: Spacing.md,
    right: Spacing.md,
    bottom: Spacing.md,
    boxShadow: Shadow.md,
  },
});
