import { type LatLng } from 'react-native-maps';

const EARTH_RADIUS_METERS = 6_371_000;
const METERS_PER_DEGREE = (Math.PI / 180) * EARTH_RADIUS_METERS;

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

// Distance along the earth's surface between two points (the haversine formula).
export function getDistanceMeters(from: LatLng, to: LatLng) {
  const deltaLatitude = toRadians(to.latitude - from.latitude);
  const deltaLongitude = toRadians(to.longitude - from.longitude);
  const a =
    Math.sin(deltaLatitude / 2) ** 2 +
    Math.cos(toRadians(from.latitude)) *
      Math.cos(toRadians(to.latitude)) *
      Math.sin(deltaLongitude / 2) ** 2;

  return 2 * EARTH_RADIUS_METERS * Math.asin(Math.sqrt(a));
}

// Moves a point a number of meters north and east. Accurate enough for short distances.
export function offsetCoordinate(
  origin: LatLng,
  { north, east }: { north: number; east: number },
): LatLng {
  return {
    latitude: origin.latitude + north / METERS_PER_DEGREE,
    longitude: origin.longitude + east / (METERS_PER_DEGREE * Math.cos(toRadians(origin.latitude))),
  };
}
