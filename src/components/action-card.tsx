import { Pressable, StyleSheet, View } from 'react-native';

import { Icon, Icons, type IconName } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Shadow, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ActionCardProps = {
  icon: IconName;
  title: string;
  subtitle: string;
  onPress?: () => void;
};

export function ActionCard({ icon, title, subtitle, onPress }: ActionCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.primary, opacity: pressed ? 0.8 : 1 },
      ]}
    >
      <View style={[styles.iconTile, { backgroundColor: theme.onPrimaryTint }]}>
        <Icon name={icon} size="lg" color="onPrimary" />
      </View>
      <View style={styles.text}>
        <ThemedText type="button" color="onPrimary">
          {title}
        </ThemedText>
        <ThemedText type="caption" color="onPrimarySecondary">
          {subtitle}
        </ThemedText>
      </View>
      <Icon name={Icons.chevronRight} color="onPrimary" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
    boxShadow: Shadow.md,
  },
  iconTile: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    gap: Spacing.xs,
  },
});
