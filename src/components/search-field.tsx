import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { Icon, Icons } from '@/components/icon';
import { Radius, Spacing, Typography } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SearchFieldProps = Omit<TextInputProps, 'style' | 'placeholderTextColor'>;

export function SearchField(props: SearchFieldProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <Icon name={Icons.search} color="textSecondary" />
      <TextInput
        autoCorrect={false}
        clearButtonMode="while-editing"
        returnKeyType="search"
        placeholderTextColor={theme.textTertiary}
        style={[styles.input, { color: theme.text }]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderWidth: 1,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.md,
    fontFamily: Typography.section.fontFamily,
    fontSize: Typography.section.fontSize,
  },
});
