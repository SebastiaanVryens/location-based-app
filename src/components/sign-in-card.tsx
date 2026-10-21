import { StyleSheet, View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SignInCardProps = {
  onSignIn?: () => void;
};

// The dark welcome card shown to people who are not signed in.
export function SignInCard({ onSignIn }: SignInCardProps) {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.surfaceInverse }]}>
      <Avatar name="A" />
      <View style={styles.text}>
        <ThemedText type="section" color="onInverse">
          Welcome
        </ThemedText>
        <ThemedText type="small" color="onInverseSecondary">
          Sign in to save your details and order history.
        </ThemedText>
      </View>
      <Button size="small" variant="inverse" label="Sign in" onPress={onSignIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
  },
  text: {
    flex: 1,
    gap: 2,
  },
});
