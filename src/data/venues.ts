import { type LatLng } from 'react-native-maps';

import { supabase } from '@/lib/supabase';
import { type Tables } from '@/types/database';
import { type NearbyVenue, type Venue } from '@/types/venue';

// The columns the app shows. The venues table and nearby_venues() both use these names.
const VENUE_COLUMNS =
  'id, name, description, categories, image_url, delivery_minutes_min, delivery_minutes_max, rating, is_open';

type VenueRow = Pick<
  Tables<'venues'>,
  | 'id'
  | 'name'
  | 'description'
  | 'categories'
  | 'image_url'
  | 'delivery_minutes_min'
  | 'delivery_minutes_max'
  | 'rating'
  | 'is_open'
>;

// Turns a database row into the shape the app uses.
function toVenue(row: VenueRow): Venue {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    categories: row.categories,
    image: row.image_url ? { uri: row.image_url } : undefined,
    deliveryMinutes: { min: row.delivery_minutes_min, max: row.delivery_minutes_max },
    rating: row.rating,
    isOpen: row.is_open,
  };
}

// Returns the venues near `location`, closest first. The database works out the distances.
export async function getNearbyVenues(location: LatLng): Promise<NearbyVenue[]> {
  const { data, error } = await supabase.rpc('nearby_venues', {
    lat: location.latitude,
    long: location.longitude,
  });
  if (error) throw error;

  return data.map((row) => ({
    ...toVenue(row),
    coordinate: { latitude: row.latitude, longitude: row.longitude },
    distanceMeters: row.distance_meters,
  }));
}

// Returns one venue by its id, or null if there is no such venue.
export async function getVenue(id: string): Promise<Venue | null> {
  const { data, error } = await supabase
    .from('venues')
    .select(VENUE_COLUMNS)
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;

  return data ? toVenue(data) : null;
}
