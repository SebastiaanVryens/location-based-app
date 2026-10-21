import { ScrollView, StyleSheet } from 'react-native';

import { RadioOption } from '@/components/radio-option';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

// Only English exists so far. Adding a language means translating every text in the app first.
export default function LanguageScreen() {
  return (
    <ThemedView style={styles.screen}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.content}>
        <RadioOption label="English" selected onPress={() => {}} />
        <ThemedText type="small" color="textSecondary" style={styles.note}>
          More languages, like Suomi, are coming soon.
        </ThemedText>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    gap: Spacing.md,
    padding: Spacing.xl,
  },
  note: {
    marginHorizontal: Spacing.xs,
  },
});
