import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { BottomBar } from '@/components/bottom-bar';
import { Button } from '@/components/button';
import { SegmentedControl } from '@/components/segmented-control';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { signIn, signUp } from '@/data/auth';

const MODES = [
  { value: 'signIn', label: 'Sign in' },
  { value: 'signUp', label: 'Create account' },
] as const;

type Mode = (typeof MODES)[number]['value'];

export default function SignInScreen() {
  const [mode, setMode] = useState<Mode>('signIn');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);

  const isCreating = mode === 'signUp';
  const canSubmit =
    !isBusy && email.trim() !== '' && password !== '' && (!isCreating || fullName.trim() !== '');

  function changeMode(next: Mode) {
    setMode(next);
    setError(null);
  }

  async function handleSubmit() {
    if (!canSubmit) return;

    setIsBusy(true);
    setError(null);
    const message = isCreating
      ? await signUp(fullName, email, password)
      : await signIn(email, password);
    setIsBusy(false);

    if (message) {
      setError(message);
      return;
    }
    router.back();
  }

  return (
    <ThemedView style={styles.screen}>
      <Stack.Screen options={{ title: isCreating ? 'Create account' : 'Sign in' }} />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        automaticallyAdjustKeyboardInsets
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        <View style={styles.centered}>
          <SegmentedControl options={MODES} value={mode} onChange={changeMode} />
        </View>

        <ThemedText color="textSecondary" style={styles.intro}>
          {isCreating
            ? 'Create an account to order and keep your order history.'
            : 'Sign in to order and see your order history.'}
        </ThemedText>

        <View style={styles.fields}>
          {isCreating ? (
            <TextField
              label="Name"
              placeholder="Your name"
              autoComplete="name"
              textContentType="name"
              value={fullName}
              onChangeText={setFullName}
            />
          ) : null}
          <TextField
            label="Email"
            placeholder="you@example.com"
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            value={email}
            onChangeText={setEmail}
          />
          <TextField
            label="Password"
            placeholder={isCreating ? 'At least 6 characters' : 'Your password'}
            secureTextEntry
            autoCapitalize="none"
            autoComplete={isCreating ? 'new-password' : 'current-password'}
            textContentType={isCreating ? 'newPassword' : 'password'}
            returnKeyType="go"
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={handleSubmit}
          />
        </View>

        {error ? (
          <ThemedText color="danger" accessibilityLiveRegion="polite">
            {error}
          </ThemedText>
        ) : null}
      </ScrollView>

      <BottomBar>
        <Button
          label={isBusy ? 'One moment…' : isCreating ? 'Create account' : 'Sign in'}
          disabled={!canSubmit}
          onPress={handleSubmit}
        />
      </BottomBar>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    gap: Spacing.xl,
    padding: Spacing.xl,
  },
  centered: {
    alignItems: 'center',
  },
  intro: {
    textAlign: 'center',
  },
  fields: {
    gap: Spacing.md,
  },
});
