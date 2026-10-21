import { type LatLng } from 'react-native-maps';

import { type NearbyVenue, type Venue } from '@/types/venue';
import { getDistanceMeters, offsetCoordinate } from '@/utils/geo';

type MockVenue = Venue & {
  // Where the venue sits relative to the user, so there is always something nearby to test.
  offsetMeters: { north: number; east: number };
};

const MOCK_VENUES: MockVenue[] = [
  {
    id: 'cafe-aalto',
    name: 'Café Aalto',
    description: 'Nordic coffee, flaky pastries and all-day favourites.',
    categories: ['Coffee', 'Pastries', 'Breakfast'],
    image: require('@/assets/images/onboarding/cafe-interior.jpg'),
    offsetMeters: { north: 96, east: 72 },
    deliveryMinutes: { min: 10, max: 15 },
    rating: 4.8,
    isOpen: true,
  },
];

// Pretends to be the backend: returns the venues near `location`, closest first.
// Replace the body with a database query later.
export function getNearbyVenues(location: LatLng): NearbyVenue[] {
  return MOCK_VENUES.map(({ offsetMeters, ...venue }) => {
    const coordinate = offsetCoordinate(location, offsetMeters);
    return { ...venue, coordinate, distanceMeters: getDistanceMeters(location, coordinate) };
  }).sort((a, b) => a.distanceMeters - b.distanceMeters);
}

// Pretends to be the backend: returns one venue by its id.
export function getVenue(id: string): Venue | undefined {
  return MOCK_VENUES.find((venue) => venue.id === id);
}
