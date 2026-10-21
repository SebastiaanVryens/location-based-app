import { type Order } from '@/types/order';

// A fake earlier order, so the "Earlier" list has something to show.
export const MOCK_PAST_ORDERS: Order[] = [
  {
    id: 'order-4021',
    number: 4021,
    venue: {
      id: 'cafe-aalto',
      name: 'Café Aalto',
      image: require('@/assets/images/onboarding/cafe-interior.jpg'),
      deliveryMinutes: { min: 10, max: 15 },
    },
    items: [{ menuItemId: 'oat-latte', name: 'Oat latte', quantity: 1, unitPriceCents: 480 }],
    totalCents: 480,
    spot: { label: 'Table 3', location: null, photoUri: null, hint: '' },
    status: 'delivered',
    createdAt: '2026-10-14T08:40:00.000Z',
  },
];
