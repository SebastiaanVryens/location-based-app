import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CameraHeader } from '@/components/camera-header';
import { CameraPermissionNotice } from '@/components/camera-permission-notice';
import { Icons } from '@/components/icon';
import { IconButton } from '@/components/icon-button';
import { QrViewfinder } from '@/components/qr-viewfinder';
import { ThemedText } from '@/components/themed-text';
import { Colors, Spacing } from '@/constants/theme';

export default function ScanScreen() {
  const insets = useSafeAreaInsets();
  // `request: true` shows the camera permission prompt as soon as the screen opens.
  const [permission, requestPermission] = useCameraPermissions({ request: true });
  const [isTorchOn, setIsTorchOn] = useState(false);
  const isCameraDenied = permission !== null && !permission.granted;

  return (
    <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar style="light" />

      {permission?.granted ? (
        <CameraView style={StyleSheet.absoluteFill} facing="back" enableTorch={isTorchOn} />
      ) : null}
      <View style={[StyleSheet.absoluteFill, styles.dim]} />

      <CameraHeader
        title="Scan QR code"
        onClose={() => router.back()}
        accessory={
          <IconButton
            icon={isTorchOn ? Icons.flashOn : Icons.flashOff}
            accessibilityLabel={isTorchOn ? 'Turn flashlight off' : 'Turn flashlight on'}
            color="onInverse"
            borderColor="onInverseSecondary"
            disabled={!permission?.granted}
            onPress={() => setIsTorchOn((on) => !on)}
          />
        }
      />

      <View style={styles.content}>
        <View style={styles.instructions}>
          <ThemedText type="title" color="onInverse" style={styles.centered}>
            Point your camera at the code
          </ThemedText>
          <ThemedText type="caption" color="onInverseSecondary" style={styles.centered}>
            You&apos;ll find it on your table, seat, or nearby sign.
          </ThemedText>
        </View>

        {isCameraDenied ? (
          <CameraPermissionNotice
            message="Camera access is needed to scan the code."
            permission={permission}
            requestPermission={requestPermission}
          />
        ) : (
          <QrViewfinder />
        )}
      </View>

      <View style={styles.footer}>
        <ThemedText type="caption" color="onInverseSecondary">
          No QR code nearby?
        </ThemedText>
        <Pressable accessibilityRole="button" hitSlop={Spacing.sm} onPress={() => router.back()}>
          <ThemedText type="itemTitle" color="onInverse" style={styles.link}>
            Find a venue instead
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // Shown until the camera starts, or when camera access is off. Dark in both themes.
    backgroundColor: Colors.dark.background,
  },
  // Darkens the camera picture so the white text and frame stay readable.
  dim: {
    backgroundColor: Colors.dark.background,
    opacity: 0.4,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.xxxl,
  },
  instructions: {
    gap: Spacing.sm,
    paddingHorizontal: Spacing.xl,
  },
  centered: {
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    gap: Spacing.sm,
    paddingBottom: Spacing.xl,
  },
  link: {
    textDecorationLine: 'underline',
  },
});
