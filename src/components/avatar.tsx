import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type AvatarProps = {
  name: string;
  onPress?: () => void;
};

export function Avatar({ name, onPress }: AvatarProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={name}
      disabled={!onPress}
      onPress={onPress}
      style={[styles.avatar, { backgroundColor: theme.accentCream }]}
    >
      <ThemedText type="section" weight="bold" color="onAccent">
        {name.charAt(0).toUpperCase()}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
