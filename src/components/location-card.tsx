import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import MapView, { type LatLng } from 'react-native-maps';

import { Chip } from '@/components/chip';
import { Icon, Icons } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

// How much of the map is visible, in degrees. Zoomed in close, to show the exact spot.
const ZOOM_DELTA = 0.002;

type LocationCardProps = {
  location: LatLng | null;
  accuracyMeters: number | null;
  onUpdate: () => void;
};

export function LocationCard({ location, accuracyMeters, onUpdate }: LocationCardProps) {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <View style={[styles.map, { backgroundColor: theme.surfaceMuted }]}>
        {location ? (
          // A still map: it follows the location but can't be dragged or zoomed.
          <MapView
            style={StyleSheet.absoluteFill}
            region={{ ...location, latitudeDelta: ZOOM_DELTA, longitudeDelta: ZOOM_DELTA }}
            scrollEnabled={false}
            zoomEnabled={false}
            rotateEnabled={false}
            pitchEnabled={false}
            showsUserLocation
            showsPointsOfInterests={false}
          />
        ) : (
          <ActivityIndicator color={theme.primary} />
        )}
      </View>

      <View style={styles.info}>
        <View style={[styles.iconTile, { backgroundColor: theme.primarySoft }]}>
          <Icon name={Icons.location} color="primary" />
        </View>
        <View style={styles.text}>
          <ThemedText type="itemTitle">Your current location</ThemedText>
          <ThemedText type="caption" color="textSecondary">
            {accuracyMeters
              ? `Accurate to approximately ${Math.round(accuracyMeters)} metres`
              : 'Location is off, so this is an approximate area'}
          </ThemedText>
        </View>
        <Pressable accessibilityRole="button" hitSlop={Spacing.sm} onPress={onUpdate}>
          <Chip label="Update" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
  },
  map: {
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
  },
  iconTile: {
    width: 40,
    height: 40,
    borderRadius: Radius.sm,
    borderCurve: 'continuous',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    gap: 2,
  },
});
