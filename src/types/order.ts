import { type LatLng } from 'react-native-maps';

import { type MenuItem } from '@/types/menu';
import { type Venue } from '@/types/venue';

export type CartLine = {
  item: MenuItem;
  quantity: number;
};

// Where the order should be brought. A QR scan will later set the label to e.g. "Table 7".
export type DeliverySpot = {
  label: string;
  location: LatLng | null;
  photoUri: string | null;
  hint: string;
};

export type OrderStatus =
  'awaiting_payment' | 'paid' | 'preparing' | 'on_the_way' | 'delivered' | 'cancelled';

// A copy of each item as it was ordered, so later menu changes don't change old orders.
export type OrderItem = {
  menuItemId: string;
  name: string;
  quantity: number;
  unitPriceCents: number;
};

export type Order = {
  id: string;
  number: number;
  venue: Pick<Venue, 'id' | 'name' | 'image' | 'deliveryMinutes'>;
  items: OrderItem[];
  totalCents: number;
  spot: DeliverySpot;
  status: OrderStatus;
  createdAt: string;
};
