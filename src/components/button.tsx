import { Pressable, StyleSheet, type PressableProps } from 'react-native';

import { Icon, type IconName } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing, type ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ButtonVariant = 'primary' | 'inverse' | 'inverseOutline';

// `inverse` and `inverseOutline` are for dark backgrounds, like the camera or a dark card.
const VARIANTS: Record<
  ButtonVariant,
  { background?: ThemeColor; border?: ThemeColor; text: ThemeColor }
> = {
  primary: { background: 'primary', text: 'onPrimary' },
  inverse: { background: 'onInverse', text: 'surfaceInverse' },
  inverseOutline: { border: 'onInverseSecondary', text: 'onInverse' },
};

type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  icon?: IconName;
  variant?: ButtonVariant;
  // `small` fits next to text, like "Sign in" in a card.
  size?: 'regular' | 'small';
};

export function Button({
  label,
  icon,
  variant = 'primary',
  size = 'regular',
  disabled,
  ...rest
}: ButtonProps) {
  const theme = useTheme();
  const colors = VARIANTS[variant];

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        size === 'small' && styles.small,
        colors.background && { backgroundColor: theme[colors.background] },
        colors.border && { borderWidth: 1, borderColor: theme[colors.border] },
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
      {...rest}
    >
      <ThemedText type={size === 'small' ? 'label' : 'button'} color={colors.text}>
        {label}
      </ThemedText>
      {icon && <Icon name={icon} color={colors.text} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
  },
  small: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.sm,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.4,
  },
});
