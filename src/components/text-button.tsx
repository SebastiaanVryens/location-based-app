import { Pressable, StyleSheet } from 'react-native';

import { Icon, type IconName } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

type TextButtonProps = {
  label: string;
  icon?: IconName;
  onPress?: () => void;
};

// A small green text link, like "View all" or "+ Add more items".
export function TextButton({ label, icon, onPress }: TextButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      hitSlop={Spacing.sm}
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      {icon ? <Icon name={icon} size="sm" color="primary" /> : null}
      <ThemedText type="label" color="primary">
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  pressed: {
    opacity: 0.6,
  },
});
