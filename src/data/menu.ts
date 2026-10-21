import { type MenuItem } from '@/types/menu';

const coffeeTablePhoto = require('@/assets/images/onboarding/coffee-table.jpg');

// Fake menu. Later each venue adds and edits its own items in the database.
// Items without a photo show a placeholder, as they will when a venue skips the photo.
const MOCK_MENU: MenuItem[] = [
  {
    id: 'oat-latte',
    venueId: 'cafe-aalto',
    name: 'Oat latte',
    description: 'Double espresso, silky oat milk',
    priceCents: 480,
    category: 'Coffee',
    isPopular: true,
    image: coffeeTablePhoto,
  },
  {
    id: 'butter-croissant',
    venueId: 'cafe-aalto',
    name: 'Butter croissant',
    description: 'Baked here every morning',
    priceCents: 360,
    category: 'Pastries',
    isPopular: true,
    image: coffeeTablePhoto,
  },
  {
    id: 'aalto-brunch',
    venueId: 'cafe-aalto',
    name: 'Aalto brunch',
    description: 'Eggs, sourdough, seasonal greens',
    priceCents: 1290,
    category: 'Food',
    isPopular: true,
    image: coffeeTablePhoto,
  },
  {
    id: 'espresso',
    venueId: 'cafe-aalto',
    name: 'Espresso',
    description: 'Short, rich and locally roasted',
    priceCents: 300,
    category: 'Coffee',
    isPopular: false,
  },
  {
    id: 'cappuccino',
    venueId: 'cafe-aalto',
    name: 'Cappuccino',
    description: 'Espresso with velvety milk foam',
    priceCents: 450,
    category: 'Coffee',
    isPopular: false,
  },
  {
    id: 'cinnamon-bun',
    venueId: 'cafe-aalto',
    name: 'Cinnamon bun',
    description: 'Finnish korvapuusti with cardamom',
    priceCents: 390,
    category: 'Pastries',
    isPopular: false,
  },
  {
    id: 'avocado-toast',
    venueId: 'cafe-aalto',
    name: 'Avocado toast',
    description: 'Sourdough, avocado, chili and lime',
    priceCents: 950,
    category: 'Food',
    isPopular: false,
  },
];

// Pretends to be the backend: returns a venue's menu.
export function getMenu(venueId: string): MenuItem[] {
  return MOCK_MENU.filter((item) => item.venueId === venueId);
}
