import { Pressable, StyleSheet, View } from 'react-native';

import { Icon, Icons, type IconName } from '@/components/icon';
import { IconButton } from '@/components/icon-button';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type QuantityStepperProps = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

// Shows a single "+" while the quantity is 0, and "− 1 +" once something is added.
export function QuantityStepper({ quantity, onIncrease, onDecrease }: QuantityStepperProps) {
  const theme = useTheme();

  if (quantity === 0) {
    return (
      <IconButton
        icon={Icons.plus}
        accessibilityLabel="Add"
        background="surface"
        onPress={onIncrease}
      />
    );
  }

  return (
    <View style={[styles.stepper, { borderColor: theme.border }]}>
      <StepButton icon={Icons.minus} accessibilityLabel="Remove one" onPress={onDecrease} />
      <ThemedText type="label" style={styles.count}>
        {quantity}
      </ThemedText>
      <StepButton icon={Icons.plus} accessibilityLabel="Add one" onPress={onIncrease} />
    </View>
  );
}

type StepButtonProps = {
  icon: IconName;
  accessibilityLabel: string;
  onPress: () => void;
};

function StepButton({ icon, accessibilityLabel, onPress }: StepButtonProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={4}
      onPress={onPress}
      style={({ pressed }) => [
        styles.stepButton,
        { backgroundColor: theme.surfaceMuted },
        pressed && styles.pressed,
      ]}
    >
      <Icon name={icon} size="sm" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.xs,
    borderWidth: 1,
    borderRadius: Radius.full,
  },
  stepButton: {
    width: 28,
    height: 28,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
  count: {
    minWidth: 24,
    textAlign: 'center',
  },
});
