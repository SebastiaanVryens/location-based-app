import { StyleSheet, View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type AccountCardProps = {
  // The signed-in user, or null to show the "Sign in" invitation.
  account: { name: string; email: string } | null;
  onSignIn: () => void;
  onSignOut: () => void;
};

// The dark card at the top of Profile.
export function AccountCard({ account, onSignIn, onSignOut }: AccountCardProps) {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.surfaceInverse }]}>
      <Avatar name={account?.name ?? 'A'} />
      <View style={styles.text}>
        <ThemedText type="section" color="onInverse" numberOfLines={1}>
          {account ? account.name : 'Welcome'}
        </ThemedText>
        <ThemedText type="small" color="onInverseSecondary" numberOfLines={account ? 1 : undefined}>
          {account ? account.email : 'Sign in to order and save your order history.'}
        </ThemedText>
      </View>
      {account ? (
        <Button size="small" variant="inverseOutline" label="Sign out" onPress={onSignOut} />
      ) : (
        <Button size="small" variant="inverse" label="Sign in" onPress={onSignIn} />
      )}
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
