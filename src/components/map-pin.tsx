import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Marker, type LatLng } from 'react-native-maps';

import { Icon, Icons } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Shadow, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const PIN_SIZE = 32;
// Room for the pin's tip and shadows, which Android would otherwise clip.
const PADDING = Spacing.sm;
// How far the tip is from the top of the marker. The pin is turned 45°,
// so its square corner sticks out half a diagonal below the pin's center.
const TIP_Y = PADDING + PIN_SIZE / 2 + (PIN_SIZE / 2) * Math.SQRT2;

type MapPinProps = {
  coordinate: LatLng;
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

// A map marker with a pin and a name label, whose tip stays on `coordinate` at every zoom level.
// Maps attach a marker by a fixed point (Google Maps: bottom center, Apple Maps: the center),
// but the tip is higher up, above the label. The label grows with the phone's text size,
// so the marker is measured and its attach point moved to the tip.
export function MapPin({ coordinate, label, selected = false, onPress }: MapPinProps) {
  const theme = useTheme();
  const [height, setHeight] = useState<number | null>(null);

  return (
    <Marker
      coordinate={coordinate}
      onPress={onPress}
      // Android: where the tip is, as a share of the marker's size.
      anchor={height ? { x: 0.5, y: TIP_Y / height } : undefined}
      // iPhone: how far to move the marker's center so the tip lands on the coordinate.
      centerOffset={height ? { x: 0, y: height / 2 - TIP_Y } : undefined}
    >
      <View
        style={styles.container}
        // Keeps this view as a real view on the phone. Otherwise React Native merges it away,
        // and on iPhone the map sizes the marker from the pin circle alone, which puts the
        // whole marker off its spot.
        collapsable={false}
        onLayout={(event) => setHeight(event.nativeEvent.layout.height)}
      >
        <View style={[styles.pin, { backgroundColor: selected ? theme.primary : theme.surface }]}>
          <View style={styles.uprightIcon}>
            <Icon name={Icons.star} size="sm" color={selected ? 'onPrimary' : 'primary'} />
          </View>
        </View>
        <View style={[styles.label, { backgroundColor: theme.surface }]}>
          <ThemedText type="small" weight="bold">
            {label}
          </ThemedText>
        </View>
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Spacing.sm,
    padding: PADDING,
  },
  // A circle with one square corner, turned 45° so the square corner points down.
  pin: {
    width: PIN_SIZE,
    height: PIN_SIZE,
    borderRadius: Radius.full,
    borderBottomLeftRadius: 0,
    transform: [{ rotate: '-45deg' }],
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: Shadow.sm,
  },
  uprightIcon: {
    transform: [{ rotate: '45deg' }],
  },
  label: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.full,
    boxShadow: Shadow.sm,
  },
});
