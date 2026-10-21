import { createContext, useContext, useState, type ReactNode } from 'react';

import { MOCK_PAST_ORDERS } from '@/data/orders';
import { type CartLine, type DeliverySpot, type Order } from '@/types/order';
import { type Venue } from '@/types/venue';

type NewOrder = {
  venue: Venue;
  lines: CartLine[];
  spot: DeliverySpot;
  totalCents: number;
};

type OrdersContextValue = {
  orders: Order[];
  placeOrder: (order: NewOrder) => void;
};

const OrdersContext = createContext<OrdersContextValue | null>(null);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(MOCK_PAST_ORDERS);

  // Pretends to be the backend. Later this calls a Supabase Edge Function that checks
  // the prices, saves the order and starts the payment.
  function placeOrder({ venue, lines, spot, totalCents }: NewOrder) {
    const number = Math.floor(1000 + Math.random() * 9000);
    const order: Order = {
      id: `order-${number}`,
      number,
      venue: {
        id: venue.id,
        name: venue.name,
        image: venue.image,
        deliveryMinutes: venue.deliveryMinutes,
      },
      items: lines.map(({ item, quantity }) => ({
        menuItemId: item.id,
        name: item.name,
        quantity,
        unitPriceCents: item.priceCents,
      })),
      totalCents,
      spot,
      status: 'paid',
      createdAt: new Date().toISOString(),
    };

    setOrders((current) => [order, ...current]);
  }

  return <OrdersContext value={{ orders, placeOrder }}>{children}</OrdersContext>;
}

export function useOrders() {
  const orders = useContext(OrdersContext);
  if (!orders) {
    throw new Error('useOrders must be used inside <OrdersProvider>.');
  }
  return orders;
}
