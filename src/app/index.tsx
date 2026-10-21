import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { Icons } from '@/components/icon';
import { OnboardingSlide, type OnboardingSlideData } from '@/components/onboarding-slide';
import { PageIndicator } from '@/components/page-indicator';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

const coffeeTablePhoto = require('@/assets/images/onboarding/coffee-table.jpg');

const SLIDES: OnboardingSlideData[] = [
  {
    image: coffeeTablePhoto,
    icon: Icons.location,
    overline: 'Order without the queue',
    title: 'Your favourites, delivered right to your spot.',
    description:
      "At a table, in your seat, or anywhere at the venue. Order, relax, and we'll find you.",
    statusCard: { title: 'On the way', subtitle: 'Arriving at Table 7' },
  },
  {
    image: require('@/assets/images/onboarding/cafe-interior.jpg'),
    icon: Icons.qrCode,
    overline: 'Quick & easy',
    title: "Scan your spot. We'll handle the rest.",
    description: 'Use a nearby QR code to instantly connect to the right venue and delivery spot.',
  },
  {
    image: coffeeTablePhoto,
    icon: Icons.camera,
    overline: 'Easy to find',
    title: 'A quick photo helps us find you.',
    description:
      "We only share your spot photo with the venue for this order. Location is used when there's no QR.",
  },
];

export default function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === SLIDES.length - 1;

  function finishOnboarding() {
    router.replace('/home');
  }

  function handleContinue() {
    if (isLastSlide) {
      finishOnboarding();
      return;
    }
    scrollRef.current?.scrollTo({ x: width * (activeIndex + 1), animated: true });
  }

  return (
    <ThemedView style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={(event) => setActiveIndex(Math.round(event.nativeEvent.contentOffset.x / width))}
      >
        {SLIDES.map((slide) => (
          <OnboardingSlide key={slide.title} width={width} {...slide} />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <PageIndicator count={SLIDES.length} activeIndex={activeIndex} />
        <Button
          label={isLastSlide ? 'Get started' : 'Continue'}
          icon={Icons.chevronRight}
          onPress={handleContinue}
        />
      </View>

      <Pressable
        accessibilityRole="button"
        hitSlop={Spacing.md}
        onPress={finishOnboarding}
        style={[styles.skip, { top: insets.top + Spacing.sm }]}
      >
        <ThemedText type="label" color="textSecondary">
          Skip
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  footer: {
    gap: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.sm,
  },
  skip: {
    position: 'absolute',
    right: Spacing.xxl,
  },
});
