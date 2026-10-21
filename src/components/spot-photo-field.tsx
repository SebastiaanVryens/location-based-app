import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { Icon, Icons } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SpotPhotoFieldProps = {
  photoUri: string | null;
  onTakePhoto: () => void;
};

// An empty "Take a photo" box, or the photo with a "Retake" button once it is taken.
export function SpotPhotoField({ photoUri, onTakePhoto }: SpotPhotoFieldProps) {
  const theme = useTheme();

  if (!photoUri) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onTakePhoto}
        style={({ pressed }) => [
          styles.empty,
          { backgroundColor: theme.primarySoft, borderColor: theme.primary },
          pressed && styles.pressed,
        ]}
      >
        <View style={[styles.iconTile, { backgroundColor: theme.primary }]}>
          <Icon name={Icons.camera} size="lg" color="onPrimary" />
        </View>
        <ThemedText type="itemTitle">Take a photo</ThemedText>
        <ThemedText type="caption" color="textSecondary" style={styles.centered}>
          Make sure your table or surroundings are visible
        </ThemedText>
      </Pressable>
    );
  }

  return (
    <View style={styles.preview}>
      <Image source={photoUri} contentFit="cover" style={StyleSheet.absoluteFill} />
      <View style={[StyleSheet.absoluteFill, styles.dim]} />
      <ThemedText type="label" color="onInverse" style={styles.added}>
        Photo added ✓
      </ThemedText>
      <Pressable
        accessibilityRole="button"
        onPress={onTakePhoto}
        style={({ pressed }) => [
          styles.retake,
          { backgroundColor: theme.surface },
          pressed && styles.pressed,
        ]}
      >
        <ThemedText type="label">Retake</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.xl,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderRadius: Radius.md,
  },
  pressed: {
    opacity: 0.8,
  },
  iconTile: {
    width: 52,
    height: 52,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  centered: {
    textAlign: 'center',
  },
  preview: {
    height: 150,
    overflow: 'hidden',
    borderRadius: Radius.md,
    borderCurve: 'continuous',
  },
  // Darkens the photo a little so the white text stays readable. Dark in both themes.
  dim: {
    backgroundColor: Colors.dark.background,
    opacity: 0.25,
  },
  added: {
    position: 'absolute',
    left: Spacing.lg,
    bottom: Spacing.lg,
  },
  retake: {
    position: 'absolute',
    right: Spacing.md,
    bottom: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.sm,
  },
});
