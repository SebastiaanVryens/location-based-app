import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { CameraHeader } from '@/components/camera-header';
import { CameraPermissionNotice } from '@/components/camera-permission-notice';
import { Icons } from '@/components/icon';
import { IconButton } from '@/components/icon-button';
import { ThemedText } from '@/components/themed-text';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useCart } from '@/state/cart-context';

export default function SpotCameraScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { updateSpot } = useCart();
  const cameraRef = useRef<CameraView>(null);
  // `request: true` shows the camera permission prompt as soon as the screen opens.
  const [permission, requestPermission] = useCameraPermissions({ request: true });
  const [isTorchOn, setIsTorchOn] = useState(false);
  // The photo just taken, waiting for "Use photo" or "Retake".
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const isCameraDenied = permission !== null && !permission.granted;

  async function takePhoto() {
    const photo = await cameraRef.current?.takePictureAsync({ quality: 0.7 });
    if (photo) {
      setPhotoUri(photo.uri);
    }
  }

  function confirmPhoto() {
    updateSpot({ photoUri });
    router.back();
  }

  return (
    <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar style="light" />

      {photoUri ? (
        <>
          <Image source={photoUri} contentFit="cover" style={StyleSheet.absoluteFill} />
          <View style={[StyleSheet.absoluteFill, styles.dim]} />
          <CameraHeader title="Does this look clear?" onClose={() => router.back()} />
          <View style={styles.content} />
          <View style={styles.reviewActions}>
            <View style={styles.reviewButton}>
              <Button variant="inverseOutline" label="Retake" onPress={() => setPhotoUri(null)} />
            </View>
            <View style={styles.reviewButton}>
              <Button variant="inverse" label="Use photo" onPress={confirmPhoto} />
            </View>
          </View>
        </>
      ) : (
        <>
          {permission?.granted ? (
            <CameraView
              ref={cameraRef}
              style={StyleSheet.absoluteFill}
              facing="back"
              enableTorch={isTorchOn}
            />
          ) : null}
          <View style={[StyleSheet.absoluteFill, styles.dim]} />
          <CameraHeader title="Photo of your spot" onClose={() => router.back()} />

          <View style={styles.content}>
            {isCameraDenied ? (
              <CameraPermissionNotice
                message="Camera access is needed to take a photo of your spot."
                permission={permission}
                requestPermission={requestPermission}
              />
            ) : (
              <>
                <View style={[styles.frame, { borderColor: theme.onInverse }]} />
                <ThemedText type="caption" color="onInverseSecondary">
                  Include your table and surroundings
                </ThemedText>
              </>
            )}
          </View>

          <View style={styles.controls}>
            <View style={styles.side} />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Take photo"
              disabled={!permission?.granted}
              onPress={takePhoto}
              style={({ pressed }) => [
                styles.shutter,
                { borderColor: theme.onInverse },
                (pressed || !permission?.granted) && styles.shutterInactive,
              ]}
            >
              <View style={[styles.shutterInner, { backgroundColor: theme.onInverse }]} />
            </Pressable>
            <View style={styles.side}>
              <IconButton
                icon={isTorchOn ? Icons.flashOn : Icons.flashOff}
                accessibilityLabel={isTorchOn ? 'Turn flashlight off' : 'Turn flashlight on'}
                color="onInverse"
                borderColor="onInverseSecondary"
                disabled={!permission?.granted}
                onPress={() => setIsTorchOn((on) => !on)}
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // Shown until the camera starts, or when camera access is off. Dark in both themes.
    backgroundColor: Colors.dark.background,
  },
  // Darkens the picture a little so the white text stays readable.
  dim: {
    backgroundColor: Colors.dark.background,
    opacity: 0.25,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md,
  },
  // Guide that shows how much of the table to fit in the picture.
  frame: {
    alignSelf: 'stretch',
    height: 300,
    marginHorizontal: Spacing.xl,
    borderWidth: 2,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xxl,
    paddingBottom: Spacing.lg,
  },
  side: {
    flex: 1,
    alignItems: 'center',
  },
  shutter: {
    width: 76,
    height: 76,
    padding: 4,
    borderWidth: 4,
    borderRadius: Radius.full,
  },
  shutterInactive: {
    opacity: 0.6,
  },
  shutterInner: {
    flex: 1,
    borderRadius: Radius.full,
  },
  reviewActions: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  reviewButton: {
    flex: 1,
  },
});
