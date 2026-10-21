import { createContext, useContext, useState, type ReactNode } from 'react';

import { type MenuItem } from '@/types/menu';
import { type CartLine, type DeliverySpot } from '@/types/order';
import { type Venue } from '@/types/venue';

const SERVICE_FEE_CENTS = 0;

type CartState = {
  venue: Venue | null;
  lines: CartLine[];
  spot: DeliverySpot;
};

const EMPTY_CART: CartState = {
  venue: null,
  lines: [],
  spot: { label: 'Your location', location: null, photoUri: null, hint: '' },
};

type CartContextValue = CartState & {
  itemCount: number;
  subtotalCents: number;
  serviceFeeCents: number;
  totalCents: number;
  getQuantity: (itemId: string) => number;
  addItem: (venue: Venue, item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateSpot: (changes: Partial<DeliverySpot>) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

// Holds the cart while the user moves between the menu, cart, spot and checkout screens.
// It lives only in memory. The order is saved when it is placed.
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>(EMPTY_CART);

  const itemCount = cart.lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotalCents = cart.lines.reduce(
    (sum, line) => sum + line.quantity * line.item.priceCents,
    0,
  );

  function getQuantity(itemId: string) {
    return cart.lines.find((line) => line.item.id === itemId)?.quantity ?? 0;
  }

  function addItem(venue: Venue, item: MenuItem) {
    setCart((current) => {
      // A cart holds items from one venue. Adding from another venue starts a new cart.
      const base = current.venue?.id === venue.id ? current : { ...EMPTY_CART, venue };
      const hasItem = base.lines.some((line) => line.item.id === item.id);
      const lines = hasItem
        ? base.lines.map((line) =>
            line.item.id === item.id ? { ...line, quantity: line.quantity + 1 } : line,
          )
        : [...base.lines, { item, quantity: 1 }];

      return { ...base, lines };
    });
  }

  function removeItem(itemId: string) {
    setCart((current) => ({
      ...current,
      lines: current.lines
        .map((line) => (line.item.id === itemId ? { ...line, quantity: line.quantity - 1 } : line))
        .filter((line) => line.quantity > 0),
    }));
  }

  function updateSpot(changes: Partial<DeliverySpot>) {
    setCart((current) => ({ ...current, spot: { ...current.spot, ...changes } }));
  }

  function clear() {
    setCart(EMPTY_CART);
  }

  return (
    <CartContext
      value={{
        ...cart,
        itemCount,
        subtotalCents,
        serviceFeeCents: SERVICE_FEE_CENTS,
        totalCents: subtotalCents + SERVICE_FEE_CENTS,
        getQuantity,
        addItem,
        removeItem,
        updateSpot,
        clear,
      }}
    >
      {children}
    </CartContext>
  );
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) {
    throw new Error('useCart must be used inside <CartProvider>.');
  }
  return cart;
}
