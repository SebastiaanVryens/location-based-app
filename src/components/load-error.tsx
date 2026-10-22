import { StyleSheet, View } from 'react-native';

import { TextButton } from '@/components/text-button';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

type LoadErrorProps = {
  message: string;
  onRetry: () => void;
};

// Shown when data couldn't be loaded from the backend, e.g. without an internet connection.
export function LoadError({ message, onRetry }: LoadErrorProps) {
  return (
    <View style={styles.container}>
      <ThemedText color="textSecondary" style={styles.message}>
        {message}
      </ThemedText>
      <TextButton label="Try again" onPress={onRetry} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.xl,
  },
  message: {
    textAlign: 'center',
  },
});
