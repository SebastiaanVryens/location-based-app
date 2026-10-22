import { type ImageProps } from 'expo-image';
import { type LatLng } from 'react-native-maps';

export type Venue = {
  id: string;
  name: string;
  description: string;
  categories: string[];
  // Missing until the venue adds a photo.
  image?: ImageProps['source'];
  deliveryMinutes: { min: number; max: number };
  // Null until the venue has ratings.
  rating: number | null;
  isOpen: boolean;
};

export type NearbyVenue = Venue & {
  coordinate: LatLng;
  distanceMeters: number;
};
