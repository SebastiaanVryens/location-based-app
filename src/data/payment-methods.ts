import { Platform } from 'react-native';

import { type PaymentMethod } from '@/types/payment';

export const PAYMENT_METHODS: PaymentMethod[] = ['wallet', 'card'];

const WALLET_NAME = Platform.OS === 'ios' ? 'Apple Pay' : 'Google Pay';
// A fake saved card, until payments go through Stripe.
const SAVED_CARD_ENDING = '4821';

export function getPaymentMethodLabel(method: PaymentMethod) {
  return method === 'wallet' ? WALLET_NAME : `Card ending in ${SAVED_CARD_ENDING}`;
}
