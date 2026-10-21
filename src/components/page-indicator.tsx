import { StyleSheet, View } from 'react-native';

import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type PageIndicatorProps = {
  count: number;
  activeIndex: number;
};

export function PageIndicator({ count, activeIndex }: PageIndicatorProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {Array.from({ length: count }, (_, i) => {
        const isActive = i === activeIndex;

        return (
          <View
            key={i}
            style={[
              styles.dot,
              isActive && styles.activeDot,
              { backgroundColor: isActive ? theme.primary : theme.textTertiary },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: Radius.full,
  },
  activeDot: {
    width: 18,
  },
});
