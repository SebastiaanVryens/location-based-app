import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { type LatLng } from 'react-native-maps';

type LocationResult = {
  location: LatLng;
  // How far off the position may be, in meters. Null when it isn't the user's real position.
  accuracyMeters: number | null;
};

// Used when the user denies location access or it can't be read: Oulu market square.
const FALLBACK: LocationResult = {
  location: { latitude: 65.0137, longitude: 25.4647 },
  accuracyMeters: null,
};

async function getLocation(): Promise<LocationResult> {
  const { granted } = await Location.requestForegroundPermissionsAsync();
  if (!granted) {
    return FALLBACK;
  }

  const { coords } = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });
  return {
    location: { latitude: coords.latitude, longitude: coords.longitude },
    accuracyMeters: coords.accuracy,
  };
}

// Asks for location permission once, then returns the user's position.
// `location` is null while the first position is still loading. `refresh` reads it again.
export function useCurrentLocation() {
  const [result, setResult] = useState<LocationResult | null>(null);
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    getLocation()
      .catch(() => FALLBACK)
      .then((next) => {
        if (isMounted) {
          setResult(next);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [requestCount]);

  return {
    location: result?.location ?? null,
    accuracyMeters: result?.accuracyMeters ?? null,
    refresh: () => setRequestCount((count) => count + 1),
  };
}
