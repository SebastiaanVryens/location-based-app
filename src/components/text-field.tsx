import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { FontFamily, Radius, Spacing, Typography } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type TextFieldProps = Omit<TextInputProps, 'style' | 'placeholderTextColor'> & {
  label: string;
  optional?: boolean;
};

// A text input with its label inside the box, above the text.
export function TextField({ label, optional = false, ...rest }: TextFieldProps) {
  const theme = useTheme();

  return (
    <View style={[styles.field, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <View style={styles.labelRow}>
        <ThemedText type="small" color="textSecondary">
          {label}
        </ThemedText>
        {optional ? (
          <ThemedText type="small" color="textTertiary">
            Optional
          </ThemedText>
        ) : null}
      </View>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={theme.textTertiary}
        style={[styles.input, { color: theme.text }]}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: 2,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
    borderWidth: 1,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    paddingVertical: Spacing.xs,
    fontFamily: FontFamily.regular,
    fontSize: Typography.itemTitle.fontSize,
  },
});
