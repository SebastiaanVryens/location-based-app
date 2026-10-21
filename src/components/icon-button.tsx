import { Pressable, StyleSheet, type PressableProps } from 'react-native';

import { Icon, type IconName } from '@/components/icon';
import { Radius, type ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type IconButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  icon: IconName;
  accessibilityLabel: string;
  color?: ThemeColor;
  borderColor?: ThemeColor;
  background?: ThemeColor;
};

export function IconButton({
  icon,
  color = 'text',
  borderColor = 'border',
  background,
  disabled,
  ...rest
}: IconButtonProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      hitSlop={4}
      style={({ pressed }) => [
        styles.button,
        { borderColor: theme[borderColor] },
        background && { backgroundColor: theme[background] },
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
      {...rest}
    >
      <Icon name={icon} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
  disabled: {
    opacity: 0.4,
  },
});
