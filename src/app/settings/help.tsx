import { ScrollView, StyleSheet } from 'react-native';

import { RowCard } from '@/components/row-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

const QUESTIONS = [
  {
    question: 'How does delivery to my spot work?',
    answer:
      'Scan the QR code on your table or seat, or share your location and a quick photo of your spot. The venue brings your order straight there.',
  },
  {
    question: 'Why do you need a photo of my spot?',
    answer:
      "When there's no QR code, the photo helps the staff recognise where you're sitting. Only that venue sees it, and only for that order.",
  },
  {
    question: 'How do I pay?',
    answer:
      'At checkout, with Apple Pay, Google Pay or a saved card. You can pick your default under Profile, Payment methods.',
  },
  {
    question: 'Where can I follow my order?',
    answer: 'In the Orders tab. The card at the top shows each step, from received to delivered.',
  },
];

export default function HelpScreen() {
  return (
    <ThemedView style={styles.screen}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.content}>
        {QUESTIONS.map(({ question, answer }) => (
          <RowCard key={question}>
            <ThemedText type="itemTitle">{question}</ThemedText>
            <ThemedText type="caption" color="textSecondary">
              {answer}
            </ThemedText>
          </RowCard>
        ))}
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
});
