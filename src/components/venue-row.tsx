import { type StyleProp, type ViewStyle } from 'react-native';

import { Icon, Icons } from '@/components/icon';
import { RowCard } from '@/components/row-card';
import { ThemedText } from '@/components/themed-text';
import { type NearbyVenue } from '@/types/venue';
import { formatDeliveryTime, formatDistance } from '@/utils/format';

type VenueRowProps = {
  venue: NearbyVenue;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function VenueRow({ venue, onPress, style }: VenueRowProps) {
  return (
    <RowCard
      image={venue.image}
      accessory={<Icon name={Icons.chevronRight} />}
      onPress={onPress}
      style={style}
    >
      <ThemedText type="itemTitle">{venue.name}</ThemedText>
      <ThemedText type="caption" color="textSecondary">
        {formatDistance(venue.distanceMeters)} · {formatDeliveryTime(venue.deliveryMinutes)}
      </ThemedText>
    </RowCard>
  );
}
