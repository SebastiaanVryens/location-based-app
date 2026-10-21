import { type Venue } from '@/types/venue';

// Rounded to 10 m, because GPS isn't precise enough for single meters.
export function formatDistance(meters: number) {
  return meters < 1000 ? `${Math.round(meters / 10) * 10} m` : `${(meters / 1000).toFixed(1)} km`;
}

export function formatDeliveryTime({ min, max }: Venue['deliveryMinutes']) {
  return `${min}–${max} min`;
}

export function formatPrice(cents: number) {
  return `€${(cents / 100).toFixed(2)}`;
}

export function formatItemCount(count: number) {
  return `${count} ${count === 1 ? 'item' : 'items'}`;
}

// "14 Oct"
export function formatShortDate(isoDate: string) {
  return new Date(isoDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}
