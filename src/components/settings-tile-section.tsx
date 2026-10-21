import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/card';
import { SettingsTile, type SettingsTileProps } from '@/components/settings-tile';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

type Props = {
  title: string;
  tiles: Omit<SettingsTileProps, 'showDivider'>[];
};

export function SettingsTileSection({ title, tiles }: Props) {
  return (
    <View style={styles.container}>
      <ThemedText type="section" style={styles.title}>
        {title}
      </ThemedText>
      <Card>
        {tiles.map((tile, i) => (
          <SettingsTile key={tile.name} {...tile} showDivider={i < tiles.length - 1} />
        ))}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.sm,
  },
  title: {
    marginLeft: Spacing.xs,
  },
});
