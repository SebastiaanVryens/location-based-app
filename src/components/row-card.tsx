import { Image, type ImageProps } from 'expo-image';
import { type ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type RowCardProps = {
  children: ReactNode;
  image?: ImageProps['source'];
  // Shown on the right, e.g. a chevron, a check mark or a status chip.
  accessory?: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

// A card with an optional thumbnail, any text you pass in, and something on the right.
export function RowCard({ children, image, accessory, onPress, style }: RowCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.surface, borderColor: theme.border },
        pressed && styles.pressed,
        style,
      ]}
    >
      {image ? <Image source={image} contentFit="cover" style={styles.thumbnail} /> : null}
      <View style={styles.content}>{children}</View>
      {accessory}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
  },
  pressed: {
    opacity: 0.8,
  },
  thumbnail: {
    width: 52,
    height: 52,
    borderRadius: Radius.sm,
  },
  content: {
    flex: 1,
    gap: 2,
  },
});
