import { Image, type ImageProps } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { Icon, type IconName } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type OnboardingSlideData = {
  image: ImageProps['source'];
  icon: IconName;
  overline: string;
  title: string;
  description: string;
  statusCard?: { title: string; subtitle: string };
};

type OnboardingSlideProps = OnboardingSlideData & {
  width: number;
};

export function OnboardingSlide({
  width,
  image,
  icon,
  overline,
  title,
  description,
  statusCard,
}: OnboardingSlideProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { width }]}>
      <View style={styles.hero}>
        <Image source={image} contentFit="cover" style={StyleSheet.absoluteFill} />

        <View
          style={[styles.badge, { backgroundColor: theme.primary, borderColor: theme.primarySoft }]}
        >
          <Icon name={icon} color="onPrimary" />
        </View>

        {statusCard && (
          <View style={[styles.statusCard, { backgroundColor: theme.surface }]}>
            <ThemedText type="itemTitle">{statusCard.title}</ThemedText>
            <ThemedText type="small" color="textSecondary">
              {statusCard.subtitle}
            </ThemedText>
          </View>
        )}
      </View>

      <View style={styles.textBlock}>
        <View style={styles.heading}>
          <ThemedText type="overline" color="primary" style={styles.centered}>
            {overline}
          </ThemedText>
          <ThemedText type="display" style={styles.centered}>
            {title}
          </ThemedText>
        </View>
        <ThemedText color="textSecondary" style={styles.centered}>
          {description}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.xl,
  },
  hero: {
    flex: 1,
    maxHeight: 384,
    overflow: 'hidden',
    borderTopLeftRadius: 88,
    borderTopRightRadius: 88,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    borderCurve: 'continuous',
  },
  badge: {
    position: 'absolute',
    top: 52,
    alignSelf: 'center',
    width: 58,
    height: 58,
    borderWidth: 6,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusCard: {
    position: 'absolute',
    left: Spacing.lg,
    right: Spacing.lg,
    bottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
  },
  textBlock: {
    gap: Spacing.md,
    paddingTop: Spacing.xxl,
    paddingHorizontal: Spacing.sm,
  },
  heading: {
    gap: Spacing.xs,
  },
  centered: {
    textAlign: 'center',
  },
});
