import { useEffect } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const SIZE = 232;
const CORNER_LENGTH = 48;
const STROKE = 4;

const SCAN_LINE_HEIGHT = 2;
// Gap between the scan line and the frame's top and bottom edges.
const SCAN_LINE_INSET = Spacing.lg;
const SCAN_LINE_TRAVEL = SIZE - 2 * SCAN_LINE_INSET - SCAN_LINE_HEIGHT;
// Time for one sweep from top to bottom. Slow enough to feel calm.
const SWEEP_DURATION_MS = 2000;

// Each corner is a square that only draws two of its borders, forming an "L".
const CORNERS: ViewStyle[] = [
  {
    top: 0,
    left: 0,
    borderTopWidth: STROKE,
    borderLeftWidth: STROKE,
    borderTopLeftRadius: Radius.lg,
  },
  {
    top: 0,
    right: 0,
    borderTopWidth: STROKE,
    borderRightWidth: STROKE,
    borderTopRightRadius: Radius.lg,
  },
  {
    bottom: 0,
    left: 0,
    borderBottomWidth: STROKE,
    borderLeftWidth: STROKE,
    borderBottomLeftRadius: Radius.lg,
  },
  {
    bottom: 0,
    right: 0,
    borderBottomWidth: STROKE,
    borderRightWidth: STROKE,
    borderBottomRightRadius: Radius.lg,
  },
];

export function QrViewfinder() {
  const theme = useTheme();
  const reduceMotion = useReducedMotion();
  // Where the line is: 0 is the top, 1 is the bottom. With Reduce Motion on, it stays in the middle.
  const progress = useSharedValue(reduceMotion ? 0.5 : 0);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    // Sweep to the bottom, then back up (`true` reverses every other run), forever (-1).
    progress.set(
      withRepeat(
        withTiming(1, { duration: SWEEP_DURATION_MS, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      ),
    );

    return () => cancelAnimation(progress);
  }, [reduceMotion, progress]);

  const scanLineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: progress.get() * SCAN_LINE_TRAVEL }],
  }));

  return (
    <View style={styles.frame}>
      {CORNERS.map((corner, i) => (
        <View key={i} style={[styles.corner, corner, { borderColor: theme.onInverse }]} />
      ))}
      <Animated.View style={[styles.scanLine, { backgroundColor: theme.success }, scanLineStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: SIZE,
    height: SIZE,
  },
  corner: {
    position: 'absolute',
    width: CORNER_LENGTH,
    height: CORNER_LENGTH,
  },
  scanLine: {
    position: 'absolute',
    top: SCAN_LINE_INSET,
    left: Spacing.md,
    right: Spacing.md,
    height: SCAN_LINE_HEIGHT,
  },
});
