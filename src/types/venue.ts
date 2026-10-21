import { type ImageProps } from 'expo-image';
import { type LatLng } from 'react-native-maps';

export type Venue = {
  id: string;
  name: string;
  description: string;
  categories: string[];
  image: ImageProps['source'];
  deliveryMinutes: { min: number; max: number };
  rating: number;
  isOpen: boolean;
};

// A venue as found by a "near me" search: where it is, and how far it is from the user.
// The distance depends on who is looking, so it is calculated instead of stored.
export type NearbyVenue = Venue & {
  coordinate: LatLng;
  distanceMeters: number;
};
