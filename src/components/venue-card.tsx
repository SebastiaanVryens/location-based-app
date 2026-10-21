import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { Icon, Icons, type IconName } from '@/components/icon';
import { OpenStatus } from '@/components/open-status';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { type NearbyVenue } from '@/types/venue';
import { formatDeliveryTime, formatDistance } from '@/utils/format';

type VenueCardProps = {
  venue: NearbyVenue;
  onPress?: () => void;
};

export function VenueCard({ venue, onPress }: VenueCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.surface, borderColor: theme.border, opacity: pressed ? 0.8 : 1 },
      ]}
    >
      <View style={styles.imageWrapper}>
        <Image source={venue.image} contentFit="cover" style={StyleSheet.absoluteFill} />
        <View style={[styles.distance, { backgroundColor: theme.surface }]}>
          <Icon name={Icons.pin} size="sm" />
          <ThemedText type="label">{formatDistance(venue.distanceMeters)}</ThemedText>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.info}>
          <ThemedText type="section">{venue.name}</ThemedText>
          <ThemedText type="caption" color="textSecondary">
            {venue.categories.join(' · ')}
          </ThemedText>

          <View style={styles.meta}>
            <OpenStatus isOpen={venue.isOpen} />
            <MetaItem icon={Icons.clock} label={formatDeliveryTime(venue.deliveryMinutes)} />
            <MetaItem icon={Icons.star} label={venue.rating.toFixed(1)} />
          </View>
        </View>

        <Icon name={Icons.chevronRight} />
      </View>
    </Pressable>
  );
}

function MetaItem({ icon, label }: { icon: IconName; label: string }) {
  return (
    <View style={styles.metaItem}>
      <Icon name={icon} size="sm" color="textSecondary" />
      <ThemedText type="caption" color="textSecondary">
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
  },
  imageWrapper: {
    height: 140,
  },
  distance: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.lg,
  },
  info: {
    flex: 1,
    gap: Spacing.xs,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    marginTop: Spacing.xs,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
});
