import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { Icons } from '@/components/icon';
import { IconButton } from '@/components/icon-button';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

type CameraHeaderProps = {
  title: string;
  onClose: () => void;
  // Optional button on the right, like the flashlight.
  accessory?: ReactNode;
};

// The top bar of the dark camera screens: close button, title, and an optional button.
export function CameraHeader({ title, onClose, accessory }: CameraHeaderProps) {
  return (
    <View style={styles.bar}>
      <IconButton
        icon={Icons.close}
        accessibilityLabel="Close"
        color="onInverse"
        borderColor="onInverseSecondary"
        onPress={onClose}
      />
      <ThemedText type="section" color="onInverse" style={styles.title}>
        {title}
      </ThemedText>
      {/* An empty box the size of a button keeps the title centered. */}
      {accessory ?? <View style={styles.placeholder} />}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.sm,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
});
