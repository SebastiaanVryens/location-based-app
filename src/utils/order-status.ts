import { type Order, type OrderItem, type OrderStatus } from '@/types/order';

// The steps an order moves through after payment, in order. One progress bar segment each.
export const ORDER_PROGRESS: OrderStatus[] = ['paid', 'preparing', 'on_the_way', 'delivered'];

const STATUS_LABELS: Record<OrderStatus, string> = {
  awaiting_payment: 'Waiting for payment',
  paid: 'Order received',
  preparing: 'Preparing your order',
  on_the_way: 'On the way',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export function getStatusLabel(status: OrderStatus) {
  return STATUS_LABELS[status];
}

export function isOrderActive(order: Order) {
  return order.status !== 'delivered' && order.status !== 'cancelled';
}

export function countItems(items: OrderItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
