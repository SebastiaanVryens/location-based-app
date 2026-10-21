import { type ImageProps } from 'expo-image';

export type MenuItem = {
  id: string;
  venueId: string;
  name: string;
  description: string;
  // Money is stored in whole cents (480 = €4.80), because decimals round incorrectly.
  priceCents: number;
  category: string;
  isPopular: boolean;
  image?: ImageProps['source'];
};
