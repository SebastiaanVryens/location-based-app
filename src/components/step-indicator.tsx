import { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing, type ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type StepIndicatorProps = {
  steps: readonly string[];
  // Index of the step the user is on. Earlier steps show as done.
  current: number;
};

export function StepIndicator({ steps, current }: StepIndicatorProps) {
  const theme = useTheme();

  function getColors(index: number): { circle: ThemeColor; border: ThemeColor; text: ThemeColor } {
    if (index < current) return { circle: 'primary', border: 'primary', text: 'onPrimary' };
    if (index === current) return { circle: 'surface', border: 'primary', text: 'primary' };
    return { circle: 'surfaceMuted', border: 'surfaceMuted', text: 'textTertiary' };
  }

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        {steps.map((step, index) => {
          const colors = getColors(index);

          return (
            <Fragment key={step}>
              {index > 0 ? (
                <View
                  style={[
                    styles.line,
                    { backgroundColor: index <= current ? theme.primary : theme.border },
                  ]}
                />
              ) : null}
              <View
                style={[
                  styles.circle,
                  { backgroundColor: theme[colors.circle], borderColor: theme[colors.border] },
                ]}
              >
                <ThemedText type="small" weight="bold" color={colors.text}>
                  {index + 1}
                </ThemedText>
              </View>
            </Fragment>
          );
        })}
      </View>

      <View style={styles.labels}>
        {steps.map((step) => (
          <ThemedText key={step} type="small" color="textSecondary">
            {step}
          </ThemedText>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.xs,
  },
  track: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    height: 2,
  },
  circle: {
    width: 28,
    height: 28,
    borderWidth: 2,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
