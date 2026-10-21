import { Pressable, StyleSheet, View } from 'react-native';

import { Icon, Icons, type IconName } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type SettingsTileProps = {
  name: string;
  icon: IconName;
  // The current setting, shown on the right, like "English".
  value?: string;
  onPress?: () => void;
  showDivider?: boolean;
};

export function SettingsTile({
  name,
  icon,
  value,
  onPress,
  showDivider = false,
}: SettingsTileProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={value ? `${name}, ${value}` : name}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: pressed ? theme.surfaceMuted : theme.surface },
        showDivider && {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: theme.border,
        },
      ]}
    >
      <View style={[styles.iconWrapper, { backgroundColor: theme.primarySoft }]}>
        <Icon name={icon} size="md" color="primary" />
      </View>
      <ThemedText type="label" style={styles.name}>
        {name}
      </ThemedText>
      {value ? (
        <ThemedText type="small" color="textSecondary">
          {value}
        </ThemedText>
      ) : null}
      {onPress ? <Icon name={Icons.chevronRight} size="sm" /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    minHeight: 56,
  },
  iconWrapper: {
    width: 34,
    height: 34,
    borderRadius: Radius.sm,
    borderCurve: 'continuous',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    flex: 1,
  },
});
