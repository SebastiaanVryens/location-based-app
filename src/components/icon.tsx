import { SymbolView, type SymbolViewProps } from 'expo-symbols';

import { IconSize, type ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type IconName = SymbolViewProps['name'];

// Icons used in several places, with their iOS (SF Symbols) and Android (Material) names.
export const Icons = {
  bag: { ios: 'bag', android: 'shopping_bag' },
  bell: { ios: 'bell', android: 'notifications' },
  camera: { ios: 'camera', android: 'photo_camera' },
  card: { ios: 'creditcard', android: 'credit_card' },
  check: { ios: 'checkmark', android: 'check' },
  chevronLeft: { ios: 'chevron.left', android: 'chevron_left' },
  chevronRight: { ios: 'chevron.right', android: 'chevron_right' },
  clock: { ios: 'clock', android: 'schedule' },
  close: { ios: 'xmark', android: 'close' },
  flashOff: { ios: 'bolt', android: 'flash_off' },
  flashOn: { ios: 'bolt.fill', android: 'flash_on' },
  food: { ios: 'fork.knife', android: 'restaurant' },
  help: { ios: 'questionmark.circle', android: 'help' },
  language: { ios: 'globe', android: 'language' },
  location: { ios: 'mappin.and.ellipse', android: 'location_on' },
  lock: { ios: 'lock', android: 'lock' },
  minus: { ios: 'minus', android: 'remove' },
  pin: { ios: 'mappin', android: 'location_on' },
  plus: { ios: 'plus', android: 'add' },
  privacy: { ios: 'hand.raised', android: 'privacy_tip' },
  qrCode: { ios: 'qrcode', android: 'qr_code' },
  search: { ios: 'magnifyingglass', android: 'search' },
  star: { ios: 'star', android: 'star' },
} satisfies Record<string, IconName>;

type IconProps = Omit<SymbolViewProps, 'name' | 'size' | 'tintColor'> & {
  name: IconName;
  size?: keyof typeof IconSize;
  color?: ThemeColor;
};

export function Icon({ name, size = 'md', color = 'text', ...rest }: IconProps) {
  const theme = useTheme();

  return <SymbolView name={name} size={IconSize[size]} tintColor={theme[color]} {...rest} />;
}
